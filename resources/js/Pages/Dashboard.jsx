import AppLayout from '@/Layouts/AppLayout';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';

const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR').format(montant);
};

const TooltipCustom = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-zinc-200 rounded-lg px-3 py-2 shadow-sm">
                <p className="text-xs font-medium text-zinc-800 mb-1">{label}</p>
                {payload.map((p) => (
                    <p key={p.name} className="text-xs text-zinc-500">
                        {p.name} : <span className="font-medium text-zinc-800">{p.name === 'Volume' ? formatMontant(p.value) + ' FCFA' : p.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function Dashboard({ stats, dernieres_transactions, graphique }) {
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

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                {/* Courbe des transactions */}
                <div className="bg-white border border-zinc-200 rounded-lg p-5">
                    <h2 className="text-sm font-semibold text-zinc-800 mb-4">
                        Transactions — 7 derniers jours
                    </h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={graphique}>
                            <defs>
                                <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B1A1A" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#8B1A1A" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11, fill: '#a1a1aa' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#a1a1aa' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<TooltipCustom />} />
                            <Area
                                type="monotone"
                                dataKey="transactions"
                                name="Transactions"
                                stroke="#8B1A1A"
                                strokeWidth={2}
                                fill="url(#colorTx)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Barres des anomalies */}
                <div className="bg-white border border-zinc-200 rounded-lg p-5">
                    <h2 className="text-sm font-semibold text-zinc-800 mb-4">
                        Anomalies — 7 derniers jours
                    </h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={graphique}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11, fill: '#a1a1aa' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#a1a1aa' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={<TooltipCustom />} />
                            <Bar
                                dataKey="anomalies"
                                name="Anomalies"
                                fill="#8B1A1A"
                                radius={[4, 4, 0, 0]}
                                opacity={0.8}
                            />
                        </BarChart>
                    </ResponsiveContainer>
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