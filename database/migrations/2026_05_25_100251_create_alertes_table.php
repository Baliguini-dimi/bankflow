<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alertes', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('agence');
            $table->text('description');
            $table->enum('niveau', ['Critique', 'Avertissement', 'Info']);
            $table->boolean('acquittee')->default(false);
            $table->foreignId('acquittee_par')->nullable()->constrained('users');
            $table->timestamp('acquittee_le')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alertes');
    }
};