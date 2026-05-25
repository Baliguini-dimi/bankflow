<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->string('agence');
            $table->enum('type', ['Virement', 'Retrait', 'Dépôt']);
            $table->decimal('montant', 15, 2);
            $table->enum('statut', ['Validé', 'En attente', 'Anomalie'])->default('En attente');
            $table->timestamp('effectuee_le')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};