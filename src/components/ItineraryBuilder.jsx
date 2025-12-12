
import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure CSS is imported either here or globally
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-4 cursor-grab active:cursor-grabbing">
            {props.children}
        </div>
    );
}

// Component to recenter map when steps change
function RecenterMap({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, 13);
        }
    }, [center, map]);
    return null;
}

const ItineraryBuilder = ({ itinerary, onUpdate, activeDayIndex, setActiveDayIndex }) => {
    // Helper to get days array safely
    const getDays = () => {
        if (!itinerary || !itinerary.itineraire || !Array.isArray(itinerary.itineraire)) return [];
        return itinerary.itineraire;
    };

    const days = getDays();
    const activeDay = days[activeDayIndex];

    // Adapter function to safely get steps for the CURRENT day
    const getStepsForDay = (dayIndex) => {
        const day = days[dayIndex];
        if (!day) return [];

        // CASE 1: New JSON Format (etapes array)
        if (day.etapes && Array.isArray(day.etapes)) {
            // Check if IDs already exist to avoid re-generating causing re-renders
            return day.etapes.map((s, i) => ({ ...s, id: s.id || `step-${dayIndex}-${i}` }));
        }

        // CASE 2: Old JSON Format Fallback (only for day 0 usually, but generic here)
        const fallbackSteps = [];
        if (day.matin) fallbackSteps.push({ id: `step-${dayIndex}-m`, heure: 'Matin', activite: day.matin, description: 'Activités du matin', coordinates: { lat: 48.85, lng: 2.35 } });
        if (day.apres_midi) fallbackSteps.push({ id: `step-${dayIndex}-mid`, heure: 'Midi', activite: day.apres_midi, description: 'Activités de l\'après-midi', coordinates: { lat: 48.86, lng: 2.34 } });
        if (day.soir) fallbackSteps.push({ id: `step-${dayIndex}-s`, heure: 'Soir', activite: day.soir, description: 'Activités du soir', coordinates: { lat: 48.87, lng: 2.33 } });
        return fallbackSteps;
    };

    // Initialize/Update steps when activeDay or itinerary changes
    const [steps, setSteps] = useState(getStepsForDay(0));

    useEffect(() => {
        setSteps(getStepsForDay(activeDayIndex));
    }, [activeDayIndex, itinerary]);


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setSteps((items) => {
                const oldIndex = items.findIndex(i => i.id === active.id);
                const newIndex = items.findIndex(i => i.id === over.id);
                const newSteps = arrayMove(items, oldIndex, newIndex);

                // Update Parent State (Persistence)
                // We need to clone the itinerary deep enough to modify the specific day's steps
                const updatedItinerary = { ...itinerary };
                const updatedDays = [...updatedItinerary.itineraire];
                const updatedDay = { ...updatedDays[activeDayIndex] };

                // If it was using 'etapes', update it. If legacy, we can't easily map back but we try.
                // Assuming 'etapes' format for persistence as it's the target.
                updatedDay.etapes = newSteps;
                updatedDays[activeDayIndex] = updatedDay;
                updatedItinerary.itineraire = updatedDays;

                // Call parent update
                if (onUpdate) onUpdate(updatedItinerary);

                return newSteps;
            });
        }
    };

    // Calculate Map Center for Active Day
    const validCoords = steps.filter(s => s.coordinates && s.coordinates.lat);
    // Use first point of day or previous center or default
    const mapCenter = validCoords.length > 0 ? [validCoords[0].coordinates.lat, validCoords[0].coordinates.lng] : null;

    if (days.length === 0) return <div className="text-center text-slate-400">Aucun itinéraire à afficher.</div>;

    return (
        <div className="flex flex-col h-full gap-6">

            {/* Day Navigator */}
            <div className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                <button
                    onClick={() => setActiveDayIndex(Math.max(0, activeDayIndex - 1))}
                    disabled={activeDayIndex === 0}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>

                <div className="flex overflow-x-auto gap-2 px-2 no-scrollbar scroll-smooth">
                    {days.map((day, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveDayIndex(idx)}
                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition flex-shrink-0
                                ${activeDayIndex === idx
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            {day.jour || `Jour ${idx + 1}`}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setActiveDayIndex(Math.min(days.length - 1, activeDayIndex + 1))}
                    disabled={activeDayIndex === days.length - 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row h-full gap-4">
                {/* List Panel (Draggable) */}
                <div className="w-full lg:w-1/2">
                    <h3 className="text-xl font-bold mb-4 text-indigo-900 flex items-center gap-2">
                        <i className="fa-solid fa-list-check"></i>
                        {activeDay ? activeDay.jour : "Programme"}
                        <span className="text-xs font-normal text-slate-400 ml-auto hidden sm:inline">(Glissez pour réorganiser)</span>
                    </h3>

                    <div className="space-y-3">
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                            <SortableContext items={steps} strategy={verticalListSortingStrategy}>
                                {steps.map((step) => (
                                    <SortableItem key={step.id} id={step.id}>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition group relative flex gap-4">
                                            <div className="text-slate-300 mt-1 cursor-grab active:cursor-grabbing">
                                                <i className="fa-solid fa-grip-vertical"></i>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-xs font-bold uppercase text-indigo-500">{step.heure}</span>
                                                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold border border-indigo-100">
                                                        {step.activite}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    </SortableItem>
                                ))}
                            </SortableContext>
                        </DndContext>
                        {steps.length === 0 && <p className="text-slate-400 italic text-center text-sm py-4">Aucune étape détaillée pour ce jour.</p>}
                    </div>
                </div>

                {/* Map Panel */}
                <div className="w-full lg:w-1/2 h-80 lg:h-auto min-h-[400px] rounded-xl overflow-hidden shadow-inner border border-slate-200 relative z-0">
                    {/* Key forces map remount/update when day changes often helpful for clearing markers properly */}
                    <MapContainer key={activeDayIndex} center={mapCenter || [48.8566, 2.3522]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <RecenterMap center={mapCenter} />
                        {steps.map((step) => (
                            step.coordinates && step.coordinates.lat && (
                                <Marker key={step.id} position={[step.coordinates.lat, step.coordinates.lng]}>
                                    <Popup>
                                        <strong className="text-indigo-600">{step.activite}</strong><br />
                                        <span className="text-xs text-slate-600">{step.description?.substring(0, 50)}...</span>
                                    </Popup>
                                </Marker>
                            )
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default ItineraryBuilder;
