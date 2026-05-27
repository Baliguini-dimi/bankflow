<!DOCTYPE html>
<html lang="fr" translate="no">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google" content="notranslate" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title>BankFlow</title>
        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
    </head>
    <body>
        @inertia
    </body>
</html>