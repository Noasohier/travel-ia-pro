module.exports=[76283,a=>{"use strict";var b=a.i(61569);a.i(74060);var c=a.i(55183);async function d(){(await (0,c.cookies)()).delete(`__clerk_invalidate_cache_cookie_${Date.now()}`)}(0,a.i(75986).ensureServerEntryExports)([d]),(0,b.registerServerReference)(d,"7f2c0ebc90fd5ec9b92b159ff09b0099247b5ea41d",null),a.s(["invalidateCacheAction",()=>d])},29173,(a,b,c)=>{b.exports=a.x("@prisma/client",()=>require("@prisma/client"))},28267,a=>{"use strict";var b=a.i(61569),c=a.i(29173),d=a.i(25794),e=a.i(75986);let f=new c.PrismaClient,g=process.env.OPENROUTER_KEY;async function h(a){let{destination:b,rayon:c,budget:d,style:e,diet:f,adultes:h,enfants:i,animaux:j,depart:k,dates:l,vibes:m}=a,n=null;if(l&&l.depart&&l.retour){let a=new Date(l.depart),b=Math.ceil(Math.abs(new Date(l.retour).getTime()-a.getTime())/864e5)+1;!isNaN(b)&&b>0&&(n=b)}let o=`Tu es une IA experte en voyage "VELIA".R\xe9ponds UNIQUEMENT au format JSON strict.
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
`;try{let a=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{Authorization:`Bearer ${g}`,"Content-Type":"application/json","HTTP-Referer":"http://localhost:3000","X-Title":"Travel Generator Next"},body:JSON.stringify({model:"google/gemini-2.0-flash-exp:free",messages:[{role:"user",content:o}]})});if(!a.ok)throw Error("API Error");let b=(await a.json()).choices[0].message.content.replace(/```json/g,"").replace(/```/g,"").trim(),c=b.indexOf("{"),d=b.lastIndexOf("}");return -1!==c&&-1!==d&&(b=b.substring(c,d+1)),JSON.parse(b)}catch(a){return console.error(a),{error:"Generation failed",details:a.message}}}async function i(a,b,c={}){let{userId:e}=await (0,d.auth)();if(!e)throw Error("Unauthorized");return await f.trip.create({data:{userId:e,destination:a,content:JSON.stringify({itinerary:b,request:c})}})}async function j(){let{userId:a}=await (0,d.auth)();return a?(await f.trip.findMany({where:{userId:a},orderBy:{createdAt:"desc"}})).map(a=>({...a,content:JSON.parse(a.content)})):[]}async function k(a){let{userId:b}=await (0,d.auth)();if(!b)return null;let c=await f.trip.findUnique({where:{id:a}});return c&&c.userId===b?{...c,content:JSON.parse(c.content)}:null}async function l(a){let{userId:b}=await (0,d.auth)();if(!b)throw Error("Unauthorized");return await f.trip.deleteMany({where:{id:a,userId:b}})}(0,e.ensureServerEntryExports)([h,i,j,k,l]),(0,b.registerServerReference)(h,"40326cbb478a59c0acbbce3edc3c2391643547a471",null),(0,b.registerServerReference)(i,"70ccd64c840fc4201baefdc289c9d39ebf40ac8f32",null),(0,b.registerServerReference)(j,"00791521a37011d22bdecd8958a21f2449acb2308e",null),(0,b.registerServerReference)(k,"40b54362c01fc485ae9ef1d83d3f1bb6dad58a060f",null),(0,b.registerServerReference)(l,"40bc1fab7c4a751f1dfb5a459f4b4a41fe4162c04c",null),a.s(["deleteTrip",()=>l,"generateTrip",()=>h,"getTrip",()=>k,"getTrips",()=>j,"saveTrip",()=>i])},52755,a=>{"use strict";var b=a.i(88272),c=a.i(76283),d=a.i(17576),e=a.i(28267);a.s([],71035),a.i(71035),a.s(["00791521a37011d22bdecd8958a21f2449acb2308e",()=>e.getTrips,"40326cbb478a59c0acbbce3edc3c2391643547a471",()=>e.generateTrip,"40b54362c01fc485ae9ef1d83d3f1bb6dad58a060f",()=>e.getTrip,"40bc1fab7c4a751f1dfb5a459f4b4a41fe4162c04c",()=>e.deleteTrip,"70ccd64c840fc4201baefdc289c9d39ebf40ac8f32",()=>e.saveTrip,"7f0dd359250b3f2d507f436ce14ec5e75130a17a6b",()=>b.syncKeylessConfigAction,"7f2c0ebc90fd5ec9b92b159ff09b0099247b5ea41d",()=>c.invalidateCacheAction,"7f315e1a761393951967292c26e538ccb5c9773ba8",()=>d.formatMetadataHeaders,"7f61115a14a0c2c7d9c10ecdb58f4f8f47339cdf03",()=>d.collectKeylessMetadata,"7f7142aac1f773b029fff2e9a3fa3ef3edc9b34673",()=>b.createOrReadKeylessAction,"7fa18068bd2cc59494f692e51d964b82a274da0395",()=>b.deleteKeylessAction,"7fd1e0bd57eb2ed0e95a70a0286c3e5a752e6b39df",()=>b.detectKeylessEnvDriftAction],52755)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__d89d8472._.js.map