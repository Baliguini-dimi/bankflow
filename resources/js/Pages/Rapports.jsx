import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

const rapportsDisponibles = [
    { id: 1, titre: 'Rapport journalier — 25/05/2026', type: 'Journalier', agence: 'Toutes', statut: 'Généré', date: '25/05/2026', taille: '245 Ko' },
    { id: 2, titre: 'Rapport journalier — 24/05/2026', type: 'Journalier', agence: 'Toutes', statut: 'Généré', date: '24/05/2026', taille: '312 Ko' },
    { id: 3, titre: 'Rapport hebdomadaire — S20 2026', type: 'Hebdomadaire', agence: 'Toutes', statut: 'Généré', date: '20/05/2026', taille: '1.2 Mo' },
    { id: 4, titre: 'Rapport agence Plateau — Mai 2026', type: 'Mensuel', agence: 'Plateau', statut: 'Généré', date: '01/05/2026', taille: '890 Ko' },
    { id: 5, titre: 'Rapport anomalies — Avril 2026', type: 'Anomalies', agence: 'Toutes', statut: 'Généré', date: '30/04/2026', taille: '156 Ko' },
    { id: 6, titre: 'Rapport mensuel — Avril 2026', type: 'Mensuel', agence: 'Toutes', statut: 'Généré', date: '30/04/2026', taille: '2.1 Mo' },
];

const TYPE_BADGE = {
    'Journalier': 'bg-blue-50 text-blue-700',
    'Hebdomadaire': 'bg-purple-50 text-purple-700',
    'Mensuel': 'bg-zinc-100 text-zinc-600',
    'Anomalies': 'bg-red-50 text-[#8B1A1A]',
};

export default function Rapports() {
    const [typeFiltre, setTypeFiltre] = useState('Tous');
    const [generating, setGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);

    const filtered = rapportsDisponibles.filter((r) => {
        if (typeFiltre === 'Tous') return true;
        return r.type === typeFiltre;
    });

    const handleGenerate = () => {
        setGenerating(true);
        setGenerated(false);
        setTimeout(() => {
            setGenerating(false);
            setGenerated(true);
        }, 2000);
    };

    return (
        <AppLayout title="Rapports">
            {/* Génération rapide */}
            <div className="bg-white border border-zinc-200 rounded-lg p-5 mb-6">
                <h2 className="text-sm font-semibold text-zinc-800 mb-4">
                    Générer un nouveau rapport
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                    <select className="border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-700 bg-white focus:outline-none focus:border-zinc-400">
                        <option>Rapport journalier</option>
                        <option>Rapport hebdomadaire</option>
                        <option>Rapport mensuel</option>
                        <option>Rapport d'anomalies</option>
                        <option>Rapport de conformité BCEAO</option>
                    </select>
                    <select className="border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-700 bg-white focus:outline-none focus:border-zinc-400">
                        <option>Toutes les agences</option>
                        <option>Plateau</option>
                        <option>Cocody</option>
                        <option>Yopougon</option>
                        <option>Marcory</option>
                        <option>Abobo</option>
                        <option>Adjamé</option>
                        <option>Treichville</option>
                    </select>
                    <input
                        type="date"
                        defaultValue="2026-05-25"
                        className="border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-700 bg-white focus:outline-none focus:border-zinc-400"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={generating}
                        className="bg-[#8B1A1A] hover:bg-[#7a1616] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-60 shrink-0"
                    >
                        {generating ? 'Génération...' : 'Générer'}
                    </button>
                </div>

                {generated && (
                    <div className="mt-3 flex items-center gap-2 text-green-700 text-sm bg-green-50 border border-green-100 rounded-md px-3 py-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                        Rapport généré avec succès. Il apparait dans la liste ci-dessous.
                    </div>
                )}
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total rapports', value: rapportsDisponibles.length },
                    { label: 'Ce mois-ci', value: 4 },
                    { label: 'Anomalies signalées', value: 1 },
                    { label: 'Conformité BCEAO', value: '100%' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-zinc-200 rounded-lg p-4">
                        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-semibold text-zinc-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filtres */}
            <div className="flex gap-2 flex-wrap mb-4">
                {['Tous', 'Journalier', 'Hebdomadaire', 'Mensuel', 'Anomalies'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setTypeFiltre(f)}
                        className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                            typeFiltre === f
                                ? 'bg-[#1C1C1C] text-white'
                                : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Liste des rapports */}
            <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                <div className="divide-y divide-zinc-100">
                    {filtered.length === 0 ? (
                        <div className="px-5 py-8 text-center text-sm text-zinc-400">
                            Aucun rapport dans cette catégorie.
                        </div>
                    ) : (
                        filtered.map((rapport) => (
                            <div key={rapport.id} className="flex items-center justify-between px-5 py-4 hover:bg-zinc-50 transition-colors gap-4">
                                {/* Infos rapport */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-zinc-800 truncate">{rapport.titre}</p>
                                    <p className="text-xs text-zinc-400 mt-0.5">{rapport.agence} — {rapport.taille} — {rapport.date}</p>
                                </div>

                                {/* Badge type */}
                                <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${TYPE_BADGE[rapport.type]}`}>
                                    {rapport.type}
                                </span>

                                {/* Actions */}
                                <div className="flex gap-2 shrink-0">
                                    <button className="text-xs text-zinc-600 border border-zinc-200 px-3 py-1.5 rounded hover:bg-zinc-50 transition-colors">
                                        Aperçu
                                    </button>
                                    <button className="text-xs text-white bg-[#1C1C1C] px-3 py-1.5 rounded hover:bg-zinc-700 transition-colors">
                                        Exporter
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}