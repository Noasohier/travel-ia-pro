'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useUser, UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { generateTrip, saveTrip, getTrip } from './actions';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Dynamically import ItineraryBuilder
import dynamic from 'next/dynamic';
const ItineraryBuilder = dynamic(() => import('../components/ItineraryBuilder'), { ssr: false });
import EmergencyButton from '../components/EmergencyButton';

// Constants (Copied from original App.jsx)
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

const BUDGET_MAPPING = [
  { label: "Petit", value: "Petit budget (500-1000€)", rangeLabel: "500-1k€" },
  { label: "Moyen", value: "Budget moyen (1000-2500€)", rangeLabel: "1k-2.5k€" },
  { label: "Confort", value: "Budget confortable (2500-5000€)", rangeLabel: "2.5k-5k€" },
  { label: "Luxe", value: "Budget luxe (5000€+)", rangeLabel: "5k€+" }
];


function TripGenerator() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripId = searchParams.get('tripId');

  // STATE
  const [depart, setDepart] = useState("");
  const [destination, setDestination] = useState("");
  const [rayon, setRayon] = useState(0);
  const [budgetIndex, setBudgetIndex] = useState(1);
  const [styles, setStyles] = useState<string[]>([]);
  const [vibes, setVibes] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [travelers, setTravelers] = useState({ adultes: 2, enfants: 0, animaux: false });
  const [dates, setDates] = useState({ depart: "", retour: "" });

  // Result State
  const [loading, setLoading] = useState(false);
  const [resultat, setResultat] = useState<any>(null);
  const [error, setError] = useState("");
  const [activeDay, setActiveDay] = useState(0);
  const [saving, setSaving] = useState(false);

  // Load Trip if ID present
  useEffect(() => {
    if (tripId && isLoaded) {
      setLoading(true);
      getTrip(tripId).then((trip) => {
        if (trip) {
          const content = trip.content;

          // Handle Backward Compatibility (Old format vs New format)
          if (content.request) {
            // New format: restore inputs
            setResultat(content.itinerary);
            setDestination(content.request.destination || trip.destination);
            setDepart(content.request.depart || "");
            setRayon(content.request.rayon || 0);
            setBudgetIndex(BUDGET_MAPPING.findIndex(b => b.value === content.request.budget) !== -1 ? BUDGET_MAPPING.findIndex(b => b.value === content.request.budget) : 1);
            setStyles(content.request.styles || []); // Note: splitted styles string or array
            setVibes(content.request.vibes || []);
            setDiets(content.request.diets || []);
            setDates(content.request.dates || { depart: "", retour: "" });
            setTravelers(content.request.travelers || { adultes: 2, enfants: 0, animaux: false });

            // Parse styles back if it was saved as string (depends on how we passed it)
            // In handleSave we will pass array strictly
          } else {
            // Old format: just itinerary
            setResultat(content);
            setDestination(trip.destination);
          }
        } else {
          setError("Voyage introuvable ou accès refusé.");
        }
        setLoading(false);
      });
    }
  }, [tripId, isLoaded]);

  const getImageUrl = (item: any, type: string, locationName: string) => {
    const query = `${item.nom} ${locationName} ${type} aesthetic travel photography high resolution`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(query)}?width=800&height=600&nologo=true`;
  };


  const handleSubmit = async () => {
    const budget = BUDGET_MAPPING[budgetIndex].value;

    if (!destination || styles.length === 0 || !dates.depart || !dates.retour) {
      alert("Remplis tous les champs, notamment les dates !");
      return;
    }

    setLoading(true);
    setError("");
    setResultat(null);
    setActiveDay(0);

    // Call Server Action
    const res = await generateTrip({
      destination, rayon, budget,
      style: styles.join(', '),
      depart, dates,
      vibes: vibes,
      diet: diets.join(', '),
      adultes: travelers.adultes, enfants: travelers.enfants, animaux: travelers.animaux
    });

    if (res.error) {
      setError("Erreur IA: " + res.details);
    } else {
      setResultat(res);
    }
    setLoading(false);
  };

  const handleEmergency = async (context: string) => {
    alert("La fonction d'urgence sera bientôt disponible via l'IA !");
  };

  const handleSave = async () => {
    if (!resultat) return;
    setSaving(true);

    // Prepare params object to save
    const requestParams = {
      destination,
      depart,
      rayon,
      budget: BUDGET_MAPPING[budgetIndex].value,
      styles, // Save as array for easier restore
      vibes,
      diets, // save diets as array for easier restore (was implicitly handled as string in generate)
      dates,
      travelers
    };

    try {
      await saveTrip(destination, resultat, requestParams);
      alert("Voyage enregistré !");
      router.push('/dashboard');
    } catch (e) {
      console.error(e);
      alert("Erreur lors de l'enregistrement.");
    }
    setSaving(false);
  };

  const updateResultat = (newItinerary: any) => {
    setResultat(newItinerary);
  };


  return (
    // Responsive Wrapper: Stacked on Mobile (h-screen + scroll), Side-by-Side on Desktop (h-screen + no-scroll)
    <div className="bg-slate-50 text-slate-800 h-screen w-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden font-sans">

      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 h-auto lg:h-full lg:overflow-y-auto custom-scrollbar bg-white relative z-10 flex flex-col shadow-xl lg:shadow-none">

        {/* Auth & Logo Header (Inside Left Panel) */}
        <div className="px-8 pt-8 flex justify-between items-start">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-800 to-[#FF7F50] rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3 font-serif">V</div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-wide">VELIA</h1>
              <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest -mt-1">Évasions Intelligentes</p>
            </div>
          </div>

          {/* Authentication Controls */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <Link href="/dashboard" className="text-xs font-bold text-slate-500 hover:text-indigo-600 uppercase tracking-wider">
                <i className="fa-solid fa-suitcase"></i> Mes Voyages
              </Link>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
                <UserButton showName={false} />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition uppercase tracking-wider">
                  Connexion
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>


        <div className="max-w-xl mx-auto px-8 pb-12 w-full mt-4">
          <p className="text-slate-500 text-xs lg:text-sm mb-8">Configurez votre voyage de rêve en 3 clics.</p>

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
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition shadow-sm placeholder-slate-400 font-medium outline-none"
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition shadow-sm placeholder-slate-400 font-medium outline-none"
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
                    min={new Date().toISOString().split('T')[0]}
                    value={dates.depart}
                    onChange={(e) => setDates({ ...dates, depart: e.target.value })}
                    className="w-full bg-transparent border-none pt-5 pb-1 px-3 text-sm focus:ring-0 text-slate-700 font-medium cursor-pointer relative z-10 outline-none"
                  />
                </div>
                <span className="text-slate-300">|</span>
                <div className="relative w-1/2">
                  <span className="absolute top-1 left-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider pointer-events-none">Retour</span>
                  <input
                    type="date"
                    min={dates.depart || new Date().toISOString().split('T')[0]}
                    value={dates.retour}
                    onChange={(e) => setDates({ ...dates, retour: e.target.value })}
                    className="w-full bg-transparent border-none pt-5 pb-1 px-3 text-sm focus:ring-0 text-slate-700 font-medium cursor-pointer relative z-10 outline-none"
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
                min="0" max="3" step="1"
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
                {VACATION_STYLES.map((styleItem) => {
                  const isSelected = styles.includes(styleItem.value);
                  return (
                    <div
                      key={styleItem.value}
                      onClick={() => {
                        if (isSelected) {
                          setStyles(styles.filter(s => s !== styleItem.value));
                        } else {
                          setStyles([...styles, styleItem.value]);
                        }
                      }}
                      className={`cursor-pointer rounded-xl p-3 text-center transition hover:shadow-md border-2
                                            ${isSelected
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 hover:border-indigo-300 hover:bg-white text-slate-600'
                        }`}
                    >
                      <div className="text-2xl mb-1">{styleItem.icon}</div>
                      <div className="text-xs font-bold">{styleItem.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VIBES */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Ambiance</label>
              <div className="flex flex-wrap gap-2">
                {VIBES_NICHE.map((vibe) => {
                  const isSelected = vibes.includes(vibe.value);
                  return (
                    <div
                      key={vibe.value}
                      onClick={() => {
                        if (isSelected) setVibes(vibes.filter(v => v !== vibe.value));
                        else setVibes([...vibes, vibe.value]);
                      }}
                      className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition flex items-center gap-2 border shadow-sm
                                            ${isSelected ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'}`}
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
                        if (isSelected) setDiets(diets.filter(d => d !== diet.value));
                        else setDiets([...diets, diet.value]);
                      }}
                      className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition flex items-center gap-2 border
                                            ${isSelected ? 'bg-pink-100 text-pink-600 border-pink-200' : 'bg-white text-slate-500 border-slate-200 hover:border-pink-300'}`}
                    >
                      <span>{diet.icon}</span> {diet.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Travelers */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 text-indigo-600 w-10 h-10 rounded-full flex items-center justify-center"><i className="fa-solid fa-user-group"></i></div>
                  <div><p className="text-sm font-bold text-slate-800">Adultes</p><p className="text-xs text-slate-500">12 ans et +</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setTravelers({ ...travelers, adultes: Math.max(1, travelers.adultes - 1) })} className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition flex items-center justify-center">-</button>
                  <span className="font-bold text-slate-800 w-4 text-center">{travelers.adultes}</span>
                  <button onClick={() => setTravelers({ ...travelers, adultes: travelers.adultes + 1 })} className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition flex items-center justify-center">+</button>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 text-pink-600 w-10 h-10 rounded-full flex items-center justify-center"><i className="fa-solid fa-child"></i></div>
                  <div><p className="text-sm font-bold text-slate-800">Enfants</p><p className="text-xs text-slate-500">Moins de 12 ans</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setTravelers({ ...travelers, enfants: Math.max(0, travelers.enfants - 1) })} className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition flex items-center justify-center">-</button>
                  <span className="font-bold text-slate-800 w-4 text-center">{travelers.enfants}</span>
                  <button onClick={() => setTravelers({ ...travelers, enfants: travelers.enfants + 1 })} className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition flex items-center justify-center">+</button>
                </div>
              </div>
            </div>

            {/* Animaux */}
            <div
              onClick={() => setTravelers({ ...travelers, animaux: !travelers.animaux })}
              className={`cursor-pointer flex items-center justify-between p-4 rounded-xl border transition
                            ${travelers.animaux ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-transparent'}`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <i className={`fa-solid fa-paw ${travelers.animaux ? 'text-indigo-500' : 'text-slate-400'}`}></i>
                Voyager avec un animal ?
              </div>
              <div className={`w-10 h-5 rounded-full relative transition ${travelers.animaux ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition transform ${travelers.animaux ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
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
      <div className={`w-full lg:w-1/2 relative bg-slate-100 lg:overflow-y-auto custom-scrollbar
                ${!resultat ? 'h-[500px] lg:h-full' : 'h-auto lg:h-full min-h-[500px]'}
            `}>
        {!resultat ? (
          // Placeholder Image (Exact match from original)
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
            <div id="itinerary-container" className="space-y-8 animate-fade-in-up">
              {/* Header Result */}
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-indigo-50 relative">
                <h2 className="text-3xl font-serif font-bold text-indigo-900 mb-2">
                  ✈️ Voyage à {resultat.destination}
                </h2>
                {/* Save Button ABSOLUTE in header */}
                <div className="absolute top-4 right-4">
                  <SignedIn>
                    {!tripId && (
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-10 h-10 bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-full flex items-center justify-center transition shadow-sm"
                        title="Sauvegarder ce voyage"
                      >
                        {saving ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-bookmark"></i>}
                      </button>
                    )}
                  </SignedIn>
                </div>


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

              <div className='flex justify-center'>
                <button onClick={() => setResultat(null)} className="text-sm font-bold text-slate-400 hover:text-indigo-600 underline">Générer un autre voyage</button>
              </div>

              {/* Itinerary Builder */}
              <ItineraryBuilder
                itinerary={resultat}
                activeDayIndex={activeDay}
                setActiveDayIndex={setActiveDay}
                onUpdate={updateResultat}
              />

              {/* Transports */}
              {resultat.transports?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="bg-indigo-100 p-2 rounded-lg text-xl">✈️</span> Transports
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {resultat.transports.map((t: any, i: number) => (
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

              {/* Hotels / Resto / Activities */}
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
                    {section.data.map((item: any, i: number) => (
                      <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition group">
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={getImageUrl(item, section.title, resultat.destination)}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                            alt={item.nom}
                            loading="lazy"
                          />
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                            {item.prix_par_nuit || item.prix_moyen || item.prix}
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="font-bold text-lg text-slate-800 mb-1">{item.nom}</h4>
                          <p className="text-sm text-slate-500 mb-3">{item.emplacement || item.type || item.description}</p>
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
                <EmergencyButton onEmergency={handleEmergency} />
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>}>
      <TripGenerator />
    </Suspense>
  );
}
