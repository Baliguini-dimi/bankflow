<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'reference',
        'agence',
        'type',
        'montant',
        'statut',
        'effectuee_le',
    ];

    protected $casts = [
        'montant' => 'decimal:2',
        'effectuee_le' => 'datetime',
    ];
}