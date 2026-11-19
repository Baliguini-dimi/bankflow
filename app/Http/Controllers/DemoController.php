<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DemoController extends Controller
{
    public function __invoke(): Response
    {
        $dates = collect(range(6, 0))->map(
            fn (int $daysAgo) => Carbon::today()->subDays($daysAgo)
        );

        return Inertia::render('Demo', [
            'stats' => [
                'transactions_jour' => 1284,
                'volume_jour' => 3285000000,
                'alertes_ouvertes' => 7,
                'anomalies' => 12,
            ],
            'graphique' => $dates->values()->map(
                fn (Carbon $date, int $index) => [
                    'date' => $date->format('d/m'),
                    'transactions' => [820, 1040, 960, 1180, 1090, 1320, 1284][$index],
                    'anomalies' => [3, 5, 2, 7, 4, 9, 12][$index],
                    'volume' => [1850000000, 2460000000, 2180000000, 2910000000, 2740000000, 3410000000, 3285000000][$index],
                ]
            ),
            'dernieres_transactions' => [
                ['reference' => 'DEMO-84291', 'agence' => 'Plateau', 'type' => 'Virement', 'montant' => 2450000, 'statut' => 'Validé', 'effectuee_le' => '09:42'],
                ['reference' => 'DEMO-84290', 'agence' => 'Cocody', 'type' => 'Retrait', 'montant' => 780000, 'statut' => 'En attente', 'effectuee_le' => '09:38'],
                ['reference' => 'DEMO-84289', 'agence' => 'Yopougon', 'type' => 'Virement', 'montant' => 15000000, 'statut' => 'Anomalie', 'effectuee_le' => '09:31'],
                ['reference' => 'DEMO-84288', 'agence' => 'Marcory', 'type' => 'Dépôt', 'montant' => 430000, 'statut' => 'Validé', 'effectuee_le' => '09:25'],
                ['reference' => 'DEMO-84287', 'agence' => 'Treichville', 'type' => 'Virement', 'montant' => 8900000, 'statut' => 'À vérifier', 'effectuee_le' => '09:18'],
            ],
            'alertes' => [
                ['titre' => 'Virement supérieur au seuil habituel', 'agence' => 'Yopougon', 'niveau' => 'Critique', 'heure' => '09:31'],
                ['titre' => 'Série de retraits inhabituelle', 'agence' => 'Cocody', 'niveau' => 'Élevé', 'heure' => '09:12'],
                ['titre' => 'Clôture de caisse à confirmer', 'agence' => 'Plateau', 'niveau' => 'À suivre', 'heure' => '08:54'],
            ],
        ]);
    }
}
