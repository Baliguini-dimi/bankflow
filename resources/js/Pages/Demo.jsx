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
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                    <a href="/" className="text-xl font-semibold tracking-tight" aria-label="BankFlow, accueil">
                        Bank<span className="text-[#8B1A1A]">Flow</span>
                    </a>
                    <nav className="hidden items-center gap-7 text-sm text-zinc-600 md:flex" aria-label="Navigation principale">
                        <a href="#demo" className="transition hover:text-[#8B1A1A]">Aperçu</a>
                        <a href="#fonctionnalites" className="transition hover:text-[#8B1A1A]">Fonctionnalités</a>
                        <a href="#contact" className="transition hover:text-[#8B1A1A]">Contact</a>
                    </nav>
                    <a
                        href="/login"
                        className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:border-[#8B1A1A] hover:text-[#8B1A1A]"
                    >
                        Accès équipe
                    </a>
                </div>
            </header>

            <main>
                <section className="bg-[#1c1c1c] text-white">
                    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-24 lg:px-8">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Démonstration interactive · données fictives
                            </span>
                            <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                                Une vision claire de vos opérations bancaires.
                            </h1>
                            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
                                Centralisez l’activité de vos agences, repérez les opérations à examiner et donnez à vos équipes une vue de supervision plus lisible.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="#demo"
                                    className="rounded-md bg-[#8B1A1A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a32222]"
                                >
                                    Explorer le tableau de bord
                                </a>
                                <a
                                    href="#contact"
                                    className="rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    Échanger sur le projet
                                </a>
                            </div>
                            <p className="mt-5 text-xs text-zinc-400">
                                Prototype de présentation — ne traite aucune opération réelle et ne constitue pas un outil de conformité réglementaire.
                            </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/[0.06] p-6">
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

                <section id="demo" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 lg:px-8">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B1A1A]">Aperçu produit</p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Tableau de supervision</h2>
                            <p className="mt-1 text-sm text-zinc-500">Indicateurs simulés · période de démonstration</p>
                        </div>
                        <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
                            Jeu de données fictif
                        </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {kpis.map((item) => (
                            <article key={item.key} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{item.label}</p>
                                <p className="mt-3 text-2xl font-semibold tracking-tight">
                                    {formatMontant(stats[item.key])}{item.suffix}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                        <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold">Volume supervisé</h3>
                                <p className="mt-1 text-xs text-zinc-500">Évolution sur les 7 derniers jours · FCFA</p>
                            </div>
                            <div className="h-64" role="img" aria-label="Graphique du volume fictif supervisé sur sept jours">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={graphique} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="demoVolume" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8B1A1A" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#8B1A1A" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid stroke="#f1f1f1" strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
                                        <YAxis tickFormatter={formatCompact} tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} width={48} />
                                        <Tooltip content={<ChartTooltip />} />
                                        <Area type="monotone" dataKey="volume" name="Volume" stroke="#8B1A1A" strokeWidth={2} fill="url(#demoVolume)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </article>

                        <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold">Anomalies signalées</h3>
                                <p className="mt-1 text-xs text-zinc-500">Exemple d’activité fictive sur 7 jours</p>
                            </div>
                            <div className="h-64" role="img" aria-label="Graphique des anomalies fictives signalées sur sept jours">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={graphique} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                                        <CartesianGrid stroke="#f1f1f1" strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} />
                                        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} width={32} />
                                        <Tooltip content={<ChartTooltip />} />
                                        <Bar dataKey="anomalies" name="Anomalies" fill="#8B1A1A" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </article>
                    </div>

                    <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
                        <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                            <div className="border-b border-zinc-100 px-5 py-4">
                                <h3 className="text-sm font-semibold">Exemples d’opérations</h3>
                                <p className="mt-1 text-xs text-zinc-500">Références et montants entièrement fictifs</p>
                            </div>
                            <div className="overflow-x-auto">
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

                        <article className="rounded-xl border border-zinc-200 bg-white shadow-sm">
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

                <section id="fonctionnalites" className="border-y border-zinc-200 bg-white">
                    <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-3 lg:px-8">
                        {[
                            ['Vue consolidée', 'Une lecture synthétique de l’activité présentée par indicateurs et tendances.'],
                            ['Surveillance des opérations', 'Des statuts et signaux visuels pour illustrer le suivi des transactions.'],
                            ['Aide à la décision', 'Un prototype de supervision à évaluer avec vos équipes et vos règles métier.'],
                        ].map(([title, description]) => (
                            <article key={title}>
                                <h3 className="font-semibold">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 text-center lg:px-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B1A1A]">Parlons de votre besoin</p>
                    <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl">
                        Vous souhaitez découvrir le projet ou échanger autour d’un partenariat ?
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-zinc-600">
                        Contactez le porteur du projet pour discuter d’une présentation et des prochaines évolutions.
                    </p>
                    <a
                        href="https://www.linkedin.com/in/dimitri-nelson-baligini-demba-4b17b32ba"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex rounded-md bg-[#8B1A1A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#741515]"
                    >
                        Contacter sur LinkedIn
                    </a>
                </section>
            </main>

            <footer className="border-t border-zinc-200 bg-white px-5 py-5 text-center text-xs text-zinc-500">
                BankFlow · Prototype de démonstration · Toutes les données présentées sont fictives.
            </footer>
        </div>
    );
}
