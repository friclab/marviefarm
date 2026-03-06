<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Material extends Model
{
    protected $fillable = ['code', 'name', 'supplier', 'unit', 'cost_per_unit', 'notes'];

    protected $casts = [
        'cost_per_unit' => 'decimal:4',
    ];

    public function pieces(): BelongsToMany
    {
        return $this->belongsToMany(Piece::class, 'piece_materials')
            ->withPivot('quantity', 'notes')
            ->withTimestamps();
    }

    public function pieceMaterials(): HasMany
    {
        return $this->hasMany(PieceMaterial::class);
    }
}
