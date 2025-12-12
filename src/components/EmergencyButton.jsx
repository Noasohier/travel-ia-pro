
import React, { useState } from 'react';

const EmergencyButton = ({ onEmergency }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [context, setContext] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!context) return;
        setLoading(true);
        await onEmergency(context);
        setLoading(false);
        setIsOpen(false);
        setContext('');
    };

    return (
        <div className="w-full">
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
                <i className="fa-solid fa-triangle-exclamation"></i> Mode Imprévu
            </button>
            <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-800 text-center leading-relaxed">
                <strong>À quoi sert ce bouton ?</strong><br />
                Un imprévu (pluie, fatigue, lieu fermé) ? Cliquez ici pour que l'IA réadapte instantanément votre itinéraire au contexte actuel.
            </div>

            {isOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in-up relative">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
                                <i className="fa-solid fa-triangle-exclamation"></i> SOS Voyage
                            </h3>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition">
                                <i className="fa-solid fa-xmark text-xl"></i>
                            </button>
                        </div>

                        <p className="text-sm text-slate-600 mb-4 font-medium">Quel est le problème ? L'IA va réorganiser votre journée.</p>

                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
                            {["⛈️ Il pleut", "😴 Trop fatigué", "🚫 Lieu fermé", "🕒 Manque de temps"].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setContext(opt)}
                                    className="text-xs bg-slate-100 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-full whitespace-nowrap transition border border-slate-200 font-semibold"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            placeholder="Décrivez l'imprévu..."
                            className="w-full text-sm p-3 border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-red-500 outline-none min-h-[100px] resize-none"
                        />

                        <button
                            onClick={handleSubmit}
                            disabled={loading || !context}
                            className="w-full bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 disabled:opacity-50 transition flex justify-center items-center gap-2 shadow-md hover:shadow-lg transform active:scale-95"
                        >
                            {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                            Générer une alternative
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default EmergencyButton;
