<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();               // e.g. "FAB-001"
            $table->string('name');                         // e.g. "Wool Jersey"
            $table->string('supplier')->nullable();
            $table->enum('unit', ['m', 'kg', 'pcs']);       // meters, kilograms, pieces
            $table->decimal('cost_per_unit', 10, 4)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
