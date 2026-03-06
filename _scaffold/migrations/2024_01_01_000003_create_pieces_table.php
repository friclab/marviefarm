<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pieces', function (Blueprint $table) {
            $table->id();
            $table->foreignId('season_id')->constrained()->cascadeOnDelete();
            $table->string('code');                         // e.g. "JK-001"
            $table->string('name');                         // e.g. "Wool Blazer"
            $table->string('category')->nullable();         // e.g. "outerwear", "knitwear"
            $table->text('description')->nullable();
            $table->decimal('retail_price', 10, 2)->nullable();
            $table->decimal('wholesale_price', 10, 2)->nullable();
            $table->timestamps();

            $table->unique(['season_id', 'code']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pieces');
    }
};
