<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seasons', function (Blueprint $table) {
            $table->id();
            $table->string('name');                          // e.g. "Spring/Summer 2026"
            $table->enum('type', ['SS', 'FW']);              // Spring/Summer or Fall/Winter
            $table->unsignedSmallInteger('year');
            $table->date('starts_at')->nullable();
            $table->date('ends_at')->nullable();
            $table->timestamps();

            $table->unique(['type', 'year']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seasons');
    }
};
