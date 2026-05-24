<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/dashboard', function () {
    return redirect('/');
})->middleware(['auth']);

require __DIR__.'/auth.php';