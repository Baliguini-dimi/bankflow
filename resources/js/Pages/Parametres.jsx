import { useState } from 'react';
import { usePage } from '@inertiajs/react';
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

    const [profilMsg, setProfilMsg] = useState('');
    const [mdpMsg, setMdpMsg] = useState('');
    const [profilLoading, setProfilLoading] = useState(false);
    const [mdpLoading, setMdpLoading] = useState(false);

    const getCsrfToken = () => {
        const meta = document.head.querySelector('meta[name="csrf-token"]');
        return meta ? meta.content : '';
    };

    const sauvegarderProfil = async (e) => {
        e.preventDefault();
        setProfilLoading(true);
        setProfilMsg('');
        try {
            const response = await fetch('/parametres/profil', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: JSON.stringify(profil),
            });
            const data = await response.json();
            setProfilMsg(data.message);
        } catch (error) {
            setProfilMsg('Une erreur est survenue.');
        } finally {
            setProfilLoading(false);
        }
    };

    const sauvegarderPassword = async (e) => {
        e.preventDefault();
        setMdpLoading(true);
        setMdpMsg('');
        try {
            const response = await fetch('/parametres/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: JSON.stringify(motDePasse),
            });
            const data = await response.json();
            setMdpMsg(data.message);
            if (data.success) {
                setMotDePasse({ current_password: '', password: '', password_confirmation: '' });
            }
        } catch (error) {
            setMdpMsg('Une erreur est survenue.');
        } finally {
            setMdpLoading(false);
        }
    };

    return (
        <AppLayout title="Parametres">
            <div className="max-w-2xl space-y-6">

                {/* Profil */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">Informations du profil</h2>
                        <p className="text-xs text-zinc-400 mt-0.5">Mettez a jour votre nom et votre adresse e-mail.</p>
                    </div>
                    <form onSubmit={sauvegarderProfil} className="px-5 py-4 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">Nom complet</label>
                            <input
                                type="text"
                                value={profil.name}
                                onChange={(e) => setProfil({ ...profil, name: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">Adresse e-mail</label>
                            <input
                                type="email"
                                value={profil.email}
                                onChange={(e) => setProfil({ ...profil, email: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                type="submit"
                                disabled={profilLoading}
                                className="bg-[#1C1C1C] hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                            >
                                {profilLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                            </button>
                            {profilMsg && <span className="text-xs text-green-600">{profilMsg}</span>}
                        </div>
                    </form>
                </div>

                {/* Mot de passe */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">Changer le mot de passe</h2>
                        <p className="text-xs text-zinc-400 mt-0.5">Minimum 8 caracteres.</p>
                    </div>
                    <form onSubmit={sauvegarderPassword} className="px-5 py-4 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">Mot de passe actuel</label>
                            <input
                                type="password"
                                value={motDePasse.current_password}
                                onChange={(e) => setMotDePasse({ ...motDePasse, current_password: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">Nouveau mot de passe</label>
                            <input
                                type="password"
                                value={motDePasse.password}
                                onChange={(e) => setMotDePasse({ ...motDePasse, password: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">Confirmer le mot de passe</label>
                            <input
                                type="password"
                                value={motDePasse.password_confirmation}
                                onChange={(e) => setMotDePasse({ ...motDePasse, password_confirmation: e.target.value })}
                                className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            />
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                type="submit"
                                disabled={mdpLoading}
                                className="bg-[#8B1A1A] hover:bg-[#7a1616] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                            >
                                {mdpLoading ? 'Mise a jour...' : 'Mettre a jour'}
                            </button>
                            {mdpMsg && <span className="text-xs text-green-600">{mdpMsg}</span>}
                        </div>
                    </form>
                </div>

                {/* Securite */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">Securite</h2>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                        {[
                            { label: 'Derniere connexion', value: new Date().toLocaleDateString('fr-FR') },
                            { label: 'Sessions actives', value: '1' },
                            { label: 'Authentification 2FA', value: 'Non activee' },
                        ].map((info) => (
                            <div key={info.label} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
                                <span className="text-xs text-zinc-400 uppercase tracking-widest">{info.label}</span>
                                <span className="text-sm text-zinc-700 font-medium">{info.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Systeme */}
                <div className="bg-white border border-zinc-200 rounded-lg">
                    <div className="px-5 py-4 border-b border-zinc-100">
                        <h2 className="text-sm font-semibold text-zinc-800">Informations systeme</h2>
                    </div>
                    <div className="px-5 py-4 space-y-3">
                        {[
                            { label: 'Version', value: 'BankFlow v1.0' },
                            { label: 'Environnement', value: 'Production' },
                            { label: 'Base de donnees', value: 'SQLite' },
                            { label: 'Framework', value: 'Laravel 12' },
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