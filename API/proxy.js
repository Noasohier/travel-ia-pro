
// ⚠️ CLÉ API SÉCURISÉE VIA .ENV
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_KEY;

export const genererVoyage = async (params) => {
  const { destination, budget, duree, style, diet, adultes, enfants, animaux, depart, dates } = params;

  console.log(`🔍 Génération pour : ${destination} (${dates?.depart || '?'} - ${dates?.retour || '?'})`);

  const prompt = `Tu es un expert en voyage. Réponds UNIQUEMENT au format JSON strict. 
Aucun texte en dehors du JSON. Aucune phrase d'introduction.

Voici les paramètres fournis par l'utilisateur :

{
  "destination": "${destination}",
  "depart_lieu": "${depart}",
  "dates": "${dates ? `Du ${dates.depart} au ${dates.retour}` : "Non spécifiées"}",
  "budget": "${budget}",
  "duree": "${duree}",

  "style": "${style}",
  "diet": "${diet || 'Aucun régime spécifique'}",
  "voyageurs": { "adultes": ${adultes || 1}, "enfants": ${enfants || 0} },
  "animaux": ${animaux ? '"Oui"' : '"Non"'}
}

Ton objectif est de générer un itinéraire de voyage complet.
ADAPTE les activités, les logements ET LES TRANSPORTS en fonction de la SAISON et des dates indiquées (${dates?.depart || "Période non spécifiée"}).
Si c'est l'hiver, Noël ou le Nouvel An, propose des activités festives et adaptées (marchés de Noël, ski, cheminée...). Si c'est l'été, focus plage/soleil.
Prends en compte le budget, le style, le régime alimentaire (${diet || 'Aucun'}), la durée, le nombre de voyageurs et les animaux.
Si un régime alimentaire est spécifié, assure-toi que TOUS les restaurants proposés soient adaptés.
Propose des moyens de transport réalistes depuis ${depart || "la France"}.

Le JSON retourné DOIT obligatoirement respecter exactement cette structure :

{
  "destination": "string",
  "budget": "string",
  "duree": "string",
  "style": "string",
  "transports": [
    {
      "type": "string",
      "compagnie": "string",
      "prix": "string",
      "lien": "string"
    }
  ],
  "hotels": [
    {
      "nom": "string",
      "prix_par_nuit": "string",
      "emplacement": "string",
      "lien": "string",
      "image_prompt": "string"
    }
  ],
  "restaurants": [
    {
      "nom": "string",
      "type": "string",
      "prix_moyen": "string",
      "lien": "string",
      "image_prompt": "string"
    }
  ],
  "activites": [
    {
      "nom": "string",
      "prix": "string",
      "description": "string",
      "lien": "string",
      "image_prompt": "string"
    }
  ],
  "itineraire": [
    {
      "jour": "Jour 1",
      "matin": "string",
      "apres_midi": "string",
      "soir": "string"
    }
  ],
  "budget_total_estime": "string"
}

CONTRAINTES :
- Toutes les valeurs doivent être des chaînes de caractères.
- Aucune valeur ne doit être null ou vide.
- L'itinéraire doit contenir autant de jours que "${duree}".
- Le JSON doit être 100% valide, sans erreur.
- Aucune explication : retourne UNIQUEMENT le JSON.
- REGIME ALIMENTAIRE : Si "${diet}" est spécifié, TOUS les restaurants DOIVENT être compatibles. Indique clairement le type de cuisine adaptée.
- POUR LES LIENS (hotels, activites, restaurants) : Si tu n'es pas sûr à 100% du site officiel, génère un lien Google Search de cette forme : https://www.google.com/search?q=Nom+Du+Lieu+Ville. NE METS JAMAIS DE LIEN MORT.
- POUR LES IMAGES (image_prompt) : Fournis une description visuelle courte en ANGLAIS (ex: "modern hotel room with city view", "delicious pasta dish on table").`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", // L'URL de votre frontend Vite par défaut
        "X-Title": "Travel Generator"
      },
      body: JSON.stringify({
        model: "mistralai/devstral-2512:free",
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
      console.error("❌ Réponse inattendue de l'API OpenRouter:", data);
      throw new Error("Structure de réponse invalide ou vide de l'IA.");
    }

    const texte = data.choices[0].message.content;
    console.log("✅ Réponse valide reçue de l'IA");

    // On retourne un objet similaire à ce que rendait le backend pour minimiser les changements dans App.jsx
    return { itineraire: texte };

  } catch (error) {
    console.error("❌ Erreur OpenRouter dans proxy.js:", error);
    throw error;
  }
};
