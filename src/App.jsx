import { useState } from 'react';
import './App.css';
import { genererVoyage as genererVoyageAPI, regenererItineraire } from '../API/proxy';
import html2pdf from 'html2pdf.js';
import ItineraryBuilder from './components/ItineraryBuilder';
import EmergencyButton from './components/EmergencyButton';


const VACATION_STYLES = [
  { value: "Aventure et nature", label: "Aventure", icon: "🏔️" },
  { value: "Détente et plage", label: "Détente", icon: "🧘‍♀️" },
  { value: "Culture et histoire", label: "Culture", icon: "🏛️" },
  { value: "Gastronomie", label: "Gastronomie", icon: "🍽️" },
  { value: "Shopping et ville", label: "Shopping", icon: "🛍️" },
  { value: "Romantique", label: "Romantique", icon: "💕" },
  { value: "Famille", label: "Famille", icon: "👨‍👩‍👧‍👦" },
  { value: "Sportif", label: "Sportif", icon: "🏃" },
  { value: "Roadtrip Moto", label: "Roadtrip Moto", icon: "🏍️" },
  { value: "Trekking", label: "Trekking", icon: "🥾" }
];

const VIBES_NICHE = [
  { value: "Digital Nomad", label: "Digital Nomad (WiFi)", icon: "💻" },
  { value: "Pet Friendly", label: "Pet Friendly", icon: "🐶" },
  { value: "Accessibilité PMR", label: "Accessibilité PMR", icon: "♿" },
  { value: "Nature & Déconnexion", label: "Nature & Déconnexion", icon: "🌲" },
  { value: "Vie Nocturne", label: "Vie Nocturne", icon: "🍸" }
];

const DIETARY_OPTIONS = [
  { value: "Végétarien", label: "Végétarien", icon: "🥗" },
  { value: "Végan", label: "Végan", icon: "🌱" },
  { value: "Halal", label: "Halal", icon: "☪️" },
  { value: "Casher", label: "Casher", icon: "🕍" },
  { value: "Sans gluten", label: "Sans gluten", icon: "🌾" },
  { value: "Sans lactose", label: "Sans lactose", icon: "🥛" },
  { value: "Pescétarien", label: "Pescétarien", icon: "🐟" }
];

// Mapping for budget slider
const BUDGET_MAPPING = [
  { label: "Petit", value: "Petit budget (500-1000€)", rangeLabel: "500-1k€" },
  { label: "Moyen", value: "Budget moyen (1000-2500€)", rangeLabel: "1k-2.5k€" },
  { label: "Confort", value: "Budget confortable (2500-5000€)", rangeLabel: "2.5k-5k€" },
  { label: "Luxe", value: "Budget luxe (5000€+)", rangeLabel: "5k€+" }
];

function App() {
  const [depart, setDepart] = useState('');
  const [destination, setDestination] = useState('');
  const [rayon, setRayon] = useState(0); // Radius in km
  const [budgetIndex, setBudgetIndex] = useState(1); // Default to Moyen (index 1)
  // const [duree, setDuree] = useState(''); // Removed as per user request
  const [styles, setStyles] = useState([]);
  const [vibes, setVibes] = useState([]); // New state for Vibes
  const [diets, setDiets] = useState([]);
  const [adultes, setAdultes] = useState(1);
  const [enfants, setEnfants] = useState(0);
  const [animaux, setAnimaux] = useState(false);
  const [dates, setDates] = useState({ depart: '', retour: '' });
  const [resultat, setResultat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  // Lifted state for the active day in the itinerary builder
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const genererVoyage = async () => {
    // Determine actual budget string from index
    const budget = BUDGET_MAPPING[budgetIndex].value;

    // Check dates instead of duration (validation)
    if (!destination || !budget || styles.length === 0 || !dates.depart || !dates.retour) {
      alert("Remplis tous les champs, notamment les dates !");
      return;
    }

    setLoading(true);
    setResultat(null);
    setError('');
    setActiveDayIndex(0); // Reset to first day on new generation

    try {
      // APPEL VIA LE PROXY (FRONTEND)
      // Removed duree from params, relying on dates
      // APPEL VIA LE PROXY (FRONTEND)
      // Removed duree from params, relying on dates
      const data = await genererVoyageAPI({ depart, destination, rayon, budget, style: styles.join(', '), diet: diets.join(', '), adultes, enfants, animaux, dates, vibes });

      try {
        // The API now returns a parsed JSON object directly, no need to parse again.
        if (data && typeof data === 'object') {
          setResultat(data);
        } else {
          // Fallback if somehow we got a string (legacy behavior)
          let cleanText = typeof data === 'string' ? data : JSON.stringify(data);
          cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsedItineraire = JSON.parse(cleanText);
          setResultat(parsedItineraire);
        }
      } catch (parseError) {
        console.error("Erreur de parsing JSON:", parseError);
        setError("Erreur format de données reçu");
        // Ensure 'raw' is a string to avoid React "Objects are not valid" error
        setResultat({ error: "Format inattendu", raw: JSON.stringify(data, null, 2) });
      }

    } catch (error) {
      console.error("Erreur:", error);
      setError(`❌ Erreur technique : ${error.message || "Erreur inconnue"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEmergency = async (context) => {
    if (!resultat) return;

    // Get the current day from state to provide better context to AI
    const currentDay = resultat.itineraire && resultat.itineraire[activeDayIndex]
      ? resultat.itineraire[activeDayIndex]
      : { jour: `Jour ${activeDayIndex + 1}` };

    const enrichedContext = `${context}. (Concerne le ${currentDay.jour})`;

    try {
      const update = await regenererItineraire({ destination, style: styles.join(', ') }, enrichedContext);
      if (update && update.itineraire_modifie) {

        const newResult = { ...resultat };
        // Update the SPECIFIC day that is currently active
        // The AI might return an array with 1 element representing the modified day.
        if (newResult.itineraire && newResult.itineraire[activeDayIndex]) {
          // We replace the steps of the active day with the new suggestions
          // Assuming update.itineraire_modifie is an array where the first element is the modified day
          const modifiedDay = update.itineraire_modifie[0];
          if (modifiedDay) {
            newResult.itineraire[activeDayIndex] = {
              ...newResult.itineraire[activeDayIndex], // Keep original day props if needed
              etapes: modifiedDay.etapes, // Replace steps
              jour: modifiedDay.jour || newResult.itineraire[activeDayIndex].jour,
              matin: undefined, midi: undefined, soir: undefined // Clear legacy fields to force use of etapes
            };
          }
        }
        setResultat(newResult);
        alert(`🚨 ${update.message_ia || "Plan mis à jour pour ce jour !"}`);
      }
    } catch (e) {
      alert("Erreur lors de la régénération d'urgence.");
      console.error(e);
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('itinerary-container');
    const opt = {
      margin: 10,
      filename: `voyage-${destination || 'itinerary'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    html2pdf().set(opt).from(element).save();
  };

  // Helper for generating consistent, high-quality image URLs
  const getImageUrl = (item, type, locationName) => {
    // Combine item Name + Destination + Type + Keywords for best results
    const query = `${item.nom} ${locationName} ${type} aesthetic travel photography high resolution`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(query)}?width=800&height=600&nologo=true`;
  };

  return (
    // Responsive Wrapper: Stacked on Mobile (h-screen + scroll), Side-by-Side on Desktop (h-screen + no-scroll)
    <div className="bg-slate-50 text-slate-800 h-screen w-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden font-sans">
      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 h-auto lg:h-full lg:overflow-y-auto custom-scrollbar bg-white relative z-10 flex flex-col shadow-xl lg:shadow-none">
        <div className="max-w-xl mx-auto px-8 py-12 w-full">

          <div className="mb-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-800 to-[#FF7F50] rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3 font-serif">V</div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-wide">VELIA</h1>
                  <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest -mt-1">Évasions Intelligentes</p>
                </div>
              </div>
            </div>
            <p className="text-slate-500 text-xs lg:text-sm mt-4">Configurez votre voyage de rêve en 3 clics.</p>
          </div>

          <div className="space-y-8">

            {/* Lieux */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Lieu de départ</label>
                <div className="relative">
                  <i className="fa-solid fa-plane-departure absolute left-4 top-3.5 text-indigo-400"></i>
                  <input
                    type="text"
                    placeholder="Ex: Paris, Lyon..."
                    value={depart}
                    onChange={(e) => setDepart(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition shadow-sm placeholder-slate-400 font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Destination</label>
                <div className="relative">
                  <i className="fa-solid fa-location-dot absolute left-4 top-3.5 text-pink-500"></i>
                  <input
                    type="text"
                    placeholder="Ex: Tokyo, Bali..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition shadow-sm placeholder-slate-400 font-medium"
                  />
                  {/* Rayon Slider */}
                  <div className="mt-2 px-1 flex items-center gap-3">
                    <i className="fa-solid fa-circle-nodes text-slate-400 text-xs"></i>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="10"
                      value={rayon}
                      onChange={(e) => setRayon(parseInt(e.target.value))}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap min-w-[60px] text-right">
                      {rayon === 0 ? "Ville" : `+ ${rayon} km`}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 pl-1 italic">
                    Explorez un large éventail d'activités à deux pas de la ville
                  </p>
                </div>
              </div>
            </div>

            {/* Dates REQUIRED */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quand ? (Dates requises)</label>
              <div className="flex items-center bg-slate-50 rounded-xl p-1 shadow-sm border border-slate-100 relative">
                <div className="relative w-1/2">
                  <span className="absolute top-1 left-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider pointer-events-none">Départ</span>
                  <input
                    type="date"
                    id="date-depart"
                    min={new Date().toISOString().split('T')[0]}
                    value={dates.depart}
                    onChange={(e) => setDates({ ...dates, depart: e.target.value })}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    className="w-full bg-transparent border-none pt-5 pb-1 px-3 text-sm focus:ring-0 text-slate-700 font-medium cursor-pointer relative z-10"
                  />
                </div>
                <span className="text-slate-300">|</span>
                <div className="relative w-1/2">
                  <span className="absolute top-1 left-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider pointer-events-none">Retour</span>
                  <input
                    type="date"
                    id="date-retour"
                    min={dates.depart || new Date().toISOString().split('T')[0]}
                    value={dates.retour}
                    onChange={(e) => setDates({ ...dates, retour: e.target.value })}
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    className="w-full bg-transparent border-none pt-5 pb-1 px-3 text-sm focus:ring-0 text-slate-700 font-medium cursor-pointer relative z-10"
                  />
                </div>
              </div>
            </div>

            {/* Budget Slider */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between">
                <span>Budget</span>
                <span className="text-indigo-600 font-bold">{BUDGET_MAPPING[budgetIndex].rangeLabel}</span>
              </label>
              <input
                type="range"
                min="0"
                max="3"
                step="1"
                value={budgetIndex}
                onChange={(e) => setBudgetIndex(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                <span>Éco</span>
                <span>Moyen</span>
                <span>Confort</span>
                <span>Luxe</span>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Styles */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Style de voyage</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {VACATION_STYLES.map((style) => {
                  const isSelected = styles.includes(style.value);
                  return (
                    <div
                      key={style.value}
                      onClick={() => {
                        if (isSelected) {
                          setStyles(styles.filter(s => s !== style.value));
                        } else {
                          setStyles([...styles, style.value]);
                        }
                      }}
                      className={`cursor-pointer rounded-xl p-3 text-center transition hover:shadow-md border-2
                                        ${isSelected
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-white text-slate-600'
                        }`}
                    >
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="text-xs font-bold">{style.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VIBES / NICHE FILTERS */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Ambiance & Besoins (Compagnon de Voyage)</label>
              <div className="flex flex-wrap gap-2">
                {VIBES_NICHE.map((vibe) => {
                  const isSelected = vibes.includes(vibe.value);
                  return (
                    <div
                      key={vibe.value}
                      onClick={() => {
                        if (isSelected) {
                          setVibes(vibes.filter(v => v !== vibe.value));
                        } else {
                          setVibes([...vibes, vibe.value]);
                        }
                      }}
                      className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition flex items-center gap-2 border shadow-sm
                                        ${isSelected
                          ? 'bg-purple-100 text-purple-700 border-purple-200'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                        }`}
                    >
                      <span>{vibe.icon}</span> {vibe.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Diets */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Régime Alimentaire</label>
              <div className="flex flex-wrap gap-2">
                {DIETARY_OPTIONS.map((diet) => {
                  const isSelected = diets.includes(diet.value);
                  return (
                    <div
                      key={diet.value}
                      onClick={() => {
                        if (isSelected) {
                          setDiets(diets.filter(d => d !== diet.value));
                        } else {
                          setDiets([...diets, diet.value]);
                        }
                      }}
                      className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition flex items-center gap-2 border
                                        ${isSelected
                          ? 'bg-pink-100 text-pink-600 border-pink-200'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-pink-300'
                        }`}
                    >
                      <span>{diet.icon}</span> {diet.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Voyageurs */}
            <div className="grid grid-cols-1 gap-4">
              {/* Adultes */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-user-group"></i>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Adultes</p>
                    <p className="text-xs text-slate-500">12 ans et +</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAdultes(Math.max(1, adultes - 1))}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition flex items-center justify-center"
                  >-</button>
                  <span className="font-bold text-slate-800 w-4 text-center">{adultes}</span>
                  <button
                    onClick={() => setAdultes(adultes + 1)}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition flex items-center justify-center"
                  >+</button>
                </div>
              </div>

              {/* Enfants */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 text-pink-600 w-10 h-10 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-child"></i>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Enfants</p>
                    <p className="text-xs text-slate-500">Moins de 12 ans</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEnfants(Math.max(0, enfants - 1))}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition flex items-center justify-center"
                  >-</button>
                  <span className="font-bold text-slate-800 w-4 text-center">{enfants}</span>
                  <button
                    onClick={() => setEnfants(enfants + 1)}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition flex items-center justify-center"
                  >+</button>
                </div>
              </div>
            </div>

            {/* Animaux */}
            <div
              onClick={() => setAnimaux(!animaux)}
              className={`cursor-pointer flex items-center justify-between p-4 rounded-xl border transition
                        ${animaux ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-transparent'}
                    `}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <i className={`fa-solid fa-paw ${animaux ? 'text-indigo-500' : 'text-slate-400'}`}></i>
                Voyager avec un animal ?
              </div>
              <div className={`w-10 h-5 rounded-full relative transition ${animaux ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition transform ${animaux ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </div>

            <button
              type="button"
              onClick={genererVoyage}
              disabled={loading}
              className="group w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Génération en cours...' : 'Générer mon voyage'}</span>
              <i className={`fa-solid fa-wand-magic-sparkles ${!loading && 'group-hover:animate-pulse'}`}></i>
            </button>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm font-bold">
                {error}
              </div>
            )}

          </div>

          <p className="mt-6 text-center text-xs text-slate-400">Powered by Advanced AI • © 2025 VELIA</p>
        </div>
      </div>

      {/* Right Panel: Results or Image */}
      {/* Visible on Mobile now (stacked at bottom), Fixed height for image on mobile, Auto for results */}
      <div className={`w-full lg:w-1/2 relative bg-slate-100 lg:overflow-y-auto custom-scrollbar
                      ${!resultat ? 'h-[500px] lg:h-full' : 'h-auto lg:h-full min-h-[500px]'}
                    `}>
        {!resultat ? (
          // Placeholder Image
          <div className="h-full w-full relative">
            <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" alt="Travel Background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-6 right-6 lg:bottom-16 lg:left-12 lg:right-12 text-white">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium mb-4 border border-white/30">
                ✨ Nouvelle version disponible
              </div>
              <h2 className="text-3xl lg:text-5xl font-serif mb-4 leading-tight">Le monde est grand.<br />Explorez-le mieux.</h2>
              <p className="text-sm lg:text-lg text-slate-200 font-light max-w-md">Notre IA analyse des milliers d'itinéraires pour créer le voyage parfait, adapté à votre rythme et vos envies.</p>
            </div>
          </div>
        ) : (
          // Results Display
          <div className="p-8 space-y-8 min-h-full pb-24">
            {resultat.error ? (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                <h3 className="text-xl font-bold text-red-600 mb-2">⚠️ Problème d'affichage</h3>
                <p className="text-slate-600 mb-4">{resultat.error}</p>
                <code className="block bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto text-slate-500">
                  {resultat.raw}
                </code>
              </div>
            ) : (
              <div id="itinerary-container" className="space-y-8 animate-fade-in-up">

                {/* Header Result */}
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-indigo-50">
                  <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-2">
                    ✈️ Voyage à {resultat.destination}
                  </h2>
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                    <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold border border-green-200">
                      Budget estimé : {resultat.budget_total_estime}
                    </div>

                    {resultat.meteo && (
                      <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium border border-blue-100">
                        <span className="text-xl">🌦️</span>
                        <div className="flex flex-col leading-tight text-left">
                          <span className="font-bold">{resultat.meteo.temp_min} - {resultat.meteo.temp_max} • {resultat.meteo.description}</span>
                          <span className="text-[10px] opacity-80">{resultat.meteo.conseils}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- NEW INTERACTIVE ITINERARY (Map + D&D) --- */}
                <ItineraryBuilder
                  itinerary={resultat}
                  onUpdate={setResultat}
                  activeDayIndex={activeDayIndex}
                  setActiveDayIndex={setActiveDayIndex}
                />



                {/* Transports */}
                {resultat.transports?.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <span className="bg-indigo-100 p-2 rounded-lg text-xl">✈️</span> Transports
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {resultat.transports.map((t, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-indigo-500 flex justify-between items-center">
                          <div>
                            <div className="font-bold text-slate-900 text-lg">{t.type}</div>
                            <div className="text-slate-500 text-sm">{t.compagnie}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-600 font-bold text-xl">{t.prix}</div>
                            {t.lien && <a href={t.lien} target="_blank" className="text-xs text-indigo-500 hover:underline cursor-pointer">Voir le billet</a>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hotels & Activities (Grid) */}
                {[
                  { title: "Hébergements", icon: "🏨", data: resultat.hotels, color: "blue" },
                  { title: "Restaurants", icon: "🍽️", data: resultat.restaurants, color: "orange" },
                  { title: "Activités", icon: "🎟️", data: resultat.activites, color: "emerald" }
                ].map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                      <span className={`bg-${section.color}-100 p-2 rounded-lg text-xl`}>{section.icon}</span> {section.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {section.data.map((item, i) => (
                        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition group">
                          <div className="h-48 overflow-hidden relative">
                            <img
                              src={getImageUrl(item, section.title, resultat.destination)}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                              alt={item.nom}
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"; // Fallback
                              }}
                              loading="lazy"
                            />
                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                              {item.prix_par_nuit || item.prix_moyen || item.prix}
                            </div>
                          </div>

                          <div className="p-5">
                            <h4 className="font-bold text-lg text-slate-800 mb-1">{item.nom}</h4>
                            <p className="text-sm text-slate-500 mb-3">{item.emplacement || item.type || item.description}</p>

                            {/* Review Section */}
                            {item.avis && (
                              <div className="flex items-center gap-1 mb-3 text-sm text-amber-500 font-medium">
                                <i className="fa-solid fa-star"></i>
                                <span>{item.avis}</span>
                              </div>
                            )}

                            {item.lien && (
                              <a href={item.lien} target="_blank" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer">
                                En savoir plus <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start pt-6 border-t border-slate-100">
                  {/* Emergency Button & Text */}
                  <EmergencyButton onEmergency={handleEmergency} />

                  {/* PDF Button */}
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-600 transition flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-download"></i> Télécharger le PDF
                  </button>
                </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;