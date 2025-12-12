import { useState } from 'react';
import './App.css';
import { genererVoyage as genererVoyageAPI } from '../API/proxy';
import html2pdf from 'html2pdf.js';


const VACATION_STYLES = [
  { value: "Aventure et nature", label: "Aventure", icon: "🏔️" },
  { value: "Détente et plage", label: "Détente", icon: "🧘‍♀️" },
  { value: "Culture et histoire", label: "Culture", icon: "🏛️" },
  { value: "Gastronomie", label: "Gastronomie", icon: "🍽️" },
  { value: "Shopping et ville", label: "Shopping", icon: "🛍️" },
  { value: "Romantique", label: "Romantique", icon: "💕" },
  { value: "Famille", label: "Famille", icon: "👨‍👩‍👧‍👦" }
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
  const [budgetIndex, setBudgetIndex] = useState(1); // Default to Moyen (index 1)
  const [duree, setDuree] = useState('');
  const [styles, setStyles] = useState([]);
  const [diets, setDiets] = useState([]);
  const [adultes, setAdultes] = useState(1);
  const [enfants, setEnfants] = useState(0);
  const [animaux, setAnimaux] = useState(false);
  const [dates, setDates] = useState({ depart: '', retour: '' });
  const [resultat, setResultat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [inputTypeDepart, setInputTypeDepart] = useState('text');
  const [inputTypeRetour, setInputTypeRetour] = useState('text');

  const genererVoyage = async () => {
    // Determine actual budget string from index
    const budget = BUDGET_MAPPING[budgetIndex].value;

    if (!destination || !budget || !duree || styles.length === 0) {
      alert("Remplis tous les champs !");
      return;
    }

    setLoading(true);
    setResultat(null);
    setError('');

    try {
      // APPEL VIA LE PROXY (FRONTEND)
      const data = await genererVoyageAPI({ depart, destination, budget, duree, style: styles.join(', '), diet: diets.join(', '), adultes, enfants, animaux, dates });

      try {
        let cleanText = data.itineraire;
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();

        const firstBrace = cleanText.indexOf('{');
        const lastBrace = cleanText.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1) {
          cleanText = cleanText.substring(firstBrace, lastBrace + 1);
        }

        const parsedItineraire = JSON.parse(cleanText);
        setResultat(parsedItineraire);
      } catch (parseError) {
        console.error("Erreur de parsing JSON:", parseError);
        setError("Erreur format de données reçu");
        setResultat({ error: "Format inattendu", raw: data.itineraire });
      }

    } catch (error) {
      console.error("Erreur:", error);
      setError(`❌ Erreur technique : ${error.message || "Erreur inconnue"}`);
    } finally {
      setLoading(false);
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

  return (
    // No .app-wrapper anymore, using user's body flex layout
    <>
      {/* Left Panel: Form */}
      <div className="w-full lg:w-1/2 h-full overflow-y-auto custom-scrollbar bg-white relative z-10 flex flex-col">
        <div className="max-w-xl mx-auto px-8 py-12 w-full">

          <div className="mb-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <i className="fa-solid fa-earth-americas text-3xl text-indigo-600"></i>
              <h1 className="text-3xl font-bold text-slate-900">Travel AI Pro</h1>
            </div>
            <p className="text-slate-500 text-sm">Laissez l'intelligence artificielle dessiner votre prochaine évasion.</p>
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
                </div>
              </div>
            </div>

            {/* Dates & Durée */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Durée</label>
                <div className="relative">
                  <select
                    value={duree}
                    onChange={(e) => setDuree(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition shadow-sm font-medium text-slate-700 appearance-none"
                  >
                    <option value="">Durée ?</option>
                    <option value="Week-end (2-3 jours)">Week-end</option>
                    <option value="1 semaine">1 semaine</option>
                    <option value="2 semaines">2 semaines</option>
                    <option value="3 semaines">3 semaines+</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quand ?</label>
                <div className="flex items-center bg-slate-50 rounded-xl p-1 shadow-sm border border-slate-100">
                  <input
                    type={inputTypeDepart}
                    placeholder="Départ"
                    onFocus={() => setInputTypeDepart('date')}
                    onBlur={(e) => {
                      if (!e.target.value) setInputTypeDepart('text');
                    }}
                    value={dates.depart}
                    onChange={(e) => setDates({ ...dates, depart: e.target.value })}
                    className="w-1/2 bg-transparent border-none py-2 px-3 text-sm focus:ring-0 text-slate-700 placeholder-slate-400"
                  />
                  <span className="text-slate-300">|</span>
                  <input
                    type={inputTypeRetour}
                    placeholder="Retour"
                    onFocus={() => setInputTypeRetour('date')}
                    onBlur={(e) => {
                      if (!e.target.value) setInputTypeRetour('text');
                    }}
                    value={dates.retour}
                    onChange={(e) => setDates({ ...dates, retour: e.target.value })}
                    className="w-1/2 bg-transparent border-none py-2 px-3 text-sm focus:ring-0 text-slate-700 placeholder-slate-400"

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

          <p className="mt-6 text-center text-xs text-slate-400">Powered by Advanced AI • © 2025 Travel AI Pro</p>
        </div>
      </div>

      {/* Right Panel: Results or Image */}
      <div className="hidden lg:block w-1/2 relative bg-slate-100 overflow-y-auto custom-scrollbar">
        {!resultat ? (
          // Placeholder Image
          <div className="h-full w-full relative">
            <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" alt="Travel Background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-16 left-12 right-12 text-white">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium mb-4 border border-white/30">
                ✨ Nouvelle version disponible
              </div>
              <h2 className="text-5xl font-serif mb-4 leading-tight">Le monde est grand.<br />Explorez-le mieux.</h2>
              <p className="text-lg text-slate-200 font-light max-w-md">Notre IA analyse des milliers d'itinéraires pour créer le voyage parfait, adapté à votre rythme et vos envies.</p>
            </div>
          </div>
        ) : (
          // Results Display (Reusing current card logic but wrapping in padding)
          <div className="p-8 space-y-8 min-h-full">
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
                  <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
                    Budget estimé : {resultat.budget_total_estime}
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
                  <iframe
                    width="100%"
                    height="350"
                    frameBorder="0"
                    scrolling="no"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(resultat.destination)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>

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
                            {t.lien && <a href={t.lien} target="_blank" className="text-xs text-indigo-500 hover:underline">Voir le billet</a>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Itinerary */}
                <div>
                  <h3 className="text-2xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="bg-indigo-100 p-2 rounded-lg text-xl">🗺️</span> Itinéraire
                  </h3>
                  <div className="space-y-6">
                    {resultat.itineraire.map((jour, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 font-bold text-indigo-900 border-b border-slate-100">
                          {jour.jour}
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div><span className="text-xs font-bold uppercase text-indigo-400 block mb-2">Matin</span>{jour.matin}</div>
                          <div><span className="text-xs font-bold uppercase text-indigo-400 block mb-2">Midi</span>{jour.apres_midi}</div>
                          <div><span className="text-xs font-bold uppercase text-indigo-400 block mb-2">Soir</span>{jour.soir}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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
                          {item.image_prompt && (
                            <div className="h-48 overflow-hidden relative">
                              <img
                                src={`https://image.pollinations.ai/prompt/${encodeURIComponent(item.image_prompt)}`}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                                alt={item.nom}
                              />
                              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                                {item.prix_par_nuit || item.prix_moyen || item.prix}
                              </div>
                            </div>
                          )}
                          <div className="p-5">
                            <h4 className="font-bold text-lg text-slate-800 mb-1">{item.nom}</h4>
                            <p className="text-sm text-slate-500 mb-3">{item.emplacement || item.type || item.description}</p>
                            {item.lien && (
                              <a href={item.lien} target="_blank" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                                En savoir plus <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleDownloadPDF}
                  className="w-full py-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-600 transition flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-download"></i> Télécharger le PDF
                </button>

              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;