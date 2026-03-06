<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->restrictOnDelete();
            $table->foreignId('season_id')->constrained()->restrictOnDelete();
            $table->string('order_number')->unique();        // e.g. "ORD-2026-001"
            $table->enum('status', ['draft', 'confirmed', 'fulfilled', 'cancelled'])
                  ->default('draft');
            $table->date('ordered_at')->nullable();
            $table->date('delivery_due')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
