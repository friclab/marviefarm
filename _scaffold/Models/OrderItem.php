<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'piece_id', 'quantity', 'unit_price', 'notes'];

    protected $casts = [
        'unit_price' => 'decimal:2',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function piece(): BelongsTo
    {
        return $this->belongsTo(Piece::class);
    }

    public function lineTotal(): float
    {
        $price = $this->unit_price ?? $this->piece->wholesale_price ?? 0;
        return $this->quantity * $price;
    }
}
