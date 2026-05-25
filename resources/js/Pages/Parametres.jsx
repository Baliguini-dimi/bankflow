import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Parametres() {
    const { auth, flash } = usePage().props;

    const profilForm = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const sauvegarderProfil = (e) => {
        e.preventDefault();
        profilForm.put('/parametres/profil');
    };

    const sauvegarderPassword = (e) => {
        e.preventDefault();
        passwordForm.put('/parametres/password', {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <AppLayout title="Paramètres">
            <div className="max-w-2xl space-y-6">

                {/* Profil */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">
                            Informations du profil
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Mettez à jour votre nom et votre adresse e-mail.
                        </p>
                    </div>
                    <form onSubmit={sauvegarderProfil} className="px-5 py-4 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                value={profilForm.data.name}
                                onChange={(e) => profilForm.setData('name', e.target.value)}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                            {profilForm.errors.name && (
                                <p className="text-red-500 text-xs mt-1">{profilForm.errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Adresse e-mail
                            </label>
                            <input
                                type="email"
                                value={profilForm.data.email}
                                onChange={(e) => profilForm.setData('email', e.target.value)}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                            {profilForm.errors.email && (
                                <p className="text-red-500 text-xs mt-1">{profilForm.errors.email}</p>
                            )}
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                type="submit"
                                disabled={profilForm.processing}
                                className="bg-[#1C1C1C] hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                            >
                                {profilForm.processing ? 'Sauvegarde...' : 'Sauvegarder'}
                            </button>
                            {flash?.success_profil && (
                                <span className="text-xs text-green-600">{flash.success_profil}</span>
                            )}
                        </div>
                    </form>
                </div>

                {/* Mot de passe */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">
                            Changer le mot de passe
                        </h2>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Minimum 8 caractères.
                        </p>
                    </div>
                    <form onSubmit={sauvegarderPassword} className="px-5 py-4 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Mot de passe actuel
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                            {passwordForm.errors.current_password && (
                                <p className="text-red-500 text-xs mt-1">{passwordForm.errors.current_password}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.password}
                                onChange={(e) => passwordForm.setData('password', e.target.value)}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                            {passwordForm.errors.password && (
                                <p className="text-red-500 text-xs mt-1">{passwordForm.errors.password}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                value={passwordForm.data.password_confirmation}
                                onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="bg-[#8B1A1A] hover:bg-[#7a1616] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                            >
                                {passwordForm.processing ? 'Mise à jour...' : 'Mettre à jour'}
                            </button>
                            {flash?.success_password && (
                                <span className="text-xs text-green-600">{flash.success_password}</span>
                            )}
                        </div>
                    </form>
                </div>

                {/* Sécurité */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">Sécurité</h2>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                        {[
                            { label: 'Dernière connexion', value: new Date().toLocaleDateString('fr-FR') },
                            { label: 'Adresse IP', value: '127.0.0.1' },
                            { label: 'Sessions actives', value: '1' },
                            { label: 'Authentification 2FA', value: 'Non activée' },
                        ].map((info) => (
                            <div key={info.label} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
                                <span className="text-xs text-zinc-400 uppercase tracking-widest">{info.label}</span>
                                <span className="text-sm text-zinc-700 font-medium">{info.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Informations système */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">Informations système</h2>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                        {[
                            { label: 'Version', value: 'BankFlow v1.0' },
                            { label: 'Environnement', value: 'Local' },
                            { label: 'Base de données', value: 'MySQL 8.0' },
                            { label: 'Framework', value: 'Laravel 12' },
                            { label: 'Dernière mise à jour', value: '25/05/2026' },
                        ].map((info) => (
                            <div key={info.label} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
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