import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

const rapports = [
    { id: 1, titre: 'Rapport journalier - 25/05/2026', type: 'Journalier', agence: 'Toutes', date: '25/05/2026', taille: '245 Ko', transactions: 10, volume: '38 350 000', anomalies: 2 },
    { id: 2, titre: 'Rapport journalier - 24/05/2026', type: 'Journalier', agence: 'Toutes', date: '24/05/2026', taille: '312 Ko', transactions: 8, volume: '12 400 000', anomalies: 0 },
    { id: 3, titre: 'Rapport hebdomadaire - S20 2026', type: 'Hebdomadaire', agence: 'Toutes', date: '20/05/2026', taille: '1.2 Mo', transactions: 54, volume: '198 500 000', anomalies: 3 },
    { id: 4, titre: 'Rapport agence Plateau - Mai 2026', type: 'Mensuel', agence: 'Plateau', date: '01/05/2026', taille: '890 Ko', transactions: 120, volume: '450 000 000', anomalies: 1 },
    { id: 5, titre: 'Rapport anomalies - Avril 2026', type: 'Anomalies', agence: 'Toutes', date: '30/04/2026', taille: '156 Ko', transactions: 5, volume: '87 000 000', anomalies: 5 },
    { id: 6, titre: 'Rapport mensuel - Avril 2026', type: 'Mensuel', agence: 'Toutes', date: '30/04/2026', taille: '2.1 Mo', transactions: 312, volume: '1 240 000 000', anomalies: 7 },
];

const BADGE = {
    'Journalier': 'bg-blue-50 text-blue-700',
    'Hebdomadaire': 'bg-purple-50 text-purple-700',
    'Mensuel': 'bg-zinc-100 text-zinc-600',
    'Anomalies': 'bg-red-50 text-red-700',
};

export default function Rapports() {
    const [filtre, setFiltre] = useState('Tous');
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [apercu, setApercu] = useState(null);

    const filtered = rapports.filter((r) => filtre === 'Tous' || r.type === filtre);

    const generer = () => {
        setGenerating(true);
        setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
    };

    return (
        <AppLayout title="Rapports">

            {apercu && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={() => setApercu(null)}>
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-zinc-800">{apercu.titre}</h2>
                            <button onClick={() => setApercu(null)} className="text-zinc-400 hover:text-zinc-700 text-xl">x</button>
                        </div>
                        <div className="px-5 py-4 space-y-2">
                            {[
                                { label: 'Type', value: apercu.type },
                                { label: 'Agence', value: apercu.agence },
                                { label: 'Date', value: apercu.date },
                                { label: 'Taille', value: apercu.taille },
                                { label: 'Transactions', value: apercu.transactions },
                                { label: 'Volume', value: apercu.volume + ' FCFA' },
                                { label: 'Anomalies', value: apercu.anomalies },
                            ].map((info) => (
                                <div key={info.label} className="flex justify-between py-1 border-b border-zinc-50 last:border-0">
                                    <span className="text-xs text-zinc-400 uppercase tracking-widest">{info.label}</span>
                                    <span className="text-sm text-zinc-700 font-medium">{info.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 py-4 border-t border-zinc-100 flex justify-end gap-2">
                            <button onClick={() => setApercu(null)} className="text-xs text-zinc-600 border border-zinc-200 px-3 py-1.5 rounded hover:bg-zinc-50">Fermer</button>
                            <a href="/rapports/exporter" className="text-xs text-white bg-[#8B1A1A] px-3 py-1.5 rounded hover:bg-[#7a1616]">Exporter CSV</a>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white border border-zinc-200 rounded-lg p-5 mb-6">
                <h2 className="text-sm font-semibold text-zinc-800 mb-4">Generer un rapport</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <select className="border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-700 bg-white">
                        <option>Rapport journalier</option>
                        <option>Rapport hebdomadaire</option>
                        <option>Rapport mensuel</option>
                        <option>Rapport anomalies</option>
                        <option>Rapport de conformite BCEAO</option>
                    </select>
                    <select className="border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-700 bg-white">
                        <option>Toutes les agences</option>
                        <option>Plateau</option>
                        <option>Cocody</option>
                        <option>Yopougon</option>
                        <option>Marcory</option>
                        <option>Abobo</option>
                    </select>
                    <input type="date" defaultValue="2026-05-25" className="border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-700 bg-white" />
                    <button onClick={generer} disabled={generating} className="bg-[#8B1A1A] text-white text-sm font-medium px-4 py-2 rounded-md disabled:opacity-60">
                        {generating ? 'Generation...' : 'Generer'}
                    </button>
                </div>
                {generated && (
                    <div className="mt-3 text-green-700 text-sm bg-green-50 border border-green-100 rounded-md px-3 py-2">
                        Rapport genere avec succes.
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total rapports', value: rapports.length },
                    { label: 'Ce mois-ci', value: 4 },
                    { label: 'Anomalies', value: 1 },
                    { label: 'Conformite BCEAO', value: '100%' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-zinc-200 rounded-lg p-4">
                        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-semibold text-zinc-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 flex-wrap mb-4">
                {['Tous', 'Journalier', 'Hebdomadaire', 'Mensuel', 'Anomalies'].map((f) => (
                    <button key={f} onClick={() => setFiltre(f)} className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${filtre === f ? 'bg-[#1C1C1C] text-white' : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                <div className="divide-y divide-zinc-100">
                    {filtered.map((rapport) => (
                        <div key={rapport.id} className="flex items-center justify-between px-5 py-4 hover:bg-zinc-50 gap-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-800 truncate">{rapport.titre}</p>
                                <p className="text-xs text-zinc-400 mt-0.5">{rapport.agence} - {rapport.taille} - {rapport.date}</p>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${BADGE[rapport.type]}`}>{rapport.type}</span>
                            <div className="flex gap-2 shrink-0">
                                <button onClick={() => setApercu(rapport)} className="text-xs text-zinc-600 border border-zinc-200 px-3 py-1.5 rounded hover:bg-zinc-50">
                                    Apercu
                                </button>
                                <a href="/rapports/exporter" className="text-xs text-white bg-[#1C1C1C] px-3 py-1.5 rounded hover:bg-zinc-700">
                                    Exporter
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </AppLayout>
    );
}