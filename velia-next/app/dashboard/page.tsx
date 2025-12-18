import { getTrips, deleteTrip } from "../actions";
import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";

export const dynamic = 'force-dynamic';

const getCoverImage = (destination: string) => {
    const query = `${destination} travel landscape aesthetic high resolution wallpaper`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(query)}?width=400&height=200&nologo=true`;
};

export default async function Dashboard() {
    const trips = await getTrips();

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-100 py-4 sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-600">
                        VELIA <span className="text-slate-400 font-medium text-sm">Next</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-indigo-600">
                            Nouveau voyage
                        </Link>
                        <div className="w-px h-6 bg-slate-200"></div>
                        <UserButton showName />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Mes Voyages ({trips.length})</h1>

                {trips.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                        <p className="text-slate-400 mb-4">Vous n'avez pas encore enregistré de voyage.</p>
                        <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition">
                            Créer mon premier voyage
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trips.map((trip) => (
                            <div key={trip.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition flex flex-col h-full group">
                                <div className="h-40 relative overflow-hidden">
                                    <img
                                        src={getCoverImage(trip.destination)}
                                        alt={trip.destination}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <h2 className="text-2xl font-bold text-white leading-tight shadow-sm">{trip.destination}</h2>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                        {new Date(trip.createdAt).toLocaleDateString()}
                                    </div>
                                    <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                                        Itinéraire de {trip.content.itinerary?.itineraire?.length || trip.content.itineraire?.length || '?'} jours généré par l'IA.
                                    </p>
                                    <div className="flex gap-2 mt-auto">
                                        <Link href={`/?tripId=${trip.id}`} className="flex-1 text-center py-2 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 font-bold rounded-lg transition text-sm">
                                            Voir
                                        </Link>
                                        {/* Add delete button logic later if needed via client wrapper */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
