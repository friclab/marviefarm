<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PieceMaterial extends Model
{
    protected $fillable = ['piece_id', 'material_id', 'quantity', 'notes'];

    protected $casts = [
        'quantity' => 'decimal:4',
    ];

    public function piece(): BelongsTo
    {
        return $this->belongsTo(Piece::class);
    }

    public function material(): BelongsTo
    {
        return $this->belongsTo(Material::class);
    }
}
