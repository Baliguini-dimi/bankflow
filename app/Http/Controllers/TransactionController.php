<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaction::query();

        // Recherche par référence ou agence
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('reference', 'like', '%' . $request->search . '%')
                  ->orWhere('agence', 'like', '%' . $request->search . '%');
            });
        }

        // Filtre par statut
        if ($request->filled('statut') && $request->statut !== 'Tous') {
            $query->where('statut', $request->statut);
        }

        $transactions = $query->latest('effectuee_le')->paginate(5)->withQueryString();

        return Inertia::render('Operations', [
            'transactions' => $transactions,
            'filters' => $request->only(['search', 'statut']),
        ]);
    }
}