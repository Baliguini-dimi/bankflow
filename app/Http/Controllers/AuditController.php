<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Inertia\Inertia;

class AuditController extends Controller
{
    public function index()
    {
        $logs = AuditLog::with('user')
            ->latest()
            ->paginate(15);

        return Inertia::render('Audit', [
            'logs' => $logs,
        ]);
    }
}