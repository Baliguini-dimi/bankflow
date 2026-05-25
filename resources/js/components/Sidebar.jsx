import { Link, usePage } from '@inertiajs/react';

const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Opérations', href: '/operations' },
    { name: 'Alertes', href: '/alertes' },
    { name: 'Rapports', href: '/rapports' },
    { name: 'Messagerie', href: '/messagerie' },
    { name: 'Audit', href: '/audit' },
    { name: 'Paramètres', href: '/parametres' },
];

export default function Sidebar() {
    const { url } = usePage();

    return (
        <aside className="fixed inset-y-0 left-0 w-64 bg-[#1C1C1C] flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-white/10">
                <span className="text-white font-semibold text-lg tracking-tight">
                    Bank<span className="text-[#8B1A1A]">Flow</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = url === item.href || url.startsWith(item.href + '?');
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-[#8B1A1A] text-white'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10">
                <p className="text-zinc-500 text-xs">BankFlow v1.0</p>
            </div>
        </aside>
    );
}