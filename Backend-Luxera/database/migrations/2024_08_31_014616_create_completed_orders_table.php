<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompletedOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('completed_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Ensures user_id references users table
            $table->foreignId('deal_id')->nullable()->constrained('fashion_deals'); // Ensures deal_id references fashion_deals table
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3); // 3-letter currency code
            $table->string('payment_id')->unique(); // Unique payment identifier from PayPal
            $table->string('payer_id'); // PayPal payer ID
            $table->string('payer_email'); // PayPal payer email
            $table->string('payer_name'); // PayPal payer full name
            $table->string('payer_country', 2); // PayPal payer country code
            $table->string('status'); // Status of the order (e.g., COMPLETED)
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('completed_orders');
    }
}