import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';

export default function AppLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-[#FAFAF9] flex">
            {/* Sidebar fixe à gauche */}
            <Sidebar />

            {/* Contenu principal */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Barre du haut */}
                <Topbar title={title} />

                {/* Contenu de la page */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}