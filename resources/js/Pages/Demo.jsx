import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const formatMontant = (montant) =>
    new Intl.NumberFormat('fr-FR').format(montant);

const formatCompact = (montant) =>
    new Intl.NumberFormat('fr-FR', {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(montant);

const kpis = [
    { key: 'transactions_jour', label: 'Transactions suivies', suffix: '' },
    { key: 'volume_jour', label: 'Volume supervisé', suffix: ' FCFA' },
    { key: 'alertes_ouvertes', label: 'Alertes à examiner', suffix: '' },
    { key: 'anomalies', label: 'Anomalies détectées', suffix: '' },
];

const statusStyles = {
    Validé: 'bg-emerald-50 text-emerald-700',
    'En attente': 'bg-amber-50 text-amber-700',
    Anomalie: 'bg-red-50 text-red-700',
    'À vérifier': 'bg-sky-50 text-sky-700',
};

const alertStyles = {
    Critique: 'bg-red-50 text-red-700',
    Élevé: 'bg-amber-50 text-amber-700',
    'À suivre': 'bg-sky-50 text-sky-700',
};

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-lg">
            <p className="mb-1 text-xs font-semibold text-zinc-800">{label}</p>
            {payload.map((item) => (
                <p key={item.dataKey} className="text-xs text-zinc-600">
                    {item.name}: {item.dataKey === 'volume'
                        ? `${formatMontant(item.value)} FCFA`
                        : item.value}
                </p>
            ))}
        </div>
    );
}

export default function Demo({ stats, graphique, dernieres_transactions, alertes }) {
    return (
        <div className="min-h-screen bg-[#f7f7f6] text-zinc-900">
            <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4 lg:px-8">
                    <a href="/" className="text-lg font-semibold tracking-tight sm:text-xl" aria-label="BankFlow, accueil">
                        Bank<span className="text-[#8B1A1A]">Flow</span>
                    </a>
                    <nav className="hidden items-center gap-7 text-sm text-zinc-600 md:flex" aria-label="Navigation principale">
                        <a href="#demo" className="transition hover:text-[#8B1A1A]">Aperçu</a>
                        <a href="#fonctionnalites" className="transition hover:text-[#8B1A1A]">Fonctionnalités</a>
                        <a href="#contact" className="transition hover:text-[#8B1A1A]">Contact</a>
                    </nav>
                    <a
                        href="/login"
                        className="min-h-10 rounded-md border border-zinc-300 px-3 py-2 text-xs font-medium transition hover:border-[#8B1A1A] hover:text-[#8B1A1A] sm:px-4 sm:text-sm"
                    >
                        Accès équipe
                    </a>
                </div>
                <nav className="flex items-center gap-6 overflow-x-auto border-t border-zinc-100 px-4 py-2 text-xs text-zinc-600 md:hidden" aria-label="Navigation mobile">
                    <a href="#demo" className="shrink-0 py-1">Aperçu</a>
                    <a href="#fonctionnalites" className="shrink-0 py-1">Fonctionnalités</a>
                    <a href="#contact" className="shrink-0 py-1">Contact</a>
                </nav>
            </header>

            <main>
                <section className="bg-[#1c1c1c] text-white">
                    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:gap-10 sm:px-5 sm:py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-24 lg:px-8">
                        <div>
                            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium leading-5 text-zinc-200 sm:text-xs">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Aperçu produit · données fictives
                            </span>
                            <h1 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:mt-6 sm:text-4xl md:text-5xl">
                                Une vision claire de vos opérations bancaires.
                            </h1>
                            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-300 sm:mt-5 sm:text-base sm:leading-7">
                                Centralisez l’activité de vos agences, repérez les opérations à examiner et donnez à vos équipes une vue de supervision plus lisible.
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                                <a
                                    href="#demo"
                                    className="flex min-h-11 w-full items-center justify-center rounded-md bg-[#8B1A1A] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#a32222] sm:w-auto"
                                >
                                    Explorer le tableau de bord
                                </a>
                                <a
                                    href="#contact"
                                    className="flex min-h-11 w-full items-center justify-center rounded-md border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                                >
                                    Échanger sur le projet
                                </a>
                            </div>
                            <p className="mt-4 text-xs leading-5 text-zinc-400 sm:mt-5">
                                Prototype de présentation — ne traite aucune opération réelle et ne constitue pas un outil de conformité réglementaire.
                            </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 sm:p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Pensé pour superviser</p>
                            <div className="mt-5 space-y-4">
                                {[
                                    ['01', 'Activité multi-agences', 'Suivez les indicateurs clés depuis une vue consolidée.'],
                                    ['02', 'Alertes prioritaires', 'Repérez rapidement les opérations qui méritent une vérification.'],
                                    ['03', 'Traçabilité', 'Donnez aux équipes un point de départ pour le suivi des événements.'],
                                ].map(([number, title, description]) => (
                                    <div key={number} className="flex gap-4 border-t border-white/10 pt-4 first:border-0 first:pt-0">
                                        <span className="font-mono text-sm text-red-300">{number}</span>
                                        <div>
                                            <h2 className="text-sm font-semibold">{title}</h2>
                                            <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="demo" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-10 sm:px-5 sm:py-12 lg:px-8">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B1A1A]">Aperçu produit</p>
                            <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">Tableau de supervision</h2>
                            <p className="mt-1 text-sm text-zinc-500">Indicateurs simulés · période de démonstration</p>
                        </div>
                        <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
                            Jeu de données fictif
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                        {kpis.map((item) => (
                            <article key={item.key} className={`min-w-0 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 ${item.key === 'volume_jour' ? 'col-span-2 sm:col-span-1' : ''}`}>
                                <p className="text-[10px] font-medium uppercase leading-4 tracking-wider text-zinc-500 sm:text-xs">{item.label}</p>
                                <p
                                    className="mt-2 text-xl font-semibold tracking-tight sm:mt-3 sm:text-2xl"
                                    title={item.key === 'volume_jour' ? `${formatMontant(stats[item.key])} FCFA` : undefined}
                                >
                                    {item.key === 'volume_jour' ? formatCompact(stats[item.key]) : formatMontant(stats[item.key])}{item.suffix}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                        <article className="min-w-0 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold">Volume supervisé</h3>
                                <p className="mt-1 text-xs text-zinc-500">Évolution sur les 7 derniers jours · FCFA</p>
                            </div>
                            <div className="h-52 min-w-0 sm:h-64" role="img" aria-label="Graphique du volume fictif supervisé sur sept jours">
                                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} initialDimension={{ width: 250, height: 208 }}>
                                    <AreaChart data={graphique} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="demoVolume" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8B1A1A" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#8B1A1A" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid stroke="#f1f1f1" strokeDasharray="3 3" />
                                        <XAxis dataKey="date" interval={1} tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
                                        <YAxis tickFormatter={formatCompact} tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} width={48} />
                                        <Tooltip content={<ChartTooltip />} />
                                        <Area type="monotone" dataKey="volume" name="Volume" stroke="#8B1A1A" strokeWidth={2} fill="url(#demoVolume)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </article>

                        <article className="min-w-0 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5">
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold">Anomalies signalées</h3>
                                <p className="mt-1 text-xs text-zinc-500">Exemple d’activité fictive sur 7 jours</p>
                            </div>
                            <div className="h-52 min-w-0 sm:h-64" role="img" aria-label="Graphique des anomalies fictives signalées sur sept jours">
                                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} initialDimension={{ width: 250, height: 208 }}>
                                    <BarChart data={graphique} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                                        <CartesianGrid stroke="#f1f1f1" strokeDasharray="3 3" />
                                        <XAxis dataKey="date" interval={1} tick={{ fontSize: 10, fill: '#71717a' }} axisLine={false} tickLine={false} />
                                        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} width={32} />
                                        <Tooltip content={<ChartTooltip />} />
                                        <Bar dataKey="anomalies" name="Anomalies" fill="#8B1A1A" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </article>
                    </div>

                    <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[1.5fr_1fr]">
                        <article className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                            <div className="border-b border-zinc-100 px-5 py-4">
                                <h3 className="text-sm font-semibold">Exemples d’opérations</h3>
                                <p className="mt-1 text-xs text-zinc-500">Références et montants entièrement fictifs</p>
                            </div>
                            <div className="divide-y divide-zinc-100 md:hidden">
                                {dernieres_transactions.map((transaction) => (
                                    <div key={transaction.reference} className="px-4 py-3">
                                        <div className="flex min-w-0 items-center justify-between gap-3">
                                            <span className="truncate font-mono text-xs text-zinc-500">{transaction.reference}</span>
                                            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[transaction.statut] ?? 'bg-zinc-100 text-zinc-700'}`}>
                                                {transaction.statut}
                                            </span>
                                        </div>
                                        <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                                            <span className="truncate text-zinc-600">{transaction.agence}</span>
                                            <span className="shrink-0 font-semibold">{formatMontant(transaction.montant)} FCFA</span>
                                        </div>
                                        <p className="mt-1 text-xs text-zinc-500">{transaction.type} · {transaction.effectuee_le}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full min-w-[620px] text-left text-sm">
                                    <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-500">
                                        <tr>
                                            <th scope="col" className="px-5 py-3 font-medium">Référence</th>
                                            <th scope="col" className="px-5 py-3 font-medium">Agence</th>
                                            <th scope="col" className="px-5 py-3 font-medium">Montant</th>
                                            <th scope="col" className="px-5 py-3 font-medium">Statut</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {dernieres_transactions.map((transaction) => (
                                            <tr key={transaction.reference}>
                                                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-zinc-500">{transaction.reference}</td>
                                                <td className="px-5 py-3 text-zinc-700">{transaction.agence}</td>
                                                <td className="whitespace-nowrap px-5 py-3 font-medium">{formatMontant(transaction.montant)} FCFA</td>
                                                <td className="px-5 py-3">
                                                    <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[transaction.statut] ?? 'bg-zinc-100 text-zinc-700'}`}>
                                                        {transaction.statut}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </article>

                        <article className="min-w-0 rounded-xl border border-zinc-200 bg-white shadow-sm">
                            <div className="border-b border-zinc-100 px-5 py-4">
                                <h3 className="text-sm font-semibold">Centre d’alertes</h3>
                                <p className="mt-1 text-xs text-zinc-500">Exemples fictifs, sans action réelle</p>
                            </div>
                            <ul className="divide-y divide-zinc-100 px-5">
                                {alertes.map((alerte) => (
                                    <li key={alerte.titre} className="flex items-start justify-between gap-3 py-4">
                                        <div>
                                            <p className="text-sm font-medium leading-5">{alerte.titre}</p>
                                            <p className="mt-1 text-xs text-zinc-500">{alerte.agence} · {alerte.heure}</p>
                                        </div>
                                        <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${alertStyles[alerte.niveau] ?? 'bg-zinc-100 text-zinc-700'}`}>
                                            {alerte.niveau}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </section>

                <section id="fonctionnalites" className="scroll-mt-28 border-y border-zinc-200 bg-white">
                    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-5 sm:py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
                        {[
                            ['Vue consolidée', 'Une lecture synthétique de l’activité présentée par indicateurs et tendances.'],
                            ['Surveillance des opérations', 'Des statuts et signaux visuels pour illustrer le suivi des transactions.'],
                            ['Aide à la décision', 'Un prototype de supervision à évaluer avec vos équipes et vos règles métier.'],
                            ['Assistant IA de supervision', 'Dans l’espace équipe, échangez sur les opérations du jour, obtenez une synthèse quotidienne et explorez les anomalies détectées avec l’assistant IA.'],
                        ].map(([title, description]) => (
                            <article key={title}>
                                <h3 className="font-semibold">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="contact" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-12 text-center sm:px-5 sm:py-14 lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B1A1A]">Parlons de votre besoin</p>
                    <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
                        Vous souhaitez découvrir le projet ou échanger autour d’un partenariat ?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-600">
                        Contactez le porteur du projet pour discuter d’une présentation et des prochaines évolutions.
                    </p>
                    <a
                        href="https://links-dimitri.vercel.app"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#8B1A1A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#741515] sm:w-auto"
                    >
                        Voir mes liens et me contacter
                    </a>
                </section>
            </main>

            <footer className="border-t border-zinc-200 bg-white px-5 py-5 text-center text-xs text-zinc-500">
                BankFlow · Prototype de démonstration · Toutes les données présentées sont fictives.
            </footer>
        </div>
    );
}
