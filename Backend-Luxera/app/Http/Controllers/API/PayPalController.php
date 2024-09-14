<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\PayPalService;
use App\Models\Order;
use App\Models\SignedDeal;

class PayPalController extends Controller
{
    protected $payPalService;

    /**
     * Constructs a new instance of the PayPalController class.
     *
     * @param PayPalService $payPalService The PayPalService instance to be used by the controller.
     */
    public function __construct(PayPalService $payPalService)
    {
        $this->payPalService = $payPalService;
    }

    /**
     * Create a new order using the PayPal service.
     *
     * @param Request $request The HTTP request object containing the deal ID.
     * @throws \Exception If an error occurs while creating the order.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the order ID or an error message.
     */
    public function createOrder(Request $request)
    {
        $request->validate([
            'deal_id' => 'required|exists:fashion_deals,id',
        ]);

        $deal_id = $request->input('deal_id');

        try {
            $orderId = $this->payPalService->createOrder($deal_id);
            return response()->json(['id' => $orderId]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Capture an order using the PayPal service.
     *
     * @param Request $request The HTTP request object containing the order ID.
     * @throws \Exception If an error occurs while capturing the order.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the order details or an error message.
     */
    public function captureOrder(Request $request)
    {
        $orderId = $request->input('orderID');
        $signedIid = $request->input('signed_id');

        $user = Auth::user();

        try {
            // Capture the order using your PayPal service
            $orderData = $this->payPalService->captureOrder($orderId);
        
            if (!$orderData) {
                return response()->json(['error' => 'Order not found'], 404);
            }
        
            // Extract details from the PayPal response
            $payerEmail = $orderData['payment_source']['paypal']['email_address'] ?? '';
            $payerId = $orderData['payment_source']['paypal']['account_id'] ?? '';
            $payerName = $orderData['payment_source']['paypal']['name']['given_name'] . ' ' . $orderData['payment_source']['paypal']['name']['surname'] ?? '';
            $payerCountry = $orderData['payment_source']['paypal']['address']['country_code'] ?? 'US';
        
            $paymentId = $orderData['id'];
            $amount = $orderData['purchase_units'][0]['payments']['captures'][0]['amount']['value'] ?? 0;
            $currency = $orderData['purchase_units'][0]['payments']['captures'][0]['amount']['currency_code'] ?? 'USD';
            $dealId = $orderData['purchase_units'][0]['payments']['captures'][0]['custom_id'] ?? null;
        
            $deal = SignedDeal::find($signedIid);
        
            if ($deal) {
                $deal->status = 'accepted';
                $deal->save();
            }
        
            $status = $orderData['purchase_units'][0]['payments']['captures'][0]['status'] ?? "COMPLETED";
        
            // Check if the order already exists in the database
            $order = Order::where('payment_id', $paymentId)->first();
        
            if ($order) {
                // Update existing order
                $order->payer_id = $payerId;
                $order->payer_email = $payerEmail;
                $order->payer_name = $payerName;
                $order->payer_country = $payerCountry;
                $order->amount = $amount;
                $order->currency = $currency;
                $order->status = $status; // or other status based on the capture response
                $order->save();
            } else {
                // Create a new order
                $order = Order::create([
                    'user_id' => $user->id, // Assumes user is authenticated
                    'deal_id' => $dealId,
                    'amount' => $amount,
                    'currency' => $currency,
                    'payment_id' => $paymentId,
                    'payer_id' => $payerId,
                    'payer_email' => $payerEmail,
                    'payer_name' => $payerName,
                    'payer_country' => $payerCountry,
                    'status' => $status,
                ]);
            }
        
            // Optionally update the deal status or perform other actions
        
            return response()->json($order);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
