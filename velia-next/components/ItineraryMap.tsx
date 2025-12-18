'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: typeof icon === 'string' ? icon : (icon as any).src,
    shadowUrl: typeof iconShadow === 'string' ? iconShadow : (iconShadow as any).src,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function RecenterMap({ center }: { center: [number, number] | null }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, 13);
        }
    }, [center, map]);
    return null;
}

export default function ItineraryMap({ center, steps }: { center: [number, number] | null, steps: any[] }) {
    return (
        <MapContainer
            center={center || [48.8566, 2.3522]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecenterMap center={center} />
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
    );
}
