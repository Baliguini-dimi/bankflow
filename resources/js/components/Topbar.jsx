export default function Topbar({ title }) {
    return (
        <header className="h-16 bg-[#FAFAF9] border-b border-zinc-200 flex items-center justify-between px-6">
            {/* Titre de la page */}
            <h1 className="text-sm font-semibold text-zinc-800 uppercase tracking-widest">
                {title}
            </h1>

            {/* Profil utilisateur */}
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-sm font-medium text-zinc-800">Administrateur</p>
                    <p className="text-xs text-zinc-400">Siège Abidjan</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#8B1A1A] flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">AD</span>
                </div>
            </div>
        </header>
    );
}