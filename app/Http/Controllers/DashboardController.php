<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Alerte;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'transactions_jour' => Transaction::whereDate('effectuee_le', today())->count(),
            'volume_jour' => Transaction::whereDate('effectuee_le', today())->sum('montant'),
            'alertes_ouvertes' => Alerte::where('acquittee', false)->count(),
            'anomalies' => Transaction::where('statut', 'Anomalie')->whereDate('effectuee_le', today())->count(),
        ];

        $dernieres_transactions = Transaction::latest('effectuee_le')
            ->take(5)
            ->get();

        // Données du graphique — 7 derniers jours
        $graphique = collect(range(6, 0))->map(function ($i) {
            $date = Carbon::today()->subDays($i);
            return [
                'date' => $date->format('d/m'),
                'transactions' => Transaction::whereDate('effectuee_le', $date)->count(),
                'volume' => (float) Transaction::whereDate('effectuee_le', $date)->sum('montant'),
                'anomalies' => Transaction::whereDate('effectuee_le', $date)->where('statut', 'Anomalie')->count(),
            ];
        })->values();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'dernieres_transactions' => $dernieres_transactions,
            'graphique' => $graphique,
        ]);
    }
}