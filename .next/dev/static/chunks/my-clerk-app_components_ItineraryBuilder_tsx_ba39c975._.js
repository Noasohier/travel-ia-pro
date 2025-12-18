(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/my-clerk-app/components/ItineraryBuilder.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Dynamic import for Map to avoid SSR issues
const ItineraryMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/my-clerk-app/components/ItineraryMap.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/my-clerk-app/components/ItineraryMap.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = ItineraryMap;
function SortableItem(props) {
    _s();
    const { attributes, listeners, setNodeRef, transform, transition } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])({
        id: props.id
    });
    const style = {
        transform: __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform),
        transition
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: setNodeRef,
        style: style,
        ...attributes,
        ...listeners,
        className: "mb-4 cursor-grab active:cursor-grabbing",
        children: props.children
    }, void 0, false, {
        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
_s(SortableItem, "apIMPnitS3bYJlhXrqv+eewtcvs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c1 = SortableItem;
const ItineraryBuilder = ({ itinerary, onUpdate, activeDayIndex, setActiveDayIndex })=>{
    _s1();
    // Helper to get days array safely
    const getDays = ()=>{
        if (!itinerary || !itinerary.itineraire || !Array.isArray(itinerary.itineraire)) return [];
        return itinerary.itineraire;
    };
    const days = getDays();
    const activeDay = days[activeDayIndex];
    // Adapter function to safely get steps for the CURRENT day
    const getStepsForDay = (dayIndex)=>{
        const day = days[dayIndex];
        if (!day) return [];
        // CASE 1: New JSON Format (etapes array)
        if (day.etapes && Array.isArray(day.etapes)) {
            // Check if IDs already exist to avoid re-generating causing re-renders
            return day.etapes.map((s, i)=>({
                    ...s,
                    id: s.id || `step-${dayIndex}-${i}`
                }));
        }
        // CASE 2: Old JSON Format Fallback
        const fallbackSteps = [];
        if (day.matin) fallbackSteps.push({
            id: `step-${dayIndex}-m`,
            heure: 'Matin',
            activite: day.matin,
            description: 'Activités du matin',
            coordinates: {
                lat: 48.85,
                lng: 2.35
            }
        });
        if (day.apres_midi) fallbackSteps.push({
            id: `step-${dayIndex}-mid`,
            heure: 'Midi',
            activite: day.apres_midi,
            description: 'Activités de l\'après-midi',
            coordinates: {
                lat: 48.86,
                lng: 2.34
            }
        });
        if (day.soir) fallbackSteps.push({
            id: `step-${dayIndex}-s`,
            heure: 'Soir',
            activite: day.soir,
            description: 'Activités du soir',
            coordinates: {
                lat: 48.87,
                lng: 2.33
            }
        });
        return fallbackSteps;
    };
    // Initialize/Update steps when activeDay or itinerary changes
    const [steps, setSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(getStepsForDay(0));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ItineraryBuilder.useEffect": ()=>{
            setSteps(getStepsForDay(activeDayIndex));
        }
    }["ItineraryBuilder.useEffect"], [
        activeDayIndex,
        itinerary
    ]);
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointerSensor"]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyboardSensor"], {
        coordinateGetter: __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortableKeyboardCoordinates"]
    }));
    const handleDragEnd = (event)=>{
        const { active, over } = event;
        if (active.id !== over.id) {
            setSteps((items)=>{
                const oldIndex = items.findIndex((i)=>i.id === active.id);
                const newIndex = items.findIndex((i)=>i.id === over.id);
                const newSteps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayMove"])(items, oldIndex, newIndex);
                // Update Parent State (Persistence)
                // We need to clone the itinerary deep enough to modify the specific day's steps
                const updatedItinerary = {
                    ...itinerary
                };
                const updatedDays = [
                    ...updatedItinerary.itineraire
                ];
                const updatedDay = {
                    ...updatedDays[activeDayIndex]
                };
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
    const validCoords = steps.filter((s)=>s.coordinates && s.coordinates.lat);
    const mapCenter = validCoords.length > 0 ? [
        Number(validCoords[0].coordinates.lat),
        Number(validCoords[0].coordinates.lng)
    ] : null;
    if (days.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center text-slate-400",
        children: "Aucun itinéraire à afficher."
    }, void 0, false, {
        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
        lineNumber: 109,
        columnNumber: 35
    }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between bg-white p-2 rounded-xl shadow-sm border border-slate-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveDayIndex(Math.max(0, activeDayIndex - 1)),
                        disabled: activeDayIndex === 0,
                        className: "w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fa-solid fa-chevron-left"
                        }, void 0, false, {
                            fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                            lineNumber: 121,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex overflow-x-auto gap-2 px-2 no-scrollbar scroll-smooth",
                        children: days.map((day, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveDayIndex(idx),
                                className: `whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition flex-shrink-0
                                ${activeDayIndex === idx ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`,
                                children: day.jour || `Jour ${idx + 1}`
                            }, idx, false, {
                                fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                lineNumber: 126,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                        lineNumber: 124,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveDayIndex(Math.min(days.length - 1, activeDayIndex + 1)),
                        disabled: activeDayIndex === days.length - 1,
                        className: "w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: "fa-solid fa-chevron-right"
                        }, void 0, false, {
                            fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                            lineNumber: 145,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                        lineNumber: 140,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                lineNumber: 115,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row h-full gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-1/2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold mb-4 text-indigo-900 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fa-solid fa-list-check"
                                    }, void 0, false, {
                                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                        lineNumber: 153,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    activeDay ? activeDay.jour : "Programme",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-normal text-slate-400 ml-auto hidden sm:inline",
                                        children: "(Glissez pour réorganiser)"
                                    }, void 0, false, {
                                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                        lineNumber: 155,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                lineNumber: 152,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
                                        sensors: sensors,
                                        collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
                                        onDragEnd: handleDragEnd,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                                            items: steps,
                                            strategy: __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                                            children: steps.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SortableItem, {
                                                    id: step.id,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition group relative flex gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-300 mt-1 cursor-grab active:cursor-grabbing",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: "fa-solid fa-grip-vertical"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                                                    lineNumber: 165,
                                                                    columnNumber: 49
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex justify-between items-start mb-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs font-bold uppercase text-indigo-500",
                                                                                children: step.heure
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                                                                lineNumber: 169,
                                                                                columnNumber: 53
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold border border-indigo-100",
                                                                                children: step.activite
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                                                                lineNumber: 170,
                                                                                columnNumber: 53
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                                                        lineNumber: 168,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-slate-600 leading-relaxed",
                                                                        children: step.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                                                        lineNumber: 174,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                                                lineNumber: 167,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 41
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, step.id, false, {
                                                    fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                            lineNumber: 160,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                        lineNumber: 159,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    steps.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 italic text-center text-sm py-4",
                                        children: "Aucune étape détaillée pour ce jour."
                                    }, void 0, false, {
                                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                        lineNumber: 181,
                                        columnNumber: 48
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                                lineNumber: 158,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                        lineNumber: 151,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full lg:w-1/2 h-80 lg:h-auto min-h-[400px] rounded-xl overflow-hidden shadow-inner border border-slate-200 relative z-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ItineraryMap, {
                            center: mapCenter,
                            steps: steps
                        }, void 0, false, {
                            fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                            lineNumber: 187,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                        lineNumber: 186,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
                lineNumber: 149,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/my-clerk-app/components/ItineraryBuilder.tsx",
        lineNumber: 112,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(ItineraryBuilder, "ssMBrIYfGcTvxfV78ezMBSSoAnE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"]
    ];
});
_c2 = ItineraryBuilder;
const __TURBOPACK__default__export__ = ItineraryBuilder;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ItineraryMap");
__turbopack_context__.k.register(_c1, "SortableItem");
__turbopack_context__.k.register(_c2, "ItineraryBuilder");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/my-clerk-app/components/ItineraryBuilder.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/my-clerk-app/components/ItineraryBuilder.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=my-clerk-app_components_ItineraryBuilder_tsx_ba39c975._.js.map