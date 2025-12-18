'use server'

import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

// Only initialize Prisma if DATABASE_URL is not SQLite (file:) in production
const prisma = process.env.DATABASE_URL?.startsWith('file:') && process.env.NODE_ENV === 'production'
  ? null
  : new PrismaClient();

// --- AI GENERATION ---
const OPENROUTER_KEY = process.env.OPENROUTER_KEY;

export async function generateTrip(params: any) {
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
        messages: [{ role: "user", content: prompt }]
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

  } catch (e: any) {
    console.error(e);
    return { error: "Generation failed", details: e.message };
  }
}


// --- DATABASE OPERATIONS ---

export async function saveTrip(destination: string, tripData: any, requestParams: any = {}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  if (!prisma) throw new Error("Database not available in production with SQLite");

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

export async function getTrips() {
  const { userId } = await auth();
  if (!userId) return []; // Return empty if not logged in
  if (!prisma) return []; // Return empty if database not available

  const trips = await prisma.trip.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });

  // Parse content back to JSON
  return trips.map(t => ({ ...t, content: JSON.parse(t.content) }));
}

export async function getTrip(id: string) {
  const { userId } = await auth();
  if (!userId) return null;
  if (!prisma) return null; // Return null if database not available

  const trip = await prisma.trip.findUnique({
    where: { id }
  });

  if (!trip || trip.userId !== userId) return null;

  return { ...trip, content: JSON.parse(trip.content) };
}

export async function deleteTrip(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  if (!prisma) throw new Error("Database not available in production with SQLite");

  return await prisma.trip.deleteMany({
    where: { id, userId } // Security: ensure user owns trip
  });
}
