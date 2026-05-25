<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alerte extends Model
{
    protected $fillable = [
        'titre',
        'agence',
        'description',
        'niveau',
        'acquittee',
        'acquittee_par',
        'acquittee_le',
    ];

    protected $casts = [
        'acquittee' => 'boolean',
        'acquittee_le' => 'datetime',
    ];

    public function acquittePar()
    {
        return $this->belongsTo(User::class, 'acquittee_par');
    }
}