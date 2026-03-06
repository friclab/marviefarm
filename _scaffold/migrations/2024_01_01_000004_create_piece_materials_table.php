<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Material consumption per piece (BOM — Bill of Materials).
     * e.g. Blazer JK-001 requires 2.5m of Wool Jersey + 0.3m of Lining
     */
    public function up(): void
    {
        Schema::create('piece_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('piece_id')->constrained()->cascadeOnDelete();
            $table->foreignId('material_id')->constrained()->cascadeOnDelete();
            $table->decimal('quantity', 10, 4);             // consumption per single piece
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['piece_id', 'material_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('piece_materials');
    }
};
