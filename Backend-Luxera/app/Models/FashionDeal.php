<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FashionDeal extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'name', 'original_price', 'deal_price', 'discount', 'image', 'status'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
