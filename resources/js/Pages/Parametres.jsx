import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Parametres() {
    const { auth } = usePage().props;

    const [profil, setProfil] = useState({
        name: auth.user.name,
        email: auth.user.email,
    });

    const [motDePasse, setMotDePasse] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [profilSauvegarde, setProfilSauvegarde] = useState(false);
    const [mdpSauvegarde, setMdpSauvegarde] = useState(false);

    const sauvegarderProfil = () => {
        setProfilSauvegarde(true);
        setTimeout(() => setProfilSauvegarde(false), 3000);
    };

    const sauvegarderMdp = () => {
        setMdpSauvegarde(true);
        setTimeout(() => setMdpSauvegarde(false), 3000);
    };

    return (
        <AppLayout title="Paramètres">
            <div className="max-w-2xl space-y-6">

                {/* Informations du profil */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">
                            Informations du profil
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Mettez à jour votre nom et votre adresse e-mail.
                        </p>
                    </div>
                    <div className="px-5 py-4 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                value={profil.name}
                                onChange={(e) => setProfil({ ...profil, name: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Adresse e-mail
                            </label>
                            <input
                                type="email"
                                value={profil.email}
                                onChange={(e) => setProfil({ ...profil, email: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                onClick={sauvegarderProfil}
                                className="bg-[#1C1C1C] hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                            >
                                Sauvegarder
                            </button>
                            {profilSauvegarde && (
                                <span className="text-xs text-green-600">
                                    Profil mis à jour.
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Changer le mot de passe */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">
                            Changer le mot de passe
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Utilisez un mot de passe long et unique.
                        </p>
                    </div>
                    <div className="px-5 py-4 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Mot de passe actuel
                            </label>
                            <input
                                type="password"
                                value={motDePasse.current_password}
                                onChange={(e) => setMotDePasse({ ...motDePasse, current_password: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                value={motDePasse.password}
                                onChange={(e) => setMotDePasse({ ...motDePasse, password: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                value={motDePasse.password_confirmation}
                                onChange={(e) => setMotDePasse({ ...motDePasse, password_confirmation: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                onClick={sauvegarderMdp}
                                className="bg-[#8B1A1A] hover:bg-[#7a1616] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                            >
                                Mettre à jour
                            </button>
                            {mdpSauvegarde && (
                                <span className="text-xs text-green-600">
                                    Mot de passe mis à jour.
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Informations système */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">
                            Informations système
                        </h2>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                        {[
                            { label: 'Version', value: 'BankFlow v1.0' },
                            { label: 'Environnement', value: 'Production' },
                            { label: 'Base de données', value: 'MySQL' },
                            { label: 'Dernière mise à jour', value: '25/05/2026' },
                        ].map((info) => (
                            <div key={info.label} className="flex items-center justify-between py-1 border-b border-zinc-50 last:border-0">
                                <span className="text-xs text-zinc-400 uppercase tracking-widest">{info.label}</span>
                                <span className="text-sm text-zinc-700 font-medium">{info.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}