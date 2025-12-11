import { useState } from 'react';
import './App.css';
import { genererVoyage as genererVoyageAPI } from '../API/proxy';

function App() {
  const [depart, setDepart] = useState('');
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [duree, setDuree] = useState('');
  const [style, setStyle] = useState('');
  const [adultes, setAdultes] = useState(1);
  const [enfants, setEnfants] = useState(0);
  const [animaux, setAnimaux] = useState(false);
  const [dates, setDates] = useState({ depart: '', retour: '' });
  const [resultat, setResultat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genererVoyage = async () => {
    if (!destination || !budget || !duree || !style) {
      alert("Remplis tous les champs !");
      return;
    }

    setLoading(true);
    setResultat(null);
    setError('');

    try {
      // APPEL VIA LE PROXY (FRONTEND)
      const data = await genererVoyageAPI({ depart, destination, budget, duree, style, adultes, enfants, animaux, dates });

      // Plus besoin de response.json() ici car genererVoyage renvoie déjà l'objet { itineraire: ... }

      // Le code suivant s'attend à recevoir 'data' avec 'itineraire'


      try {
        let cleanText = data.itineraire;
        // Nettoyage des balises markdown éventuelles
        cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "").trim();

        // Extraction du JSON pur si texte autour
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
        // Fallback if it's just text
        setResultat({ error: "Format inattendu", raw: data.itineraire });
      }

    } catch (error) {
      console.error("Erreur:", error);
      setError(`❌ Erreur technique : ${error.message || "Erreur inconnue"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>

        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#312e81', marginBottom: '0.5rem' }}>
          🌍 Travel IA Pro
        </h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>
          Itinéraires avec données en temps réel 🔍
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              🛫 Lieu de départ
            </label>
            <input
              type="text"
              placeholder="Ex: Paris, Lyon..."
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              📍 Destination
            </label>
            <input
              type="text"
              placeholder="Ex: Tokyo, Bali..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              💰 Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
            >
              <option value="">Budget ?</option>
              <option value="Petit budget (500-1000€)">Petit (500-1000€)</option>
              <option value="Budget moyen (1000-2500€)">Moyen (1000-2500€)</option>
              <option value="Budget confortable (2500-5000€)">Confort (2500-5000€)</option>
              <option value="Budget luxe (5000€+)">Luxe (5000€+)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              ⏱️ Durée
            </label>
            <select
              value={duree}
              onChange={(e) => setDuree(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
            >
              <option value="">Durée ?</option>
              <option value="Week-end (2-3 jours)">Week-end</option>
              <option value="1 semaine">1 semaine</option>
              <option value="2 semaines">2 semaines</option>
              <option value="3 semaines">3 semaines+</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              ✨ Style
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
            >
              <option value="">Style ?</option>
              <option value="Aventure et nature">🏔️ Aventure</option>
              <option value="Détente et plage">🏖️ Détente</option>
              <option value="Culture et histoire">🏛️ Culture</option>
              <option value="Gastronomie">🍽️ Gastronomie</option>
              <option value="Shopping et ville">🛍️ Shopping</option>
              <option value="Romantique">💕 Romantique</option>
              <option value="Famille">👨‍👩‍👧‍👦 Famille</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              📅 Date de départ
            </label>
            <input
              type="date"
              value={dates.depart}
              onChange={(e) => setDates({ ...dates, depart: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              📅 Date de retour
            </label>
            <input
              type="date"
              value={dates.retour}
              onChange={(e) => setDates({ ...dates, retour: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
            />
          </div>
        </div>

        {/* Section Voyageurs */}
        <div style={{ marginBottom: '2rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#1e40af', marginBottom: '1rem', marginTop: 0 }}>👥 Voyageurs</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', alignItems: 'end' }}>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                Adultes 🧑
              </label>
              <input
                type="number"
                min="1"
                value={adultes}
                onChange={(e) => setAdultes(parseInt(e.target.value) || 1)}
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                Enfants 🧒
              </label>
              <input
                type="number"
                min="0"
                value={enfants}
                onChange={(e) => setEnfants(parseInt(e.target.value) || 0)}
                style={{ width: '100%', padding: '0.75rem', border: '2px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingBottom: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '600', color: '#374151' }}>
                <input
                  type="checkbox"
                  checked={animaux}
                  onChange={(e) => setAnimaux(e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', accentColor: '#4f46e5' }}
                />
                Animaux 🐾
              </label>
            </div>

          </div>
        </div>

        <button
          onClick={genererVoyage}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? '#9ca3af' : '#4f46e5',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}
        >
          {loading ? '🔄 Recherche en cours... (30s)' : '🚀 Générer mon voyage'}
        </button>

        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {resultat && !resultat.error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Résumé */}
            <div style={{ background: '#eff6ff', padding: '1.5rem', borderRadius: '0.75rem', borderLeft: '5px solid #3b82f6' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '0.5rem' }}>
                ✈️ Voyage à {resultat.destination}
              </h2>
              <p><strong>💰 Budget estimé :</strong> {resultat.budget_total_estime}</p>
            </div>

            {/* Carte Google Maps */}
            <div style={{ borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <iframe
                width="100%"
                height="300"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(resultat.destination)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>

            {/* Transports */}
            {resultat.transports && resultat.transports.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' }}>✈️ Options de Transport</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {resultat.transports.map((transport, index) => (
                    <div key={index} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', borderLeft: '4px solid #6366f1' }}>
                      <div style={{ fontWeight: 'bold', color: '#1e3a8a' }}>{transport.type}</div>
                      <div style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{transport.compagnie}</div>
                      <div style={{ color: '#059669', fontWeight: '600' }}>{transport.prix}</div>
                      {transport.lien && (
                        <a href={transport.lien} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '0.5rem', color: '#4f46e5', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
                          🎟️ Voir le billet
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hôtels */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' }}>🏨 Hébergements recommandés</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {resultat.hotels.map((hotel, index) => (
                  <div key={index} style={{ background: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                    {hotel.image_prompt && (
                      <img
                        src={`https://image.pollinations.ai/prompt/${encodeURIComponent(hotel.image_prompt)}`}
                        alt={hotel.nom}
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 'bold', color: '#111827' }}>{hotel.nom}</div>
                      <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{hotel.emplacement}</div>
                      <div style={{ color: '#059669', fontWeight: '600', marginTop: '0.5rem' }}>{hotel.prix_par_nuit}</div>
                      {hotel.lien && (
                        <a href={hotel.lien} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '0.5rem', color: '#4f46e5', textDecoration: 'none', fontSize: '0.9rem' }}>
                          🔗 Voir le site
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinéraire */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' }}>🗺️ Itinéraire jour par jour</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {resultat.itineraire.map((jour, index) => (
                  <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
                    <div style={{ background: '#f3f4f6', padding: '0.75rem', fontWeight: 'bold', borderBottom: '1px solid #e5e7eb' }}>
                      {jour.jour}
                    </div>
                    <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase' }}>Matin</span>
                        {jour.matin}
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase' }}>Après-midi</span>
                        {jour.apres_midi}
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase' }}>Soir</span>
                        {jour.soir}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurants */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' }}>🍽️ Restaurants à tester</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {resultat.restaurants.map((resto, index) => (
                  <div key={index} style={{ background: '#fffbeb', borderRadius: '0.5rem', border: '1px solid #fde68a', overflow: 'hidden' }}>
                    {resto.image_prompt && (
                      <img
                        src={`https://image.pollinations.ai/prompt/${encodeURIComponent(resto.image_prompt)}`}
                        alt={resto.nom}
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 'bold', color: '#92400e' }}>{resto.nom}</div>
                      <div style={{ color: '#b45309', fontSize: '0.9rem' }}>{resto.type}</div>
                      <div style={{ color: '#d97706', fontWeight: '600', marginTop: '0.5rem' }}>{resto.prix_moyen}</div>
                      {resto.lien && (
                        <a href={resto.lien} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '0.5rem', color: '#b45309', textDecoration: 'underline', fontSize: '0.9rem' }}>
                          🔗 Voir le resto
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activités */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' }}>🎟️ Activités incontournables</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {resultat.activites.map((act, index) => (
                  <div key={index} style={{ background: '#ecfdf5', borderRadius: '0.5rem', border: '1px solid #a7f3d0', overflow: 'hidden' }}>
                    {act.image_prompt && (
                      <img
                        src={`https://image.pollinations.ai/prompt/${encodeURIComponent(act.image_prompt)}`}
                        alt={act.nom}
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                      />
                    )}
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 'bold', color: '#065f46' }}>{act.nom}</div>
                      <div style={{ color: '#047857', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{act.description}</div>
                      <div style={{ color: '#059669', fontWeight: '600' }}>{act.prix}</div>
                      {act.lien && (
                        <a href={act.lien} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: '0.5rem', color: '#059669', textDecoration: 'underline', fontSize: '0.9rem' }}>
                          🔗 Voir l'activité
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {resultat && resultat.error && (
          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #red', borderRadius: '0.5rem' }}>
            <h3>⚠️ Problème d'affichage</h3>
            <p>{resultat.error}</p>
            <code style={{ display: 'block', background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' }}>
              {resultat.raw}
            </code>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;