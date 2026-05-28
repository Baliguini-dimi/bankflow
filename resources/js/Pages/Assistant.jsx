const envoyer = async () => {
    if (!input.trim() || loading) return;

    const question = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', contenu: question }]);
    setLoading(true);

    try {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];

        const response = await fetch('/assistant/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': token ? decodeURIComponent(token) : '',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ message: question }),
        });

        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', contenu: data.reponse }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'assistant', contenu: 'Une erreur est survenue. Veuillez reessayer.' }]);
    } finally {
        setLoading(false);
    }
};