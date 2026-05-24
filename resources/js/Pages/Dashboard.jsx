import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
    return (
        <AppLayout title="Dashboard">
            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Transactions du jour', value: '1 248', evolution: '+12%' },
                    { label: 'Volume traité', value: '842 M FCFA', evolution: '+8%' },
                    { label: 'Alertes ouvertes', value: '7', evolution: '-2' },
                    { label: 'Agences actives', value: '23 / 25', evolution: '' },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white border border-zinc-200 rounded-lg p-5"
                    >
                        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">
                            {stat.label}
                        </p>
                        <p className="text-2xl font-semibold text-zinc-900">
                            {stat.value}
                        </p>
                        {stat.evolution && (
                            <p className="text-xs text-zinc-400 mt-1">
                                {stat.evolution} vs hier
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Tableau des dernières transactions */}
            <div className="bg-white border border-zinc-200 rounded-lg">
                <div className="px-5 py-4 border-b border-zinc-100">
                    <h2 className="text-sm font-semibold text-zinc-800">
                        Dernières opérations
                    </h2>
                </div>
                <div className="divide-y divide-zinc-100">
                    {[
                        { ref: 'TXN-00421', agence: 'Plateau', montant: '2 500 000', statut: 'Validé', heure: '09:14' },
                        { ref: 'TXN-00420', agence: 'Cocody', montant: '780 000', statut: 'En attente', heure: '09:02' },
                        { ref: 'TXN-00419', agence: 'Yopougon', montant: '15 000 000', statut: 'Anomalie', heure: '08:47' },
                        { ref: 'TXN-00418', agence: 'Marcory', montant: '430 000', statut: 'Validé', heure: '08:31' },
                        { ref: 'TXN-00417', agence: 'Abobo', montant: '3 200 000', statut: 'Validé', heure: '08:15' },
                    ].map((tx) => (
                        <div key={tx.ref} className="flex items-center justify-between px-5 py-3 text-sm">
                            <span className="text-zinc-400 w-28 font-mono">{tx.ref}</span>
                            <span className="text-zinc-700 w-28">{tx.agence}</span>
                            <span className="text-zinc-900 font-medium w-32">{tx.montant} FCFA</span>
                            <span className="text-zinc-400 w-16 text-right">{tx.heure}</span>
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
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}