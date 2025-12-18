(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/velia-next/components/ItineraryMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ItineraryMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/react-leaflet/lib/Popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// Fix for default Leaflet marker icons in React
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$images$2f$marker$2d$icon$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/leaflet/dist/images/marker-icon.png (static in ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$images$2f$marker$2d$shadow$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/velia-next/node_modules/leaflet/dist/images/marker-shadow.png (static in ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
let DefaultIcon = __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].icon({
    iconUrl: typeof __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$images$2f$marker$2d$icon$2e$png__$28$static__in__ecmascript$29$__["default"] === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$images$2f$marker$2d$icon$2e$png__$28$static__in__ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$images$2f$marker$2d$icon$2e$png__$28$static__in__ecmascript$29$__["default"].src,
    shadowUrl: typeof __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$images$2f$marker$2d$shadow$2e$png__$28$static__in__ecmascript$29$__["default"] === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$images$2f$marker$2d$shadow$2e$png__$28$static__in__ecmascript$29$__["default"] : __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$images$2f$marker$2d$shadow$2e$png__$28$static__in__ecmascript$29$__["default"].src,
    iconSize: [
        25,
        41
    ],
    iconAnchor: [
        12,
        41
    ]
});
__TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker.prototype.options.icon = DefaultIcon;
function RecenterMap({ center }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RecenterMap.useEffect": ()=>{
            if (center) {
                map.setView(center, 13);
            }
        }
    }["RecenterMap.useEffect"], [
        center,
        map
    ]);
    return null;
}
_s(RecenterMap, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = RecenterMap;
function ItineraryMap({ center, steps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
        center: center || [
            48.8566,
            2.3522
        ],
        zoom: 13,
        scrollWheelZoom: false,
        style: {
            height: "100%",
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }, void 0, false, {
                fileName: "[project]/velia-next/components/ItineraryMap.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecenterMap, {
                center: center
            }, void 0, false, {
                fileName: "[project]/velia-next/components/ItineraryMap.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, this),
            steps.map((step)=>step.coordinates && step.coordinates.lat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: [
                        step.coordinates.lat,
                        step.coordinates.lng
                    ],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-indigo-600",
                                children: step.activite
                            }, void 0, false, {
                                fileName: "[project]/velia-next/components/ItineraryMap.tsx",
                                lineNumber: 47,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/velia-next/components/ItineraryMap.tsx",
                                lineNumber: 47,
                                columnNumber: 89
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$velia$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-600",
                                children: [
                                    step.description?.substring(0, 50),
                                    "..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/velia-next/components/ItineraryMap.tsx",
                                lineNumber: 48,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/velia-next/components/ItineraryMap.tsx",
                        lineNumber: 46,
                        columnNumber: 25
                    }, this)
                }, step.id, false, {
                    fileName: "[project]/velia-next/components/ItineraryMap.tsx",
                    lineNumber: 45,
                    columnNumber: 21
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/velia-next/components/ItineraryMap.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
_c1 = ItineraryMap;
var _c, _c1;
__turbopack_context__.k.register(_c, "RecenterMap");
__turbopack_context__.k.register(_c1, "ItineraryMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/velia-next/components/ItineraryMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/velia-next/components/ItineraryMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=velia-next_components_ItineraryMap_tsx_eb22fdb1._.js.map