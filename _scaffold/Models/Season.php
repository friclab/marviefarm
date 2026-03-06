<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Season extends Model
{
    protected $fillable = ['name', 'type', 'year', 'starts_at', 'ends_at'];

    protected $casts = [
        'starts_at' => 'date',
        'ends_at'   => 'date',
    ];

    public function pieces(): HasMany
    {
        return $this->hasMany(Piece::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Calculate total material requirements for all confirmed orders in this season.
     *
     * Returns a collection of:
     *   material_id, material_name, unit, total_quantity
     */
    public function materialRequirements()
    {
        return \DB::table('order_items as oi')
            ->join('orders as o', 'o.id', '=', 'oi.order_id')
            ->join('piece_materials as pm', 'pm.piece_id', '=', 'oi.piece_id')
            ->join('materials as m', 'm.id', '=', 'pm.material_id')
            ->where('o.season_id', $this->id)
            ->whereIn('o.status', ['confirmed', 'fulfilled'])
            ->groupBy('m.id', 'm.code', 'm.name', 'm.unit', 'm.cost_per_unit')
            ->select([
                'm.id as material_id',
                'm.code',
                'm.name',
                'm.unit',
                'm.cost_per_unit',
                \DB::raw('SUM(oi.quantity * pm.quantity) as total_quantity'),
                \DB::raw('SUM(oi.quantity * pm.quantity) * m.cost_per_unit as estimated_cost'),
            ])
            ->orderBy('m.name')
            ->get();
    }
}
