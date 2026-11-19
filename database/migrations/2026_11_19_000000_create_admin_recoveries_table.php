<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('admin_recoveries', function (Blueprint $table) {
            $table->unsignedTinyInteger('id')->primary();
            $table->timestamp('used_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_recoveries');
    }
};
