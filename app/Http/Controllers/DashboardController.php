<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Alerte;
use Inertia\Inertia;

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

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'dernieres_transactions' => $dernieres_transactions,
        ]);
    }
}