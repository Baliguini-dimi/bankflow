
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';

const conversations = [
    {
        id: 1,
        nom: 'Direction Générale',
        role: 'Siège Abidjan',
        dernierMessage: 'Le rapport de conformité doit être soumis avant vendredi.',
        heure: '09:14',
        nonLu: 2,
        messages: [
            { id: 1, auteur: 'Direction Générale', contenu: 'Bonjour, avez-vous pris connaissance de la nouvelle circulaire BCEAO ?', heure: '08:30', moi: false },
            { id: 2, auteur: 'Moi', contenu: 'Oui, nous avons commencé la mise en conformité.', heure: '08:45', moi: true },
            { id: 3, auteur: 'Direction Générale', contenu: 'Le rapport de conformité doit être soumis avant vendredi.', heure: '09:14', moi: false },
        ],
    },
    {
        id: 2,
        nom: 'Superviseur Plateau',
        role: 'Agence Plateau',
        dernierMessage: 'La caisse est équilibrée, clôture effectuée.',
        heure: '08:47',
        nonLu: 0,
        messages: [
            { id: 1, auteur: 'Superviseur Plateau', contenu: 'Bonjour, ouverture de caisse effectuée. Solde : 2 500 000 FCFA.', heure: '07:30', moi: false },
            { id: 2, auteur: 'Moi', contenu: 'Bien reçu. Surveillez les virements au-dessus de 10M FCFA.', heure: '07:45', moi: true },
            { id: 3, auteur: 'Superviseur Plateau', contenu: 'La caisse est équilibrée, clôture effectuée.', heure: '08:47', moi: false },
        ],
    },
    {
        id: 3,
        nom: 'Superviseur Yopougon',
        role: 'Agence Yopougon',
        dernierMessage: 'Transaction suspecte signalée sur le compte 045-XXX.',
        heure: '08:20',
        nonLu: 1,
        messages: [
            { id: 1, auteur: 'Superviseur Yopougon', contenu: 'Transaction suspecte signalée sur le compte 045-XXX.', heure: '08:20', moi: false },
        ],
    },
    {
        id: 4,
        nom: 'Équipe Compliance',
        role: 'Siège Abidjan',
        dernierMessage: 'Audit interne prévu le 02/06/2026.',
        heure: 'Hier',
        nonLu: 0,
        messages: [
            { id: 1, auteur: 'Équipe Compliance', contenu: 'Audit interne prévu le 02/06/2026.', heure: 'Hier', moi: false },
        ],
    },
];

export default function Messagerie() {
    const [conversationActive, setConversationActive] = useState(conversations[0]);
    const [message, setMessage] = useState('');
    const [msgs, setMsgs] = useState(
        conversations.reduce((acc, c) => ({ ...acc, [c.id]: c.messages }), {})
    );

    const envoyer = () => {
        if (!message.trim()) return;
        const nouveau = {
            id: Date.now(),
            auteur: 'Moi',
            contenu: message.trim(),
            heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            moi: true,
        };
        setMsgs(prev => ({
            ...prev,
            [conversationActive.id]: [...prev[conversationActive.id], nouveau],
        }));
        setMessage('');
    };

    const messagesActifs = msgs[conversationActive.id] || [];

    return (
        <AppLayout title="Messagerie">
            <div
                className="bg-white border border-zinc-200 rounded-lg overflow-hidden"
                style={{ height: 'calc(100vh - 160px)', display: 'flex' }}
            >
                {/* Liste des conversations */}
                <div style={{ width: '280px', flexShrink: 0, borderRight: '1px solid #f4f4f5', display: 'flex', flexDirection: 'column' }}>
                    <div className="px-4 py-3 border-b border-zinc-100">
                        <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
                            Conversations
                        </p>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setConversationActive(conv)}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    padding: '12px 16px',
                                    borderBottom: '1px solid #fafafa',
                                    borderLeft: conversationActive.id === conv.id ? '2px solid #8B1A1A' : '2px solid transparent',
                                    backgroundColor: conversationActive.id === conv.id ? '#fafafa' : 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <p className="text-sm font-medium text-zinc-800">{conv.nom}</p>
                                    <span className="text-xs text-zinc-400">{conv.heure}</span>
                                </div>
                                <p className="text-xs text-zinc-400">{conv.role}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                                    <p className="text-xs text-zinc-500" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                                        {conv.dernierMessage}
                                    </p>
                                    {conv.nonLu > 0 && (
                                        <span style={{ backgroundColor: '#8B1A1A', color: 'white', borderRadius: '9999px', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>
                                            {conv.nonLu}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Zone de messages */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                    {/* En-tête */}
                    <div className="px-5 py-3 border-b border-zinc-100">
                        <p className="text-sm font-semibold text-zinc-800">{conversationActive.nom}</p>
                        <p className="text-xs text-zinc-400">{conversationActive.role}</p>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {messagesActifs.map((msg) => (
                            <div
                                key={msg.id}
                                style={{ display: 'flex', justifyContent: msg.moi ? 'flex-end' : 'flex-start' }}
                            >
                                <div style={{ maxWidth: '60%', display: 'flex', flexDirection: 'column', alignItems: msg.moi ? 'flex-end' : 'flex-start', gap: 4 }}>
                                    {!msg.moi && (
                                        <p className="text-xs text-zinc-400">{msg.auteur}</p>
                                    )}
                                    <div style={{
                                        padding: '10px 14px',
                                        borderRadius: 8,
                                        fontSize: 14,
                                        backgroundColor: msg.moi ? '#1C1C1C' : '#f4f4f5',
                                        color: msg.moi ? 'white' : '#3f3f46',
                                    }}>
                                        {msg.contenu}
                                    </div>
                                    <p className="text-xs text-zinc-400">{msg.heure}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Saisie */}
                    <div style={{ padding: '12px 20px', borderTop: '1px solid #f4f4f5', display: 'flex', gap: 12 }}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && envoyer()}
                            placeholder="Écrire un message..."
                            className="flex-1 border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                        />
                        <button
                            onClick={envoyer}
                            className="bg-[#8B1A1A] hover:bg-[#7a1616] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                        >
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}