<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Alerte;
use App\Services\GrokService;
use App\Services\AuditService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssistantController extends Controller
{
    public function index()
    {
        return Inertia::render('Assistant');
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:500',
        ]);

        $grok = new GrokService();

        // Contexte des données actuelles
        $contexte = "Transactions aujourd'hui : " . Transaction::whereDate('effectuee_le', today())->count() .
            ", Volume : " . Transaction::whereDate('effectuee_le', today())->sum('montant') . " FCFA" .
            ", Alertes ouvertes : " . Alerte::where('acquittee', false)->count() .
            ", Anomalies : " . Transaction::where('statut', 'Anomalie')->whereDate('effectuee_le', today())->count();

        $reponse = $grok->chat($request->message, $contexte);

        AuditService::log('consultation', 'Assistant IA', 'Question : ' . substr($request->message, 0, 100));

        return response()->json(['reponse' => $reponse]);
    }

    public function resumeJournalier()
    {
        $stats = [
            'transactions_jour' => Transaction::whereDate('effectuee_le', today())->count(),
            'volume_jour' => Transaction::whereDate('effectuee_le', today())->sum('montant'),
            'alertes_ouvertes' => Alerte::where('acquittee', false)->count(),
            'anomalies' => Transaction::where('statut', 'Anomalie')->whereDate('effectuee_le', today())->count(),
        ];

        $grok = new GrokService();
        $resume = $grok->resumeJournalier($stats);

        return response()->json(['resume' => $resume]);
    }
}