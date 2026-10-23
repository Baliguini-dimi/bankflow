<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AlerteController;
use App\Http\Controllers\AuditController;
use App\Http\Controllers\ParametresController;
use App\Http\Controllers\AssistantController;

Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/operations', [TransactionController::class, 'index'])->name('operations');

    Route::get('/alertes', [AlerteController::class, 'index'])->name('alertes');
    Route::post('/alertes/{alerte}/acquitter', [AlerteController::class, 'acquitter'])->name('alertes.acquitter');

    Route::get('/audit', [AuditController::class, 'index'])->name('audit');

    Route::get('/rapports', function () {
        return Inertia::render('Rapports');
    })->name('rapports');

    Route::get('/rapports/exporter', function () {
        $transactions = \App\Models\Transaction::query()->orderBy('effectuee_le')->get();
        $stream = fopen('php://temp', 'r+');
        fwrite($stream, "\xEF\xBB\xBF");
        fputcsv($stream, ['Référence', 'Agence', 'Type', 'Montant', 'Statut', 'Date'], ';', '"', '');

        $safeCell = static function ($value): string {
            $value = (string) ($value ?? '');
            if (preg_match('/^[\x00-\x20]*[=+@-]/u', $value)) {
                $value = "'".$value;
            }
            return $value;
        };

        foreach ($transactions as $tx) {
            fputcsv($stream, array_map($safeCell, [
                $tx->reference,
                $tx->agence,
                $tx->type,
                $tx->montant,
                $tx->statut,
                $tx->effectuee_le?->format('Y-m-d H:i:s'),
            ]), ';', '"', '');
        }

        rewind($stream);
        $csv = stream_get_contents($stream);
        fclose($stream);

        return response($csv, 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="rapport_bankflow.csv"',
            'Cache-Control' => 'no-store, private',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    })->middleware('throttle:10,1')->name('rapports.exporter');

    Route::get('/messagerie', function () {
        return Inertia::render('Messagerie');
    })->name('messagerie');

    Route::get('/assistant', [AssistantController::class, 'index'])->name('assistant');
    Route::post('/assistant/chat', [AssistantController::class, 'chat'])->middleware('throttle:10,1')->name('assistant.chat');
    Route::get('/assistant/resume', [AssistantController::class, 'resumeJournalier'])->middleware('throttle:10,1')->name('assistant.resume');

    Route::get('/parametres', [ParametresController::class, 'index'])->name('parametres');
    Route::put('/parametres/profil', [ParametresController::class, 'updateProfil'])->name('parametres.profil');
    Route::put('/parametres/password', [ParametresController::class, 'updatePassword'])->name('parametres.password');
});

require __DIR__.'/auth.php';
