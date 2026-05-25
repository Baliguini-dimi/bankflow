import AppLayout from '@/Layouts/AppLayout';

const ACTION_STYLES = {
    'consultation': 'bg-blue-50 text-blue-700',
    'acquittement': 'bg-green-50 text-green-700',
    'connexion': 'bg-zinc-100 text-zinc-600',
    'deconnexion': 'bg-zinc-100 text-zinc-600',
    'creation': 'bg-purple-50 text-purple-700',
    'modification': 'bg-amber-50 text-amber-700',
    'suppression': 'bg-red-50 text-[#8B1A1A]',
};

export default function Audit({ logs }) {
    return (
        <AppLayout title="Piste d'audit">
            {/* En-tête */}
            <div className="bg-white border border-zinc-200 rounded-lg mb-6 px-5 py-4">
                <h2 className="text-sm font-semibold text-zinc-800">
                    Journal des actions
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                    Toutes les actions effectuées sur la plateforme sont enregistrées ici.
                </p>
            </div>

            {/* Tableau */}
            <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                {/* En-tête colonnes */}
                <div className="hidden md:grid grid-cols-5 px-5 py-3 border-b border-zinc-100 text-xs font-medium text-zinc-400 uppercase tracking-widest">
                    <span>Date / Heure</span>
                    <span>Utilisateur</span>
                    <span>Module</span>
                    <span>Action</span>
                    <span>Description</span>
                </div>

                {/* Lignes */}
                <div className="divide-y divide-zinc-100">
                    {logs.data.length === 0 ? (
                        <div className="px-5 py-8 text-center text-sm text-zinc-400">
                            Aucune action enregistrée.
                        </div>
                    ) : (
                        logs.data.map((log) => (
                            <div key={log.id}>
                                {/* Vue desktop */}
                                <div className="hidden md:grid grid-cols-5 px-5 py-3 text-sm items-center hover:bg-zinc-50 transition-colors">
                                    <span className="text-zinc-400 font-mono text-xs">
                                        {new Date(log.created_at).toLocaleDateString('fr-FR')} {new Date(log.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span className="text-zinc-700">
                                        {log.user ? log.user.name : 'Système'}
                                    </span>
                                    <span className="text-zinc-500">{log.module}</span>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${ACTION_STYLES[log.action] || 'bg-zinc-100 text-zinc-600'}`}>
                                        {log.action}
                                    </span>
                                    <span className="text-zinc-500 text-xs truncate">
                                        {log.description}
                                    </span>
                                </div>

                                {/* Vue mobile */}
                                <div className="md:hidden px-4 py-3 hover:bg-zinc-50 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-mono text-zinc-400">
                                            {new Date(log.created_at).toLocaleDateString('fr-FR')} {new Date(log.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ACTION_STYLES[log.action] || 'bg-zinc-100 text-zinc-600'}`}>
                                            {log.action}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-zinc-800">
                                        {log.user ? log.user.name : 'Système'}
                                    </p>
                                    <p className="text-xs text-zinc-400 mt-0.5">{log.description}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="px-5 py-3 border-t border-zinc-100 flex items-center justify-between text-sm text-zinc-400">
                    <span>{logs.total} action(s) enregistrée(s)</span>
                    <div className="flex gap-2">
                        {logs.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded border text-xs transition-colors ${
                                    link.active
                                        ? 'bg-[#1C1C1C] text-white border-[#1C1C1C]'
                                        : 'border-zinc-200 text-zinc-600 disabled:opacity-40 hover:bg-zinc-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}