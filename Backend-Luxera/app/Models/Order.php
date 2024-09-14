<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'completed_orders';

    // Specify the fillable attributes
    protected $fillable = [
        'user_id',
        'deal_id',
        'amount',
        'currency',
        'payment_id',
        'payer_id',
        'payer_email',
        'payer_name',
        'payer_country',
        'status',
    ];

    // Optionally specify any casts for attributes
    protected $casts = [
        'amount' => 'decimal:2',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
