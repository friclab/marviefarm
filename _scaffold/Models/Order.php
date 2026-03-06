<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'customer_id', 'season_id', 'order_number',
        'status', 'ordered_at', 'delivery_due', 'notes',
    ];

    protected $casts = [
        'ordered_at'   => 'date',
        'delivery_due' => 'date',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function totalAmount(): float
    {
        return $this->items->sum(function (OrderItem $item) {
            $price = $item->unit_price ?? $item->piece->wholesale_price ?? 0;
            return $item->quantity * $price;
        });
    }
}
