<?php

namespace App\Http\Controllers;

use App\Models\Alerte;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlerteController extends Controller
{
    public function index()
    {
        $alertes = Alerte::latest()->get();

        $stats = [
            'total' => $alertes->count(),
            'non_acquittees' => $alertes->where('acquittee', false)->count(),
            'critiques' => $alertes->where('niveau', 'Critique')->count(),
            'avertissements' => $alertes->where('niveau', 'Avertissement')->count(),
        ];

        return Inertia::render('Alertes', [
            'alertes' => $alertes,
            'stats' => $stats,
        ]);
    }

    public function acquitter(Request $request, Alerte $alerte)
    {
        $alerte->update([
            'acquittee' => true,
            'acquittee_par' => auth()->id(),
            'acquittee_le' => now(),
        ]);

        return back();
    }
}