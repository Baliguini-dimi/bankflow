import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

const alertesInitiales = [
    { id: 1, titre: 'Transaction suspecte détectée', agence: 'Yopougon', description: 'Virement de 15 000 000 FCFA hors plafond autorisé.', niveau: 'Critique', heure: '08:47', acquittee: false },
    { id: 2, titre: 'Solde caisse insuffisant', agence: 'Adjamé', description: 'Le solde de caisse est en dessous du seuil minimum de 500 000 FCFA.', niveau: 'Critique', heure: '07:45', acquittee: false },
    { id: 3, titre: 'Tentative de connexion échouée', agence: 'Cocody', description: '5 tentatives de connexion échouées sur le compte superviseur.', niveau: 'Avertissement', heure: '09:02', acquittee: false },
    { id: 4, titre: 'Rapport journalier non soumis', agence: 'Marcory', description: "Le rapport de clôture d'hier n'a pas été soumis avant 20h00.", niveau: 'Avertissement', heure: '06:00', acquittee: false },
    { id: 5, titre: 'Mise à jour système disponible', agence: 'Siège', description: 'Une mise à jour de sécurité est disponible pour le module de paiement.', niveau: 'Info', heure: '05:30', acquittee: false },
    { id: 6, titre: 'Nouvelle agence connectée', agence: 'Abobo', description: "L'agence Abobo s'est connectée pour la première fois ce mois-ci.", niveau: 'Info', heure: '08:15', acquittee: true },
];

const NIVEAU_STYLES = {
    'Critique': 'bg-red-50 text-[#8B1A1A] border-red-100',
    'Avertissement': 'bg-amber-50 text-amber-700 border-amber-100',
    'Info': 'bg-blue-50 text-blue-700 border-blue-100',
};

const NIVEAU_BADGE = {
    'Critique': 'bg-red-100 text-[#8B1A1A]',
    'Avertissement': 'bg-amber-100 text-amber-700',
    'Info': 'bg-blue-100 text-blue-700',
};

const NIVEAU_DOT = {
    'Critique': 'bg-[#8B1A1A]',
    'Avertissement': 'bg-amber-500',
    'Info': 'bg-blue-500',
};

export default function Alertes() {
    const [alertes, setAlertes] = useState(alertesInitiales);
    const [filtre, setFiltre] = useState('Toutes');

    const acquitter = (id) => {
        setAlertes(prev =>
            prev.map(a => a.id === id ? { ...a, acquittee: true } : a)
        );
    };

    const filtered = alertes.filter((a) => {
        if (filtre === 'Toutes') return true;
        if (filtre === 'Non acquittées') return !a.acquittee;
        return a.niveau === filtre;
    });

    const nonAcquittees = alertes.filter(a => !a.acquittee).length;

    return (
        <AppLayout title="Alertes">
            {/* Compteurs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Total alertes', value: alertes.length },
                    { label: 'Non acquittées', value: nonAcquittees },
                    { label: 'Critiques', value: alertes.filter(a => a.niveau === 'Critique').length },
                    { label: 'Avertissements', value: alertes.filter(a => a.niveau === 'Avertissement').length },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white border border-zinc-200 rounded-lg p-4">
                        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-semibold text-zinc-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filtres */}
            <div className="flex gap-2 flex-wrap mb-5">
                {['Toutes', 'Non acquittées', 'Critique', 'Avertissement', 'Info'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFiltre(f)}
                        className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                            filtre === f
                                ? 'bg-[#1C1C1C] text-white'
                                : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Liste des alertes */}
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="bg-white border border-zinc-200 rounded-lg px-5 py-8 text-center text-sm text-zinc-400">
                        Aucune alerte dans cette catégorie.
                    </div>
                ) : (
                    filtered.map((alerte) => (
                        <div
                            key={alerte.id}
                            className={`border rounded-lg px-5 py-4 transition-opacity ${
                                NIVEAU_STYLES[alerte.niveau]
                            } ${alerte.acquittee ? 'opacity-50' : ''}`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    {/* Point de couleur */}
                                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${NIVEAU_DOT[alerte.niveau]}`} />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-sm font-semibold">{alerte.titre}</p>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${NIVEAU_BADGE[alerte.niveau]}`}>
                                                {alerte.niveau}
                                            </span>
                                        </div>
                                        <p className="text-xs opacity-80 mb-1">{alerte.description}</p>
                                        <p className="text-xs opacity-60">
                                            {alerte.agence} — {alerte.heure}
                                        </p>
                                    </div>
                                </div>

                                {/* Bouton acquitter */}
                                {!alerte.acquittee ? (
                                    <button
                                        onClick={() => acquitter(alerte.id)}
                                        className="shrink-0 text-xs font-medium px-3 py-1.5 rounded border border-current opacity-70 hover:opacity-100 transition-opacity"
                                    >
                                        Acquitter
                                    </button>
                                ) : (
                                    <span className="shrink-0 text-xs opacity-50">Acquittée</span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AppLayout>
    );
}