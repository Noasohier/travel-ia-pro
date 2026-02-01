
// ⚠️ CLÉ API SÉCURISÉE VIA .ENV
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_KEY;

export const genererVoyage = async (params) => {
  const { destination, rayon, budget, style, diet, adultes, enfants, animaux, depart, dates, vibes, typeHebergement } = params;

  console.log(`🔍 Génération pour: ${destination} (${dates?.depart || '?'} - ${dates?.retour || '?'})`);

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

  const prompt = `Tu es un EXPERT PROFESSIONNEL en organisation de voyages avec 15 ans d'expérience.
Tu travailles comme un agent de voyage haut de gamme qui fournit des estimations PRÉCISES et RÉALISTES.

🎯 TON RÔLE:
- Analyser chaque destination avec expertise (coût de la vie, saison touristique, distance)
- Fournir des prix RÉELS basés sur tes connaissances du marché actuel
- Utiliser tes données d'entraînement sur les prix moyens des vols, hôtels, restaurants
- Justifier tes estimations avec des explications professionnelles
- Créer un itinéraire détaillé et optimisé comme un vrai professionnel
- **VALIDER que le budget "${budget}" est suffisant pour "${destination}"**

⚠️ EXIGENCES DE PROFESSIONNALISME:
1. Recherche mentale des tarifs RÉELS pour "${destination}" depuis "${depart}"
2. Utilise tes connaissances des prix moyens du marché (vols, hôtels, restaurants)
3. Analyse du coût de la vie local de "${destination}"
4. Prise en compte de la saisonnalité (${dates ? `${dates.depart} - ${dates.retour}` : 'période non spécifiée'})
5. Calcul précis pour ${(adultes || 1) + (enfants || 0)} voyageur(s)
6. Justification de tes estimations dans les notes
7. **VALIDATION DU BUDGET**: Compare le coût total estimé avec le budget "${budget}" demandé

⚠️ VALIDATION DU BUDGET (CRITIQUE):
Avant de générer l'itinéraire, estime mentalement le coût total:
- Si le budget "${budget}" est INSUFFISANT pour "${destination}" (${dates ? `${dates.depart} - ${dates.retour}` : ''}, ${(adultes || 1) + (enfants || 0)} pers):
  → Ajoute "budget_warning": "BUDGET INSUFFISANT: Pour ${destination} depuis ${depart} avec ${(adultes || 1) + (enfants || 0)} personnes, le budget minimum réaliste est de [X]€. Votre budget '${budget}' ne permettra pas de couvrir les frais de transport et d'hébergement. Nous recommandons soit d'augmenter le budget, soit de choisir une destination plus proche."
  
- Si le budget est JUSTE SUFFISANT mais limité:
  → Ajoute "budget_warning": "BUDGET SERRÉ: Votre budget '${budget}' est juste suffisant. Nous avons optimisé l'itinéraire avec des options économiques. Pour plus de confort, un budget de [X]€ serait recommandé."
  
- Si le budget est CONFORTABLE:
  → Ajoute "budget_warning": null

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
  "animaux": ${animaux ? '"Oui"' : '"Non"'},
  "type_hebergement": "${typeHebergement || 'Hotel'}"
}

INSTRUCTIONS SPECIFIQUES "STYLE":
Si "style" contient:
- "Roadtrip Moto": Propose des routes scéniques avec virages, parkings sécurisés pour les hôtels obligatoires, et des étapes adaptées aux motards (pauses café, points de vue).
- "Trekking": Inclus des détails sur les sentiers (difficulté, durée), et privilégie les refuges ou hébergements proches de la nature.
- "Sportif": Centre le voyage autour d'activités physiques intenses (vélo, kayak, rando, sale de sport) et une nutrition adaptée.

INSTRUCTIONS SPECIFIQUES "VIBE":
Si "vibes_niche" contient:
- "Digital Nomad" : Priorise les cafés avec WiFi rapide, espaces de coworking, et logements adaptés au travail.
- "Pet Friendly" : Priorise les parcs, plages autorisées aux chiens, et hôtels acceptant les animaux.
- "Accessibilité PMR" : Assure - toi que les lieux sont accessibles en fauteuil roulant.
- "Nature & Déconnexion" : Évite les zones urbaines denses.
- "Vie Nocturne" : Propose des bars, clubs et quartiers animés le soir.

INSTRUCTIONS SPECIFIQUES "TYPE D'HÉBERGEMENT":
Type sélectionné: "${typeHebergement || 'Hotel'}"

- Si "All-inclusive" : 
  → Recommande UNIQUEMENT des hôtels/resorts all-inclusive
  → Prix hébergement DOIT inclure tous les repas et boissons
  → Réduis le budget restaurants à 0€ ou minimal (snacks/sorties exceptionnelles)
  → Mentionne dans les notes: "Formule all-inclusive: repas et boissons inclus dans l'hébergement"
  
- Si "Demi-pension" :
  → Recommande des hôtels avec formule demi-pension (petit-déjeuner + dîner)
  → Prix hébergement DOIT inclure petit-déjeuner et dîner
  → Budget restaurants réduit (uniquement déjeuners)
  → Mentionne dans les notes: "Formule demi-pension: petit-déjeuner et dîner inclus"
  
- Si "Airbnb" :
  → Recommande UNIQUEMENT des Airbnb/locations de vacances
  → Prix hébergement plus bas qu'un hôtel
  → Budget restaurants peut être réduit (possibilité de cuisiner)
  → Mentionne des supermarchés à proximité
  → Mentionne dans les notes: "Airbnb avec cuisine équipée, possibilité d'économiser sur les repas"
  
- Si "Hotel" :
  → Recommande des hôtels classiques (sans formule all-inclusive)
  → Prix hébergement standard
  → Budget restaurants complet
  → Mentionne dans les notes: "Hébergement en hôtel standard"

Ton objectif est de générer un itinéraire de voyage complet et RÉALISTE.
  IMPORTANT : Pour l'anti-hallucination et la carte, tu DOIS fournir des coordonnées GPS approximatives mais plausibles pour CHAQUE lieu.

IMPORTANT SUR LA DUREE:
${nombreJours ? `L'utilisateur a spécifié des dates exactes couvrant ${nombreJours} JOURS. Tu DOIS générer un itinéraire détaillé pour EXACTEMENT ${nombreJours} JOURS.` : `Génère un itinéraire type de 3 jours (Week-end).`}

IMPORTANT SUR LE RAYON:
Si "rayon_decouverte" est supérieur à 0 km, tu PEUX et DOIS inclure des activités, restaurants ou visites situés dans ce rayon autour de la destination principale. Si c'est "Ville uniquement", reste strict.

IMPORTANT SUR LA MÉTÉO:
Utilise les dates fournies (${dates ? `Du ${dates.depart} au ${dates.retour}` : "Mois inconnu"}) pour estimer la météo probable (basée sur les normales saisonnières).

⚠️ IMPORTANT SUR LA TARIFICATION - ADAPTATION PAR DESTINATION:
- Les prix DOIVENT être adaptés à la période de voyage (${dates ? `${dates.depart} au ${dates.retour}` : "période non spécifiée"})
- Considère la haute/basse saison pour cette destination
- **ADAPTE LES PRIX AU COÛT DE LA VIE LOCAL** de la destination "${destination}"
- Les prix des hôtels varient selon la saison (haute saison = +30-50%, basse saison = -20-30%)
- Les vols sont plus chers pendant les vacances scolaires et jours fériés

⚠️ MÉTHODOLOGIE DE TARIFICATION PAR DESTINATION:

**ÉTAPE 1 - ANALYSE DE LA DESTINATION "${destination}":**
1. Identifie le pays et sa région
2. Évalue le coût de la vie local (élevé/moyen/bas)
3. Calcule la distance depuis "${depart}"
4. Détermine le type de vol nécessaire (court/moyen/long-courrier)

**ÉTAPE 2 - VOLS (aller-retour par personne depuis "${depart}"):**
Calcule selon la distance réelle et la destination:
- **Europe proche** (< 1000km) : 80-200€
- **Europe moyenne** (1000-2500km) : 150-350€
- **Europe lointaine / Maghreb** (2500-4000km) : 250-500€
- **Moyen-Orient / Russie** (4000-6000km) : 300-700€
- **Asie proche / Afrique** (6000-8000km) : 450-900€
- **Asie lointaine** (8000-12000km) : 500-1200€
- **Amérique / Océanie** (> 12000km) : 700-1500€
- **Haute saison** : +40-60% sur ces prix
- **Enfants** : -30% du prix adulte

**ÉTAPE 3 - HÉBERGEMENT (par nuit, adapté au coût de vie local):**

Pour destinations à **coût de vie ÉLEVÉ** (Suisse, Norvège, Islande, Japon, USA, etc.):
- Eco : 60-120€/nuit
- Moyen : 100-180€/nuit
- Confort : 150-280€/nuit
- Luxe : 300-600€/nuit

Pour destinations à **coût de vie MOYEN** (France, Espagne, Italie, Portugal, etc.):
- Eco : 40-80€/nuit
- Moyen : 70-130€/nuit
- Confort : 120-220€/nuit
- Luxe : 250-500€/nuit

Pour destinations à **coût de vie BAS** (Maroc, Turquie, Thaïlande, Vietnam, Europe de l'Est, etc.):
- Eco : 20-50€/nuit
- Moyen : 40-80€/nuit
- Confort : 70-150€/nuit
- Luxe : 150-300€/nuit

**ÉTAPE 4 - RESTAURANTS (par personne, adapté au coût de vie local):**

Coût de vie **ÉLEVÉ**:
- Petit déjeuner : 8-20€
- Déjeuner : 18-40€
- Dîner : 30-70€

Coût de vie **MOYEN**:
- Petit déjeuner : 5-15€
- Déjeuner : 12-30€
- Dîner : 20-50€

Coût de vie **BAS**:
- Petit déjeuner : 2-8€
- Déjeuner : 5-15€
- Dîner : 8-25€

**ÉTAPE 5 - ACTIVITÉS (par personne, adapté au coût de vie local):**

Coût de vie **ÉLEVÉ**:
- Musée/Monument : 15-35€
- Excursion demi-journée : 50-120€
- Excursion journée : 100-200€

Coût de vie **MOYEN**:
- Musée/Monument : 8-25€
- Excursion demi-journée : 30-80€
- Excursion journée : 60-150€

Coût de vie **BAS**:
- Musée/Monument : 3-15€
- Excursion demi-journée : 15-50€
- Excursion journée : 30-80€

**ÉTAPE 6 - TRANSPORTS LOCAUX (par jour/personne):**

Coût de vie **ÉLEVÉ**:
- Transports en commun : 8-20€
- Taxi/Uber : 25-60€

Coût de vie **MOYEN**:
- Transports en commun : 5-15€
- Taxi/Uber : 15-40€

Coût de vie **BAS**:
- Transports en commun : 2-8€
- Taxi/Uber : 5-20€

⚠️ CALCUL PAR NOMBRE DE VOYAGEURS (CRITIQUE):
- Nombre de voyageurs: ${adultes || 1} adulte(s) + ${enfants || 0} enfant(s) = ${(adultes || 1) + (enfants || 0)} personne(s) au total
- RESTAURANTS: Prix TOTAL pour ${(adultes || 1) + (enfants || 0)} personne(s) (enfants = -30% du prix adulte)
- ACTIVITÉS: Prix TOTAL pour ${(adultes || 1) + (enfants || 0)} personne(s) (enfants = -50% du prix adulte)
- TRANSPORTS: Prix TOTAL pour ${(adultes || 1) + (enfants || 0)} personne(s) (enfants = -30% du prix adulte)
- HÉBERGEMENT: Prix par nuit pour une chambre adaptée à ${(adultes || 1) + (enfants || 0)} personne(s)

⚠️ EXEMPLE DE CALCUL POUR "${destination}":
1. Analyse: "${destination}" → Pays: [identifie], Coût de vie: [élevé/moyen/bas]
2. Distance depuis "${depart}": ~[X]km → Type de vol: [court/moyen/long-courrier]
3. Prix vol estimé: [Y]€/personne × ${(adultes || 1) + (enfants || 0)} = [Z]€ total
4. Hébergement: [A]€/nuit × ${nombreJours || 3} nuits = [B]€
5. Restaurants: [C]€/jour/personne × ${nombreJours || 3} jours × ${(adultes || 1) + (enfants || 0)} = [D]€
6. Activités: [E]€ total estimé
7. **BUDGET TOTAL: [Z + B + D + E]€**

Structure JSON attendue(STRICT) :
{
  "destination": "string",
  "budget_warning": "string ou null (CRITIQUE: message d'alerte si budget insuffisant, null si budget OK)",
  "meteo": {
    "temp_min": "string (ex: 15°C)",
    "temp_max": "string (ex: 22°C)",
    "description": "string (ex: Ensoleillé avec averses possibles)",
    "conseils": "string (ex: Prévoyez un imperméable)"
  },
  "budget_total_estime": "string",
  "formalites": {
    "documents_obligatoires": ["string (ex: Passeport valide 6 mois)", "string (ex: Visa)"],
    "vaccins": ["string (ou 'Aucun')"],
    "lien_gouvernement": "string (URL officielle pour les visas/infos)"
  },
      "transports": [
        { "type": "string", "compagnie": "string", "prix": "string", "lien": "string" }
      ],
        "hotels": [
          { 
            "nom": "string", 
            "prix_par_nuit": "string (prix/nuit pour ${dates ? `${dates.depart} - ${dates.retour}` : 'période spécifiée'})", 
            "avis": "string (ex: 4.5/5 sur Google)", 
            "emplacement": "string", 
            "lien": "string", 
            "coordinates": { "lat": number, "lng": number },
            "formule": "string (ex: All-inclusive, Demi-pension, Nuit seule)"
          }
          // ⚠️ IMPORTANT: Propose AU MOINS 3-4 HÔTELS DIFFÉRENTS avec des gammes de prix variées
        ],
          "restaurants": [
            { "nom": "string", "type": "string", "prix_moyen": "string (prix moyen par personne)", "avis": "string (ex: 4.7/5 sur TripAdvisor)", "lien": "string", "coordinates": { "lat": number, "lng": number } }
            // ⚠️ IMPORTANT: Propose AU MOINS 5-6 RESTAURANTS DIFFÉRENTS avec des cuisines variées
          ],
            "activites": [
              { 
                "nom": "string", 
                "prix": "string (prix d'entrée/activité)", 
                "description": "string", 
                "avis": "string (ex: 4.8/5)", 
                "lien": "string", 
                "coordinates": { "lat": number, "lng": number }, 
                "id": "string (unique)" 
              }
              // ⚠️ IMPORTANT: Propose AU MOINS 8-10 ACTIVITÉS DIFFÉRENTES pour donner du choix
            ],
              "itineraire": [
                {
                  "jour": "Jour 1",
                  "etapes": [
                    {
                      "heure": "08h00 - 10h00",
                      "activite": "string (nom précis de l'activité)",
                      "description": "string (description détaillée de ce qui sera fait pendant ce créneau)",
                      "coordinates": { "lat": number, "lng": number }
                    },
                    {
                      "heure": "10h00 - 12h30",
                      "activite": "string",
                      "description": "string",
                      "coordinates": { "lat": number, "lng": number }
                    },
                    {
                      "heure": "12h30 - 14h00",
                      "activite": "Déjeuner à [nom du restaurant]",
                      "description": "string",
                      "coordinates": { "lat": number, "lng": number }
                    },
                    {
                      "heure": "14h00 - 17h00",
                      "activite": "string",
                      "description": "string",
                      "coordinates": { "lat": number, "lng": number }
                    },
                    {
                      "heure": "17h00 - 19h00",
                      "activite": "string",
                      "description": "string",
                      "coordinates": { "lat": number, "lng": number }
                    },
                    {
                      "heure": "19h30 - 21h30",
                      "activite": "Dîner à [nom du restaurant]",
                      "description": "string",
                      "coordinates": { "lat": number, "lng": number }
                    }
                    // ⚠️ CRITIQUE: Chaque jour doit avoir 6-8 étapes couvrant TOUTE la journée de 8h à 22h
                    // Pas de trous dans le programme ! Chaque créneau horaire doit être rempli
                    // Varie les activités chaque jour (ne répète pas les mêmes activités)
                  ]
                }
                // ⚠️ GENERE EXACTEMENT ${nombreJours || 3} JOURS avec des programmes DIFFÉRENTS et COMPLETS
              ],
              "budget_recap": {
                "transports_total": "string (ex: 450€)",
                "hebergement_total": "string (ex: 600€ pour ${nombreJours} nuits)",
                "restaurants_total": "string (ex: 280€ estimé pour ${nombreJours} jours)",
                "activites_total": "string (ex: 170€)",
                "total_estime": "string (ex: 1500€)",
                "notes": "string (explications sur les variations de prix selon la saison ${dates ? `pour ${dates.depart} - ${dates.retour}` : ''})"
              }
}

CONTRAINTES:
1. JSON VALIDE uniquement.
2. Coordonnées 'coordinates' { lat, lng } OBLIGATOIRES pour hotels, restaurants, et surtout dans 'itineraire'(si applicable) ou au moins pour les lieux principaux.Utilise des coordonnées réalistes pour la ville cible.
3. Si 'vibes_niche' est défini, respecte - le scrupuleusement.
4. GENERE BIEN TOUS LES JOURS DEMANDÉS(${nombreJours || 'selon durée'}).Ne t'arrête pas à 3 jours si on en demande 7.
5. ⚠️ PRIX PRÉCIS: Adapte tous les prix à la période ${dates ? `${dates.depart} - ${dates.retour}` : 'spécifiée'} (haute/basse saison).
6. ⚠️ BUDGET RECAP: Ajoute OBLIGATOIREMENT la section 'budget_recap' avec le total détaillé de TOUS les postes de dépense.
7. ⚠️ PRIX PAR VOYAGEUR: Tous les prix dans budget_recap doivent être calculés pour ${(adultes || 1) + (enfants || 0)} personne(s) au total (${adultes || 1} adulte(s) + ${enfants || 0} enfant(s)).
8. ⚠️ RÉALISME PAR DESTINATION: 
   - Analyse le coût de la vie de "${destination}"
   - Calcule la distance depuis "${depart}"
   - Adapte TOUS les prix (vols, hôtels, restaurants, activités) selon cette analyse
   - Dans budget_recap.notes, JUSTIFIE tes estimations (ex: "Moscou a un coût de vie moyen, vols long-courrier depuis Paris ~600€/pers, haute saison février +50%")
9. ⚠️ PROFESSIONNALISME EXIGÉ:
   - Agis comme un agent de voyage expert avec 15 ans d'expérience
   - Vérifie la cohérence de tes prix (vols + hôtels + restaurants + activités = budget total)
   - Fournis des recommandations précises et personnalisées
   - Justifie CHAQUE estimation de prix dans budget_recap.notes avec des détails professionnels
   - Exemple de note professionnelle: "Vol Paris-Moscou: 2500km, long-courrier, haute saison (février), tarif moyen 600€/adulte, 420€/enfant (-30%). Hébergement: Moscou coût de vie moyen, hôtel 4* en centre-ville 150€/nuit. Restaurants: 25€/pers/repas (coût de vie local). Total réaliste pour 4 personnes sur ${nombreJours || 3} jours."
10. ⚠️ VARIÉTÉ DES OPTIONS (CRITIQUE):
   - Propose AU MOINS 3-4 hôtels DIFFÉRENTS avec des gammes de prix variées (économique, moyen, confort)
   - Propose AU MOINS 5-6 restaurants DIFFÉRENTS avec des cuisines variées
   - Propose AU MOINS 8-10 activités DIFFÉRENTES pour donner un large choix
   - Chaque option doit avoir un prix, un avis, et des coordonnées GPS
11. ⚠️ ITINÉRAIRE JOURNALIER DÉTAILLÉ (CRITIQUE):
   - Chaque jour doit avoir 6-8 étapes avec des HORAIRES PRÉCIS (ex: "08h00 - 10h00", "10h00 - 12h30")
   - Couvre TOUTE la journée de 8h00 à 22h00 sans trous dans le programme
   - Varie les activités CHAQUE JOUR (ne répète pas les mêmes visites/restaurants)
   - Inclus les repas dans l'itinéraire (déjeuner 12h30-14h00, dîner 19h30-21h30)
   - Chaque étape doit avoir une description DÉTAILLÉE de ce qui sera fait
   - Exemple: "10h00 - 12h30: Visite de l'Acropole - Explorez le Parthénon, le temple d'Athéna Niké et profitez de la vue panoramique sur Athènes"
   - Les activités doivent être DIFFÉRENTES chaque jour pour éviter la répétition
`;

  return callGroq(prompt);
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

  return callGroq(prompt);
};

// Fonction utilisant l'API Groq (ULTRA-RAPIDE et GRATUITE)
async function callGroq(prompt) {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    console.error("❌ Clé API Groq manquante. Fallback vers Hugging Face...");
    return callHuggingFaceFallback(prompt);
  }

  try {
    console.log(`🚀 Appel à Groq (Ultra-rapide)...`);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Tu es un expert en planification de voyages. Tu réponds UNIQUEMENT en JSON valide, sans texte supplémentaire."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 8000,
        top_p: 0.9,
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`❌ Erreur Groq API (${response.status}):`, errorData);
      throw new Error(`Groq API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("❌ Réponse Groq invalide:", data);
      throw new Error("Réponse Groq invalide");
    }

    const texte = data.choices[0].message.content;

    // Validation & Cleaning
    let cleanText = texte.replace(/```json/g, "").replace(/```/g, "").trim();
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
      console.log("✅ Réponse Groq reçue avec succès !");
      return JSON.parse(cleanText);
    } else {
      throw new Error("Format JSON invalide dans la réponse");
    }

  } catch (error) {
    console.error("❌ Erreur Groq:", error);
    console.log("⚠️ Fallback vers Hugging Face...");
    return callHuggingFaceFallback(prompt);
  }
}

// Fonction de fallback Hugging Face (GRATUIT et SANS CLÉ API)
async function callHuggingFaceFallback(prompt) {
  try {
    console.log(`🤗 Appel à Hugging Face (Gratuit)...`);

    // Utiliser Mistral via Hugging Face Inference API (gratuit)
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Tu es un expert en planification de voyages. Réponds UNIQUEMENT en JSON valide.\n\n${prompt}`,
        parameters: {
          max_new_tokens: 4000,
          temperature: 0.7,
          top_p: 0.9,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      console.error(`❌ Erreur Hugging Face (${response.status})`);
      // Si le modèle est en cours de chargement, réessayer avec un délai
      if (response.status === 503) {
        console.log("⏳ Modèle en cours de chargement, nouvelle tentative dans 10s...");
        await new Promise(resolve => setTimeout(resolve, 10000));
        return callHuggingFace(prompt); // Retry
      }
      throw new Error(`Hugging Face Error: ${response.status}`);
    }

    const data = await response.json();

    let texte;
    if (Array.isArray(data) && data[0]?.generated_text) {
      texte = data[0].generated_text;
    } else if (data.generated_text) {
      texte = data.generated_text;
    } else {
      console.error("❌ Format de réponse inattendu:", data);
      throw new Error("Format de réponse Hugging Face invalide");
    }


    // Validation & Cleaning
    let cleanText = texte.replace(/```json/g, "").replace(/```/g, "").trim();
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
      console.log("✅ Réponse Hugging Face reçue avec succès !");
      return JSON.parse(cleanText);
    } else {
      console.warn("⚠️ Pas de JSON trouvé, tentative de génération simplifiée...");
      // Fallback vers OpenRouter si le JSON n'est pas valide
      return callOpenRouterFallback(prompt);
    }

  } catch (error) {
    console.error("❌ Erreur Hugging Face:", error);
    console.log("⚠️ Fallback vers OpenRouter...");
    return callOpenRouterFallback(prompt);
  }
}

// Fonction de fallback OpenRouter (ancienne fonction renommée)
async function callOpenRouterFallback(prompt) {
  try {
    const MODELS_TO_TRY = [
      "google/gemini-2.0-flash-exp:free",
      "mistralai/mistral-7b-instruct:free",
      "meta-llama/llama-3-8b-instruct:free",
      "microsoft/phi-3-medium-128k-instruct:free"
    ];

    let lastError;

    for (const model of MODELS_TO_TRY) {
      try {
        console.log(`🤖 Tentative avec le modèle : ${model}...`);

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "Travel Generator"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "user", content: prompt }
            ]
          })
        });

        if (response.status === 429) {
          console.warn(`⚠️ Rate limit (429) sur ${model}. Passage au suivant...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }

        if (!response.ok) {
          console.warn(`⚠️ Erreur HTTP ${response.status} sur ${model}. Passage au suivant...`);
          continue;
        }

        const data = await response.json();
        if (!data || !data.choices || !data.choices.length) {
          console.warn(`⚠️ Réponse vide sur ${model}. Passage au suivant...`);
          continue;
        }

        const texte = data.choices[0].message.content;

        let cleanText = texte.replace(/```json/g, "").replace(/```/g, "").trim();
        const firstBrace = cleanText.indexOf('{');
        const lastBrace = cleanText.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1) {
          cleanText = cleanText.substring(firstBrace, lastBrace + 1);
          return JSON.parse(cleanText);
        } else {
          console.warn(`⚠️ Format JSON invalide sur ${model}. Passage au suivant...`);
          continue;
        }

      } catch (e) {
        console.error(`❌ Erreur technique sur ${model}:`, e);
        lastError = e;
      }
    }

    throw new Error(`Tous les modèles ont échoué. Dernier erreur: ${lastError?.message || 'Rate limit'}`);

  } catch (error) {
    console.error("❌ Erreur OpenRouter:", error);
    throw error;
  }
}
