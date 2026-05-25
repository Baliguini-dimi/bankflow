<?php

namespace App\Http\Controllers;

use App\Models\Alerte;
use App\Services\AuditService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlerteController extends Controller
{
    public function index()
    {
        AuditService::log('consultation', 'Alertes', 'Consultation de la liste des alertes');

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

        AuditService::log(
            'acquittement',
            'Alertes',
            "Alerte #{$alerte->id} acquittée : {$alerte->titre}"
        );

        return back();
    }
}