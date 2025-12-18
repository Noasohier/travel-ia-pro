module.exports = [
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/my-clerk-app/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00c6813e78da55b4f9331769f78e80eb9734bb631f":"getTrips","404cd4e6fa7e5e28c8ec3c281e46e3186eb422ff4c":"deleteTrip","404f3e58ad0c920b399c3ea707bf7b5679db2ca60b":"generateTrip","409126a7baa2390fbe4fc6f891b8a94349f295d29a":"getTrip","70760aec8d202454f46eb018fe68e8fab512778a90":"saveTrip"},"",""] */ __turbopack_context__.s([
    "deleteTrip",
    ()=>deleteTrip,
    "generateTrip",
    ()=>generateTrip,
    "getTrip",
    ()=>getTrip,
    "getTrips",
    ()=>getTrips,
    "saveTrip",
    ()=>saveTrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
// --- AI GENERATION ---
const OPENROUTER_KEY = process.env.OPENROUTER_KEY;
async function generateTrip(params) {
    const { destination, rayon, budget, style, diet, adultes, enfants, animaux, depart, dates, vibes } = params;
    // Recalculate duration if needed
    let nombreJours = null;
    if (dates && dates.depart && dates.retour) {
        const start = new Date(dates.depart);
        const end = new Date(dates.retour);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        if (!isNaN(diffDays) && diffDays > 0) {
            nombreJours = diffDays;
        }
    }
    const prompt = `Tu es une IA experte en voyage "VELIA".Réponds UNIQUEMENT au format JSON strict.
Aucun texte en dehors du JSON.Aucune phrase d'introduction.

Paramètres utilisateur:
{
  "destination": "${destination}",
  "rayon_decouverte": "${rayon > 0 ? rayon + ' km autour' : 'Ville uniquement'}",
  "depart_lieu": "${depart}",
  "dates": "${dates ? `Du ${dates.depart} au ${dates.retour}` : "Non spécifiées"}",
  "duree_calculee": "${nombreJours ? nombreJours + ' Jours' : 'Non spécifié'}",
  "budget": "${budget}",
  "style": "${style}",
  "vibes_niche": "${vibes ? vibes.join(', ') : 'Standard'}",
  "diet": "${diet || 'Aucun régime spécifique'}",
  "voyageurs": { "adultes": ${adultes || 1}, "enfants": ${enfants || 0} },
  "animaux": ${animaux ? '"Oui"' : '"Non"'}
}

INSTRUCTIONS SPECIFIQUES "STYLE":
Si "style" contient:
- "Roadtrip Moto": Propose des routes scéniques avec virages, parkings sécurisés pour les hôtels obligatoires, et des étapes adaptées aux motards (pauses café, points de vue).
- "Trekking": Inclus des détails sur les sentiers (difficulté, durée), et privilégie les refuges ou hébergements proches de la nature.
- "Sportif": Centre le voyage autour d'activités physiques intenses (vélo, kayak, rando, sale de sport) et une nutrition adaptée.

IMPORTANT SUR LE RAYON:
Si "rayon_decouverte" est supérieur à 0 km, tu PEUX et DOIS inclure des activités, restaurants ou visites situés dans ce rayon autour de la destination principale. Si c'est "Ville uniquement", reste strict.

IMPORTANT SUR LA MÉTÉO:
Utilise les dates fournies (${dates ? `Du ${dates.depart} au ${dates.retour}` : "Mois inconnu"}) pour estimer la météo probable (basée sur les normales saisonnières).

Structure JSON attendue(STRICT) :
{
  "destination": "string",
  "meteo": {
    "temp_min": "string (ex: 15°C)",
    "temp_max": "string (ex: 22°C)",
    "description": "string (ex: Ensoleillé avec averses possibles)",
    "conseils": "string (ex: Prévoyez un imperméable)"
  },
  "budget_total_estime": "string",
  "transports": [
    { "type": "string", "compagnie": "string", "prix": "string", "lien": "string" }
  ],
  "hotels": [
    { "nom": "string", "prix_par_nuit": "string", "avis": "string (ex: 4.5/5 sur Google)", "emplacement": "string", "lien": "string", "coordinates": { "lat": number, "lng": number } }
  ],
  "restaurants": [
    { "nom": "string", "type": "string", "prix_moyen": "string", "avis": "string (ex: 4.7/5 sur TripAdvisor)", "lien": "string", "coordinates": { "lat": number, "lng": number } }
  ],
  "activites": [
    { "nom": "string", "prix": "string", "description": "string", "avis": "string (ex: 4.8/5)", "lien": "string", "coordinates": { "lat": number, "lng": number }, "id": "string (unique)" }
  ],
  "itineraire": [
    {
      "jour": "Jour 1",
      "etapes": [
        {
          "heure": "Matin",
          "activite": "string",
          "description": "string",
          "coordinates": { "lat": number, "lng": number }
        }
      ]
    }
  ]
}
GENERE BIEN TOUS LES JOURS DEMANDÉS (${nombreJours}).
`;
    // Call OpenRouter (similar logic to previous proxy.js)
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Travel Generator Next"
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-exp:free",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        });
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        const content = data.choices[0].message.content;
        // Clean JSON
        let cleanText = content.replace(/```json/g, "").replace(/```/g, "").trim();
        const firstBrace = cleanText.indexOf('{');
        const lastBrace = cleanText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            cleanText = cleanText.substring(firstBrace, lastBrace + 1);
        }
        return JSON.parse(cleanText);
    } catch (e) {
        console.error(e);
        return {
            error: "Generation failed",
            details: e.message
        };
    }
}
async function saveTrip(destination, tripData, requestParams = {}) {
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) throw new Error("Unauthorized");
    // Wrap content to include both result and params
    const contentToSave = {
        itinerary: tripData,
        request: requestParams
    };
    return await prisma.trip.create({
        data: {
            userId,
            destination,
            content: JSON.stringify(contentToSave)
        }
    });
}
async function getTrips() {
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) return []; // Return empty if not logged in
    const trips = await prisma.trip.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    // Parse content back to JSON
    return trips.map((t)=>({
            ...t,
            content: JSON.parse(t.content)
        }));
}
async function getTrip(id) {
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) return null;
    const trip = await prisma.trip.findUnique({
        where: {
            id
        }
    });
    if (!trip || trip.userId !== userId) return null;
    return {
        ...trip,
        content: JSON.parse(trip.content)
    };
}
async function deleteTrip(id) {
    const { userId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) throw new Error("Unauthorized");
    return await prisma.trip.deleteMany({
        where: {
            id,
            userId
        } // Security: ensure user owns trip
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateTrip,
    saveTrip,
    getTrips,
    getTrip,
    deleteTrip
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateTrip, "404f3e58ad0c920b399c3ea707bf7b5679db2ca60b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveTrip, "70760aec8d202454f46eb018fe68e8fab512778a90", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTrips, "00c6813e78da55b4f9331769f78e80eb9734bb631f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getTrip, "409126a7baa2390fbe4fc6f891b8a94349f295d29a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTrip, "404cd4e6fa7e5e28c8ec3c281e46e3186eb422ff4c", null);
}),
"[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7f2f657b1dbc5104639755212dc9f8e5ad6b3d771a":"invalidateCacheAction"},"",""] */ __turbopack_context__.s([
    "invalidateCacheAction",
    ()=>invalidateCacheAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function invalidateCacheAction() {
    void (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).delete(`__clerk_invalidate_cache_cookie_${Date.now()}`);
}
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    invalidateCacheAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(invalidateCacheAction, "7f2f657b1dbc5104639755212dc9f8e5ad6b3d771a", null);
}),
"[project]/my-clerk-app/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/server/keyless-custom-headers.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/keyless-actions.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/my-clerk-app/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$keyless$2d$custom$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/server/keyless-custom-headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$keyless$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/keyless-actions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/app/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/my-clerk-app/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/server/keyless-custom-headers.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/keyless-actions.js [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/my-clerk-app/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "404f3e58ad0c920b399c3ea707bf7b5679db2ca60b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateTrip"],
    "409126a7baa2390fbe4fc6f891b8a94349f295d29a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTrip"],
    "70760aec8d202454f46eb018fe68e8fab512778a90",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveTrip"],
    "7f2f657b1dbc5104639755212dc9f8e5ad6b3d771a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["invalidateCacheAction"],
    "7f30f28618a80117b49459b2db672a12b109851831",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$keyless$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteKeylessAction"],
    "7f3d76b78a4d6722d4c8c5704ffb3b43d2121d0d08",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$keyless$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createOrReadKeylessAction"],
    "7f72454b34ac86079684b6e0abbfc1ef826df06c48",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$keyless$2d$custom$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatMetadataHeaders"],
    "7fa2dc529c35c3dcf98a74fba35b86c045dfb26722",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$keyless$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["syncKeylessConfigAction"],
    "7fdccd14e953f03a746b6d7d9bc7d06645086b62af",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$keyless$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["detectKeylessEnvDriftAction"],
    "7ff1bd35aec7be46757b491188fa6a7390bc1bc7a9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$keyless$2d$custom$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["collectKeylessMetadata"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$keyless$2d$custom$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$keyless$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$my$2d$clerk$2d$app$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/my-clerk-app/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/server/keyless-custom-headers.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/keyless-actions.js [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/my-clerk-app/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$server$2f$keyless$2d$custom$2d$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/server/keyless-custom-headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$keyless$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/keyless-actions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2d$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/node_modules/@clerk/nextjs/dist/esm/app-router/server-actions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$my$2d$clerk$2d$app$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/my-clerk-app/app/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__518d0c34._.js.map