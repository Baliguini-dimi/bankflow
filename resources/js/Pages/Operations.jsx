import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

const transactions = [
    { ref: 'TXN-00421', agence: 'Plateau', type: 'Virement', montant: '2 500 000', statut: 'Validé', heure: '09:14', date: '25/05/2026' },
    { ref: 'TXN-00420', agence: 'Cocody', type: 'Retrait', montant: '780 000', statut: 'En attente', heure: '09:02', date: '25/05/2026' },
    { ref: 'TXN-00419', agence: 'Yopougon', type: 'Virement', montant: '15 000 000', statut: 'Anomalie', heure: '08:47', date: '25/05/2026' },
    { ref: 'TXN-00418', agence: 'Marcory', type: 'Dépôt', montant: '430 000', statut: 'Validé', heure: '08:31', date: '25/05/2026' },
    { ref: 'TXN-00417', agence: 'Abobo', type: 'Dépôt', montant: '3 200 000', statut: 'Validé', heure: '08:15', date: '25/05/2026' },
    { ref: 'TXN-00416', agence: 'Treichville', type: 'Retrait', montant: '650 000', statut: 'Validé', heure: '07:58', date: '25/05/2026' },
    { ref: 'TXN-00415', agence: 'Adjamé', type: 'Virement', montant: '8 900 000', statut: 'Anomalie', heure: '07:45', date: '25/05/2026' },
    { ref: 'TXN-00414', agence: 'Plateau', type: 'Dépôt', montant: '1 200 000', statut: 'Validé', heure: '07:30', date: '25/05/2026' },
    { ref: 'TXN-00413', agence: 'Cocody', type: 'Virement', montant: '5 400 000', statut: 'En attente', heure: '07:15', date: '25/05/2026' },
    { ref: 'TXN-00412', agence: 'Yopougon', type: 'Retrait', montant: '290 000', statut: 'Validé', heure: '07:02', date: '25/05/2026' },
];

const STATUT_STYLES = {
    'Validé': 'bg-green-50 text-green-700',
    'Anomalie': 'bg-red-50 text-[#8B1A1A]',
    'En attente': 'bg-zinc-100 text-zinc-500',
};

const PER_PAGE = 5;

export default function Operations() {
    const [search, setSearch] = useState('');
    const [filtreStatut, setFiltreStatut] = useState('Tous');
    const [page, setPage] = useState(1);

    const filtered = transactions.filter((tx) => {
        const matchSearch =
            tx.ref.toLowerCase().includes(search.toLowerCase()) ||
            tx.agence.toLowerCase().includes(search.toLowerCase());
        const matchStatut = filtreStatut === 'Tous' || tx.statut === filtreStatut;
        return matchSearch && matchStatut;
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <AppLayout title="Opérations">
            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <input
                    type="text"
                    placeholder="Rechercher par référence ou agence..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 bg-white focus:outline-none focus:border-zinc-400 w-full sm:w-72"
                />
                <div className="flex gap-2 flex-wrap">
                    {['Tous', 'Validé', 'En attente', 'Anomalie'].map((s) => (
                        <button
                            key={s}
                            onClick={() => { setFiltreStatut(s); setPage(1); }}
                            className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                                filtreStatut === s
                                    ? 'bg-[#1C1C1C] text-white'
                                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tableau */}
            <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">

                {/* En-tête — visible uniquement sur desktop */}
                <div className="hidden md:grid grid-cols-6 px-5 py-3 border-b border-zinc-100 text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    <span>Référence</span>
                    <span>Agence</span>
                    <span>Type</span>
                    <span>Montant</span>
                    <span>Heure</span>
                    <span>Statut</span>
                </div>

                {/* Lignes */}
                <div className="divide-y divide-zinc-100">
                    {paginated.length === 0 ? (
                        <div className="px-5 py-8 text-center text-sm text-zinc-400">
                            Aucune opération trouvée.
                        </div>
                    ) : (
                        paginated.map((tx) => (
                            <div key={tx.ref}>
                                {/* Vue desktop */}
                                <div className="hidden md:grid grid-cols-6 px-5 py-3 text-sm items-center hover:bg-zinc-50 transition-colors">
                                    <span className="font-mono text-zinc-400">{tx.ref}</span>
                                    <span className="text-zinc-700">{tx.agence}</span>
                                    <span className="text-zinc-500">{tx.type}</span>
                                    <span className="text-zinc-900 font-medium">{tx.montant} FCFA</span>
                                    <span className="text-zinc-400">{tx.heure}</span>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${STATUT_STYLES[tx.statut]}`}>
                                        {tx.statut}
                                    </span>
                                </div>

                                {/* Vue mobile */}
                                <div className="md:hidden px-4 py-3 hover:bg-zinc-50 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-mono text-xs text-zinc-400">{tx.ref}</span>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUT_STYLES[tx.statut]}`}>
                                            {tx.statut}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-zinc-800">{tx.agence}</p>
                                            <p className="text-xs text-zinc-400">{tx.type} — {tx.heure}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-zinc-900">{tx.montant} FCFA</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="px-5 py-3 border-t border-zinc-100 flex items-center justify-between text-sm text-zinc-400">
                    <span>{filtered.length} opération(s)</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 rounded border border-zinc-200 text-zinc-600 disabled:opacity-40 hover:bg-zinc-50"
                        >
                            Précédent
                        </button>
                        <span className="px-3 py-1 text-zinc-500">
                            {page} / {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 rounded border border-zinc-200 text-zinc-600 disabled:opacity-40 hover:bg-zinc-50"
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}