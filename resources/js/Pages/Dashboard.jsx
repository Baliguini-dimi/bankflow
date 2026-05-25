import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ stats, dernieres_transactions }) {
    const formatMontant = (montant) => {
        return new Intl.NumberFormat('fr-FR').format(montant);
    };

    return (
        <AppLayout title="Dashboard">
            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-zinc-200 rounded-lg p-5">
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">
                        Transactions du jour
                    </p>
                    <p className="text-2xl font-semibold text-zinc-900">
                        {stats.transactions_jour}
                    </p>
                </div>
                <div className="bg-white border border-zinc-200 rounded-lg p-5">
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">
                        Volume traité
                    </p>
                    <p className="text-2xl font-semibold text-zinc-900">
                        {formatMontant(stats.volume_jour)} FCFA
                    </p>
                </div>
                <div className="bg-white border border-zinc-200 rounded-lg p-5">
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">
                        Alertes ouvertes
                    </p>
                    <p className="text-2xl font-semibold text-zinc-900">
                        {stats.alertes_ouvertes}
                    </p>
                </div>
                <div className="bg-white border border-zinc-200 rounded-lg p-5">
                    <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">
                        Anomalies du jour
                    </p>
                    <p className="text-2xl font-semibold text-zinc-900">
                        {stats.anomalies}
                    </p>
                </div>
            </div>

            {/* Tableau des dernières transactions */}
            <div className="bg-white border border-zinc-200 rounded-lg">
                <div className="px-5 py-4 border-b border-zinc-100">
                    <h2 className="text-sm font-semibold text-zinc-800">
                        Dernières opérations
                    </h2>
                </div>
                <div className="divide-y divide-zinc-100">
                    {dernieres_transactions.length === 0 ? (
                        <div className="px-5 py-8 text-center text-sm text-zinc-400">
                            Aucune transaction aujourd'hui.
                        </div>
                    ) : (
                        dernieres_transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between px-5 py-3 text-sm">
                                <span className="text-zinc-400 w-28 font-mono">{tx.reference}</span>
                                <span className="text-zinc-700 w-28">{tx.agence}</span>
                                <span className="text-zinc-900 font-medium w-36">
                                    {formatMontant(tx.montant)} FCFA
                                </span>
                                <span className="text-zinc-400 w-16 text-right">
                                    {new Date(tx.effectuee_le).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full w-24 text-center ${
                                    tx.statut === 'Validé'
                                        ? 'bg-green-50 text-green-700'
                                        : tx.statut === 'Anomalie'
                                        ? 'bg-red-50 text-[#8B1A1A]'
                                        : 'bg-zinc-100 text-zinc-500'
                                }`}>
                                    {tx.statut}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}