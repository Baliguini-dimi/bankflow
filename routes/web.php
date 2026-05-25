<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\AlerteController;

Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/operations', [TransactionController::class, 'index'])->name('operations');

    Route::get('/alertes', [AlerteController::class, 'index'])->name('alertes');
    Route::post('/alertes/{alerte}/acquitter', [AlerteController::class, 'acquitter'])->name('alertes.acquitter');

    Route::get('/rapports', function () {
        return Inertia::render('Rapports');
    })->name('rapports');

    Route::get('/messagerie', function () {
        return Inertia::render('Messagerie');
    })->name('messagerie');
});

require __DIR__.'/auth.php';