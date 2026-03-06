<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Piece extends Model
{
    protected $fillable = [
        'season_id', 'code', 'name', 'category',
        'description', 'retail_price', 'wholesale_price',
    ];

    protected $casts = [
        'retail_price'    => 'decimal:2',
        'wholesale_price' => 'decimal:2',
    ];

    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    public function materials(): BelongsToMany
    {
        return $this->belongsToMany(Material::class, 'piece_materials')
            ->withPivot('quantity', 'notes')
            ->withTimestamps();
    }

    public function pieceMaterials(): HasMany
    {
        return $this->hasMany(PieceMaterial::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
