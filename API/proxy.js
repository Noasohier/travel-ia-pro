
// ⚠️ CLÉ API SÉCURISÉE VIA .ENV
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_KEY;

export const genererVoyage = async (params) => {
  const { destination, budget, duree, style, diet, adultes, enfants, animaux, depart, dates, vibes } = params;

  console.log(`🔍 Génération pour : ${destination} (${dates?.depart || '?'} - ${dates?.retour || '?'})`);

  // Calculate exact number of days if dates are present
  let nombreJours = null;
  if (dates && dates.depart && dates.retour) {
    const start = new Date(dates.depart);
    const end = new Date(dates.retour);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    if (!isNaN(diffDays) && diffDays > 0) {
      nombreJours = diffDays;
    }
  }

  const prompt = `Tu es une IA experte en voyage "Travel AI Pro". Réponds UNIQUEMENT au format JSON strict.
Aucun texte en dehors du JSON. Aucune phrase d'introduction.

Paramètres utilisateur :
{
  "destination": "${destination}",
  "depart_lieu": "${depart}",
  "dates": "${dates ? `Du ${dates.depart} au ${dates.retour}` : "Non spécifiées"}",
  "nombre_jours_calcule": "${nombreJours ? nombreJours + ' Jours' : 'Non spécifié'}",
  "budget": "${budget}",
  "duree_souhaitee": "${duree}",
  "style": "${style}",
  "vibes_niche": "${vibes ? vibes.join(', ') : 'Standard'}",
  "diet": "${diet || 'Aucun régime spécifique'}",
  "voyageurs": { "adultes": ${adultes || 1}, "enfants": ${enfants || 0} },
  "animaux": ${animaux ? '"Oui"' : '"Non"'}
}

INSTRUCTIONS SPECIFIQUES "VIBE":
Si "vibes_niche" contient :
- "Digital Nomad" : Priorise les cafés avec WiFi rapide, espaces de coworking, et logements adaptés au travail.
- "Pet Friendly" : Priorise les parcs, plages autorisées aux chiens, et hôtels acceptant les animaux.
- "Accessibilité PMR" : Assure-toi que les lieux sont accessibles en fauteuil roulant.
- "Nature & Déconnexion" : Évite les zones urbaines denses.
- "Vie Nocturne" : Propose des bars, clubs et quartiers animés le soir.

Ton objectif est de générer un itinéraire de voyage complet et RÉALISTE.
IMPORTANT : Pour l'anti-hallucination et la carte, tu DOIS fournir des coordonnées GPS approximatives mais plausibles pour CHAQUE lieu.

IMPORTANT SUR LA DUREE :
${nombreJours ? `L'utilisateur a spécifié des dates exactes couvrant ${nombreJours} JOURS. Tu DOIS générer un itinéraire détaillé pour EXACTEMENT ${nombreJours} JOURS.` : `Base-toi sur la durée souhaitée : "${duree}".`}
Si la durée est "1 semaine", fais 7 jours. Si "Week-end", fais 2 ou 3 jours.

Structure JSON attendue (STRICT) :
{
  "destination": "string",
  "budget_total_estime": "string",
  "transports": [
    { "type": "string", "compagnie": "string", "prix": "string", "lien": "string" }
  ],
  "hotels": [
    { "nom": "string", "prix_par_nuit": "string", "emplacement": "string", "lien": "string", "image_prompt": "string", "coordinates": { "lat": number, "lng": number } }
  ],
  "restaurants": [
    { "nom": "string", "type": "string", "prix_moyen": "string", "lien": "string", "image_prompt": "string", "coordinates": { "lat": number, "lng": number } }
  ],
  "activites": [
    { "nom": "string", "prix": "string", "description": "string", "lien": "string", "image_prompt": "string", "coordinates": { "lat": number, "lng": number }, "id": "string (unique)" }
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
        },
        // ... (Midi, Soir)
      ]
    },
    // ... AJOUTER AUTANT D'OBJETS JOURS QUE DEMANDÉ (${nombreJours || 'selon durée'})
  ]
}

CONTRAINTES :
1. JSON VALIDE uniquement.
2. Coordonnées 'coordinates' { lat, lng } OBLIGATOIRES pour hotels, restaurants, et surtout dans 'itineraire' (si applicable) ou au moins pour les lieux principaux. Utilise des coordonnées réalistes pour la ville cible.
3. Si 'vibes_niche' est défini, respecte-le scrupuleusement.
4. GENERE BIEN TOUS LES JOURS DEMANDÉS (${nombreJours || 'selon durée'}). Ne t'arrête pas à 3 jours si on en demande 7.
`;

  return callOpenRouter(prompt);
};

export const regenererItineraire = async (currentPlan, context) => {
  console.log(`⚠️ Régénération d'urgence : ${context}`);

  const prompt = `Tu es une IA d'assistance voyage. L'utilisateur a un imprévu sur son voyage en cours.
CONTEXTE : "${context}" (ex: Il pleut, Fatigue, Lieu fermé, Envie de changer).

Voici le plan ACTUEL (résumé) :
Destination: ${currentPlan.destination}
Style: ${currentPlan.style}

TA MISSION :
Génère une NOUVELLE suggestion d'itinéraire pour la suite de la journée ou le lendemain, adaptée à ce contexte.
Garde le même format JSON que précédemment, mais focus sur des alternatives (ex: Musée si pluie, Parc si soleil, Repos si fatigue).

Structure JSON attendue (Partielle ou Complète, mais VALIDE) :
{
  "message_ia": "Courte phrase d'encouragement ou d'explication du changement",
  "itineraire_modifie": [
    {
      "jour": "Aujourd'hui / Demain (Modifié)",
      "etapes": [
         { "heure": "...", "activite": "...", "description": "...", "coordinates": { "lat": 0, "lng": 0 } }
      ]
    }
  ]
}
`;

  return callOpenRouter(prompt);
};

async function callOpenRouter(prompt) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Travel Generator"
      },
      body: JSON.stringify({
        model: "mistralai/devstral-2512:free", // Ou un modèle plus performant si dispo
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.choices || !data.choices.length) {
      throw new Error("Structure de réponse invalide ou vide de l'IA.");
    }

    const texte = data.choices[0].message.content;

    // Nettoyage basique du Markdown JSON si présent
    let cleanText = texte.replace(/```json/g, "").replace(/```/g, "").trim();
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }

    return JSON.parse(cleanText);

  } catch (error) {
    console.error("❌ Erreur OpenRouter:", error);
    throw error;
  }
}
