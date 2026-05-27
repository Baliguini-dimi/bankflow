<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GrokService
{
    private string $apiKey;
    private string $baseUrl = 'https://api.groq.com/openai/v1';
    private string $model = 'llama-3.3-70b-versatile';

    public function __construct()
    {
        $this->apiKey = env('GROK_API_KEY', '');
        if (empty($this->apiKey)) {
            abort(500, 'Clé API non configurée.');
        }
    }
    public function chat(string $message, string $contexte = ''): string
    {
        $systemPrompt = "Tu es un assistant IA de supervision bancaire pour BankFlow,
        une plateforme de supervision des operations bancaires en Cote d'Ivoire.
        Tu analyses les transactions, detectes les anomalies et fournis des insights
        professionnels en francais. Les montants sont en FCFA.
        " . ($contexte ? "Contexte actuel : " . $contexte : "");

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post($this->baseUrl . '/chat/completions', [
            'model' => $this->model,
            'messages' => [
                ['role' => 'system', 'content' => $systemPrompt],
                ['role' => 'user', 'content' => $message],
            ],
            'max_tokens' => 500,
            'temperature' => 0.7,
        ]);

        if ($response->successful()) {
            return $response->json('choices.0.message.content', 'Reponse indisponible.');
        }

        return 'Erreur : ' . $response->json('error.message', 'Service indisponible.');
    }

    public function analyserAnomalies(array $anomalies): string
    {
        $description = collect($anomalies)->map(function ($a) {
            return "- {$a['reference']} : {$a['agence']}, {$a['montant']} FCFA, {$a['type']}";
        })->join("\n");

        return $this->chat(
            "Analyse ces anomalies bancaires detectees aujourd'hui et fournis un resume professionnel avec recommandations :\n" . $description
        );
    }

    public function resumeJournalier(array $stats): string
    {
        return $this->chat(
            "Genere un resume journalier professionnel base sur ces statistiques :
            Transactions : {$stats['transactions_jour']},
            Volume : {$stats['volume_jour']} FCFA,
            Alertes ouvertes : {$stats['alertes_ouvertes']},
            Anomalies : {$stats['anomalies']}.
            Sois concis et professionnel."
        );
    }
}