<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = [
        'code', 'name', 'contact_person', 'email',
        'phone', 'country', 'city', 'address', 'notes',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
