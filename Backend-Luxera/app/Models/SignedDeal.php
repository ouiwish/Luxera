<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SignedDeal extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'deal_id', 'status'];

    public function deal()
    {
        return $this->belongsTo(FashionDeal::class);
    }
}
