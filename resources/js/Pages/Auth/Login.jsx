import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-white tracking-tight">
                        Bank<span className="text-[#8B1A1A]">Flow</span>
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        Plateforme de supervision bancaire
                    </p>
                </div>

                {/* Formulaire */}
                <div className="bg-[#2a2a2a] border border-white/10 rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">
                                Adresse e-mail
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full bg-[#1C1C1C] border border-white/10 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#8B1A1A] transition-colors"
                                placeholder="admin@bankflow.ci"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Mot de passe */}
                        <div>
                            <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full bg-[#1C1C1C] border border-white/10 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#8B1A1A] transition-colors"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && (
                                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Se souvenir */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                                className="accent-[#8B1A1A]"
                            />
                            <label htmlFor="remember" className="text-zinc-400 text-xs">
                                Se souvenir de moi
                            </label>
                        </div>

                        {/* Bouton */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#8B1A1A] hover:bg-[#7a1616] text-white text-sm font-medium py-2 rounded-md transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Connexion...' : 'Se connecter'}
                        </button>

                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-zinc-600 text-xs mt-6">
                    BankFlow v1.0 — Acces restreint
                </p>

            </div>
        </div>
    );
}