import { router, usePage } from '@inertiajs/react';

export default function Topbar({ title }) {
    const { auth } = usePage().props;

    const initiales = auth.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const deconnecter = () => {
        router.post('/logout');
    };

    return (
        <header className="h-16 bg-[#FAFAF9] border-b border-zinc-200 flex items-center justify-between px-6">
            {/* Titre de la page */}
            <h1 className="text-sm font-semibold text-zinc-800 uppercase tracking-widest">
                {title}
            </h1>

            {/* Profil utilisateur */}
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-medium text-zinc-800">{auth.user.name}</p>
                    <p className="text-xs text-zinc-400">{auth.user.email}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#8B1A1A] flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">{initiales}</span>
                </div>
                <button
                    onClick={deconnecter}
                    className="text-xs text-zinc-400 hover:text-zinc-700 border border-zinc-200 px-3 py-1.5 rounded-md hover:bg-zinc-50 transition-colors"
                >
                    Déconnexion
                </button>
            </div>
        </header>
    );
}