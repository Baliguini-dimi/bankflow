import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const STATUT_STYLES = {
    'Validé': 'bg-green-50 text-green-700',
    'Anomalie': 'bg-red-50 text-[#8B1A1A]',
    'En attente': 'bg-zinc-100 text-zinc-500',
};

export default function Operations({ transactions, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [filtreStatut, setFiltreStatut] = useState(filters.statut || 'Tous');

    const formatMontant = (montant) => {
        return new Intl.NumberFormat('fr-FR').format(montant);
    };

    const appliquerFiltres = (nouveauSearch, nouveauStatut) => {
        router.get('/operations', {
            search: nouveauSearch,
            statut: nouveauStatut,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        appliquerFiltres(e.target.value, filtreStatut);
    };

    const handleStatut = (statut) => {
        setFiltreStatut(statut);
        appliquerFiltres(search, statut);
    };

    return (
        <AppLayout title="Opérations">
            {/* Filtres */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <input
                    type="text"
                    placeholder="Rechercher par référence ou agence..."
                    value={search}
                    onChange={handleSearch}
                    className="border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 bg-white focus:outline-none focus:border-zinc-400 w-full sm:w-72"
                />
                <div className="flex gap-2 flex-wrap">
                    {['Tous', 'Validé', 'En attente', 'Anomalie'].map((s) => (
                        <button
                            key={s}
                            onClick={() => handleStatut(s)}
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
                {/* En-tête desktop */}
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
                    {transactions.data.length === 0 ? (
                        <div className="px-5 py-8 text-center text-sm text-zinc-400">
                            Aucune opération trouvée.
                        </div>
                    ) : (
                        transactions.data.map((tx) => (
                            <div key={tx.id}>
                                {/* Vue desktop */}
                                <div className="hidden md:grid grid-cols-6 px-5 py-3 text-sm items-center hover:bg-zinc-50 transition-colors">
                                    <span className="font-mono text-zinc-400">{tx.reference}</span>
                                    <span className="text-zinc-700">{tx.agence}</span>
                                    <span className="text-zinc-500">{tx.type}</span>
                                    <span className="text-zinc-900 font-medium">{formatMontant(tx.montant)} FCFA</span>
                                    <span className="text-zinc-400">
                                        {new Date(tx.effectuee_le).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${STATUT_STYLES[tx.statut]}`}>
                                        {tx.statut}
                                    </span>
                                </div>

                                {/* Vue mobile */}
                                <div className="md:hidden px-4 py-3 hover:bg-zinc-50 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-mono text-xs text-zinc-400">{tx.reference}</span>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUT_STYLES[tx.statut]}`}>
                                            {tx.statut}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-zinc-800">{tx.agence}</p>
                                            <p className="text-xs text-zinc-400">{tx.type} — {new Date(tx.effectuee_le).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-zinc-900">{formatMontant(tx.montant)} FCFA</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="px-5 py-3 border-t border-zinc-100 flex items-center justify-between text-sm text-zinc-400">
                    <span>{transactions.total} opération(s)</span>
                    <div className="flex gap-2">
                        {transactions.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded border text-xs transition-colors ${
                                    link.active
                                        ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]'
                                        : 'border-zinc-200 text-zinc-600 disabled:opacity-40 hover:bg-zinc-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}