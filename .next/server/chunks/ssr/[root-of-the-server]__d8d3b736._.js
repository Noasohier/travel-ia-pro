module.exports=[48259,a=>{"use strict";var b=a.i(58921);a.i(35349);var c=a.i(23557);async function d(){(await (0,c.cookies)()).delete(`__clerk_invalidate_cache_cookie_${Date.now()}`)}(0,a.i(84444).ensureServerEntryExports)([d]),(0,b.registerServerReference)(d,"7fc82641bea91819eb799430e40d1171a0330451f6",null),a.s(["invalidateCacheAction",()=>d])},29173,(a,b,c)=>{b.exports=a.x("@prisma/client",()=>require("@prisma/client"))},73901,a=>{"use strict";var b=a.i(58921),c=a.i(29173),d=a.i(49903),e=a.i(84444);let f=new c.PrismaClient,g=process.env.OPENROUTER_KEY;async function h(a){let{destination:b,rayon:c,budget:d,style:e,diet:f,adultes:h,enfants:i,animaux:j,depart:k,dates:l,vibes:m}=a,n=null;if(l&&l.depart&&l.retour){let a=new Date(l.depart),b=Math.ceil(Math.abs(new Date(l.retour).getTime()-a.getTime())/864e5)+1;!isNaN(b)&&b>0&&(n=b)}let o=`Tu es une IA experte en voyage "VELIA".R\xe9ponds UNIQUEMENT au format JSON strict.
Aucun texte en dehors du JSON.Aucune phrase d'introduction.

Param\xe8tres utilisateur:
{
  "destination": "${b}",
  "rayon_decouverte": "${c>0?c+" km autour":"Ville uniquement"}",
  "depart_lieu": "${k}",
  "dates": "${l?`Du ${l.depart} au ${l.retour}`:"Non spécifiées"}",
  "duree_calculee": "${n?n+" Jours":"Non spécifié"}",
  "budget": "${d}",
  "style": "${e}",
  "vibes_niche": "${m?m.join(", "):"Standard"}",
  "diet": "${f||"Aucun régime spécifique"}",
  "voyageurs": { "adultes": ${h||1}, "enfants": ${i||0} },
  "animaux": ${j?'"Oui"':'"Non"'}
}

INSTRUCTIONS SPECIFIQUES "STYLE":
Si "style" contient:
- "Roadtrip Moto": Propose des routes sc\xe9niques avec virages, parkings s\xe9curis\xe9s pour les h\xf4tels obligatoires, et des \xe9tapes adapt\xe9es aux motards (pauses caf\xe9, points de vue).
- "Trekking": Inclus des d\xe9tails sur les sentiers (difficult\xe9, dur\xe9e), et privil\xe9gie les refuges ou h\xe9bergements proches de la nature.
- "Sportif": Centre le voyage autour d'activit\xe9s physiques intenses (v\xe9lo, kayak, rando, sale de sport) et une nutrition adapt\xe9e.

IMPORTANT SUR LE RAYON:
Si "rayon_decouverte" est sup\xe9rieur \xe0 0 km, tu PEUX et DOIS inclure des activit\xe9s, restaurants ou visites situ\xe9s dans ce rayon autour de la destination principale. Si c'est "Ville uniquement", reste strict.

IMPORTANT SUR LA M\xc9T\xc9O:
Utilise les dates fournies (${l?`Du ${l.depart} au ${l.retour}`:"Mois inconnu"}) pour estimer la m\xe9t\xe9o probable (bas\xe9e sur les normales saisonni\xe8res).

Structure JSON attendue(STRICT) :
{
  "destination": "string",
  "meteo": {
    "temp_min": "string (ex: 15\xb0C)",
    "temp_max": "string (ex: 22\xb0C)",
    "description": "string (ex: Ensoleill\xe9 avec averses possibles)",
    "conseils": "string (ex: Pr\xe9voyez un imperm\xe9able)"
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
GENERE BIEN TOUS LES JOURS DEMAND\xc9S (${n}).
`;try{let a=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${g}`,"Content-Type":"application/json","HTTP-Referer":"http://localhost:3000","X-Title":"Travel Generator Next"},body:JSON.stringify({model:"google/gemini-2.0-flash-exp:free",messages:[{role:"user",content:o}]})});if(!a.ok)throw Error("API Error");let b=(await a.json()).choices[0].message.content.replace(/```json/g,"").replace(/```/g,"").trim(),c=b.indexOf("{"),d=b.lastIndexOf("}");return -1!==c&&-1!==d&&(b=b.substring(c,d+1)),JSON.parse(b)}catch(a){return console.error(a),{error:"Generation failed",details:a.message}}}async function i(a,b,c={}){let{userId:e}=await (0,d.auth)();if(!e)throw Error("Unauthorized");return await f.trip.create({data:{userId:e,destination:a,content:JSON.stringify({itinerary:b,request:c})}})}async function j(){let{userId:a}=await (0,d.auth)();return a?(await f.trip.findMany({where:{userId:a},orderBy:{createdAt:"desc"}})).map(a=>({...a,content:JSON.parse(a.content)})):[]}async function k(a){let{userId:b}=await (0,d.auth)();if(!b)return null;let c=await f.trip.findUnique({where:{id:a}});return c&&c.userId===b?{...c,content:JSON.parse(c.content)}:null}async function l(a){let{userId:b}=await (0,d.auth)();if(!b)throw Error("Unauthorized");return await f.trip.deleteMany({where:{id:a,userId:b}})}(0,e.ensureServerEntryExports)([h,i,j,k,l]),(0,b.registerServerReference)(h,"400e3b2e09fd7357b4958f8faa1dd6855f0543c235",null),(0,b.registerServerReference)(i,"70397e28840ce8965743df2f8441da4d7eada328f4",null),(0,b.registerServerReference)(j,"000072b5230cb49fd461ccf2bc05e8310c4336c8b4",null),(0,b.registerServerReference)(k,"4083d26526160db1c9cbf16bee91798da145ee5117",null),(0,b.registerServerReference)(l,"405c00b036d6be61360d33b2c3df6fae560d91321e",null),a.s(["deleteTrip",()=>l,"generateTrip",()=>h,"getTrip",()=>k,"getTrips",()=>j,"saveTrip",()=>i])},86643,a=>{"use strict";var b=a.i(22854),c=a.i(48259),d=a.i(1022),e=a.i(73901);a.s([],56497),a.i(56497),a.s(["000072b5230cb49fd461ccf2bc05e8310c4336c8b4",()=>e.getTrips,"400e3b2e09fd7357b4958f8faa1dd6855f0543c235",()=>e.generateTrip,"405c00b036d6be61360d33b2c3df6fae560d91321e",()=>e.deleteTrip,"4083d26526160db1c9cbf16bee91798da145ee5117",()=>e.getTrip,"70397e28840ce8965743df2f8441da4d7eada328f4",()=>e.saveTrip,"7f080dcc8fa0d002ac73e23fb094186d14a9d82907",()=>b.deleteKeylessAction,"7f4d4e5f09d98cbe16d26c17993938fc2af76caae4",()=>d.formatMetadataHeaders,"7f93bd797e67d5d62aee695ddaf48db84d5420c379",()=>b.detectKeylessEnvDriftAction,"7fad43e9c0d64bcd12b0671d0e6bd82b317bd5a56d",()=>b.createOrReadKeylessAction,"7fbb71f6e1fecf0c5e27a5dc4589c54b7e362855f7",()=>b.syncKeylessConfigAction,"7fbff6932cf7a81544d65aa0f5084870bbe0549a47",()=>d.collectKeylessMetadata,"7fc82641bea91819eb799430e40d1171a0330451f6",()=>c.invalidateCacheAction],86643)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__d8d3b736._.js.map