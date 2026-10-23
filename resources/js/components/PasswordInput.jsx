import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = forwardRef(function PasswordInput(
    { className = '', buttonClassName = '', ...props },
    ref
) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <input {...props} ref={ref} type={visible ? 'text' : 'password'} className={`w-full pr-11 ${className}`} />
            <button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} aria-pressed={visible} className={`absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 text-zinc-400 hover:text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 ${buttonClassName}`}>
                {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
            </button>
        </div>
    );
});

export default PasswordInput;
