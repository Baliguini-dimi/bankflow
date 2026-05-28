import { useState, useRef, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function Assistant() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            contenu: "Bonjour, je suis votre assistant IA de supervision bancaire. Je peux analyser vos transactions, resumer les anomalies detectees et repondre a vos questions sur les operations du jour. Comment puis-je vous aider ?",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [resumeLoading, setResumeLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getCsrfToken = () => {
        const meta = document.head.querySelector('meta[name="csrf-token"]');
        return meta ? meta.content : '';
    };

    const envoyer = async () => {
        if (!input.trim() || loading) return;

        const question = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', contenu: question }]);
        setLoading(true);

        try {
            const response = await fetch('/assistant/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: JSON.stringify({ message: question }),
            });

            if (!response.ok) {
                throw new Error('Erreur ' + response.status);
            }

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', contenu: data.reponse }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', contenu: 'Une erreur est survenue. Veuillez reessayer.' }]);
        } finally {
            setLoading(false);
        }
    };

    const genererResume = async () => {
        setResumeLoading(true);
        try {
            const response = await fetch('/assistant/resume', {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            });
            const data = await response.json();
            setMessages(prev => [...prev, {
                role: 'assistant',
                contenu: data.resume,
                tag: 'Resume journalier',
            }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', contenu: 'Impossible de generer le resume.' }]);
        } finally {
            setResumeLoading(false);
        }
    };

    const suggestionsRapides = [
        "Quelles anomalies ont ete detectees aujourd'hui ?",
        "Donne-moi un resume des operations du jour",
        "Quels sont les risques a surveiller ?",
        "Analyse le volume de transactions",
    ];

    return (
        <AppLayout title="Assistant IA">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-160px)]">

                {/* Panneau gauche */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white border border-zinc-200 rounded-lg p-4">
                        <h2 className="text-xs font-semibold text-zinc-800 uppercase tracking-widest mb-3">
                            Resume automatique
                        </h2>
                        <button
                            onClick={genererResume}
                            disabled={resumeLoading}
                            className="w-full bg-[#8B1A1A] hover:bg-[#7a1616] text-white text-xs font-medium px-3 py-2 rounded-md transition-colors disabled:opacity-60"
                        >
                            {resumeLoading ? 'Generation...' : 'Generer le resume du jour'}
                        </button>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-lg p-4">
                        <h2 className="text-xs font-semibold text-zinc-800 uppercase tracking-widest mb-3">
                            Questions rapides
                        </h2>
                        <div className="space-y-2">
                            {suggestionsRapides.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(s)}
                                    className="w-full text-left text-xs text-zinc-600 border border-zinc-100 px-3 py-2 rounded hover:bg-zinc-50 transition-colors"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-zinc-200 rounded-lg p-4">
                        <h2 className="text-xs font-semibold text-zinc-800 uppercase tracking-widest mb-3">
                            Modele IA
                        </h2>
                        <div className="space-y-2">
                            {[
                                { label: 'Modele', value: 'Llama 3.3 70B' },
                                { label: 'Fournisseur', value: 'Groq' },
                                { label: 'Langue', value: 'Francais' },
                            ].map((info) => (
                                <div key={info.label} className="flex justify-between">
                                    <span className="text-xs text-zinc-400">{info.label}</span>
                                    <span className="text-xs text-zinc-700 font-medium">{info.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Zone de chat */}
                <div className="lg:col-span-3 bg-white border border-zinc-200 rounded-lg flex flex-col">
                    <div className="px-5 py-3 border-b border-zinc-100">
                        <p className="text-sm font-semibold text-zinc-800">Assistant de supervision</p>
                        <p className="text-xs text-zinc-400">Analyse intelligente des operations bancaires</p>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-lg flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    {msg.tag && (
                                        <span className="text-xs text-zinc-400 px-1">{msg.tag}</span>
                                    )}
                                    <div className={`px-4 py-3 rounded-lg text-sm leading-relaxed ${
                                        msg.role === 'user'
                                            ? 'bg-[#1C1C1C] text-white'
                                            : 'bg-zinc-50 text-zinc-800 border border-zinc-100'
                                    }`}>
                                        {msg.contenu}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-50 border border-zinc-100 px-4 py-3 rounded-lg">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="px-5 py-3 border-t border-zinc-100 flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && envoyer()}
                            placeholder="Posez une question sur les operations bancaires..."
                            className="flex-1 border border-zinc-200 rounded-md px-3 py-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-400"
                            disabled={loading}
                        />
                        <button
                            onClick={envoyer}
                            disabled={loading || !input.trim()}
                            className="bg-[#8B1A1A] hover:bg-[#7a1616] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                        >
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}