<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/operations', function () {
        return Inertia::render('Operations');
    })->name('operations');

    Route::get('/alertes', function () {
        return Inertia::render('Alertes');
    })->name('alertes');

    Route::get('/rapports', function () {
        return Inertia::render('Rapports');
    })->name('rapports');

    Route::get('/messagerie', function () {
        return Inertia::render('Messagerie');
    })->name('messagerie');
});

require __DIR__.'/auth.php';