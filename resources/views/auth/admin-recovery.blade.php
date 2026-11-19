<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Récupération administrateur — BankFlow</title>
    <style>
        body { background: #f3f4f6; color: #111827; font: 16px system-ui, sans-serif; margin: 0; padding: 2rem 1rem; }
        main { background: white; border-radius: .75rem; margin: 4rem auto; max-width: 28rem; padding: 2rem; }
        h1 { font-size: 1.4rem; margin-top: 0; }
        p { line-height: 1.5; }
        label { display: block; font-weight: 600; margin-top: 1rem; }
        input { border: 1px solid #9ca3af; border-radius: .35rem; box-sizing: border-box; font: inherit; margin-top: .35rem; padding: .65rem; width: 100%; }
        button { background: #7f1d1d; border: 0; border-radius: .35rem; color: white; cursor: pointer; font: inherit; margin-top: 1.5rem; padding: .75rem; width: 100%; }
        .error { color: #b91c1c; }
    </style>
</head>
<body>
<main>
    <h1>Récupération ponctuelle du compte admin</h1>
    <p>Cette opération ne peut réussir qu'une seule fois. Après connexion, désactivez-la dans les variables du service.</p>
    <form method="post" action="{{ route('admin.recovery.store') }}" autocomplete="off">
        @csrf
        <label for="token">Jeton temporaire</label>
        <input id="token" name="token" type="password" required autocomplete="off">
        @error('token') <p class="error">{{ $message }}</p> @enderror

        <label for="password">Nouveau mot de passe (16 caractères minimum)</label>
        <input id="password" name="password" type="password" required minlength="16" maxlength="128" autocomplete="new-password">
        @error('password') <p class="error">{{ $message }}</p> @enderror

        <label for="password_confirmation">Confirmer le mot de passe</label>
        <input id="password_confirmation" name="password_confirmation" type="password" required minlength="16" maxlength="128" autocomplete="new-password">

        <button type="submit">Réinitialiser le compte admin</button>
    </form>
</main>
</body>
</html>
