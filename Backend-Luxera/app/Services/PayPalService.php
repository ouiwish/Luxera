<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use App\Models\FashionDeal;
use Illuminate\Support\Facades\Log;

class PayPalService
{
    private $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    private function getAccessToken()
    {
        $response = $this->client->post('https://api-m.sandbox.paypal.com/v1/oauth2/token', [
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode(env('PAYPAL_CLIENT_ID') . ':' . env('PAYPAL_CLIENT_SECRET')),
                'Content-Type' => 'application/x-www-form-urlencoded',
            ],
            'form_params' => [
                'grant_type' => 'client_credentials',
            ],
        ]);

        $data = json_decode($response->getBody()->getContents(), true);
        return $data['access_token'];
    }

    public function createOrder($deal_id)
    {
        $accessToken = $this->getAccessToken();

        try {
            $response = $this->client->post('https://api-m.sandbox.paypal.com/v2/checkout/orders', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'intent' => 'CAPTURE',
                    'purchase_units' => [
                        [
                            'amount' => [
                                'currency_code' => 'USD',
                                'value' => $this->calculateTotal($deal_id)
                            ],
                            'custom_id' => $deal_id
                        ]
                    ],
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            return $data['id'];
        } catch (RequestException $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function captureOrder($orderId)
    {
        $accessToken = $this->getAccessToken();

        try {
            $response = $this->client->post("https://api-m.sandbox.paypal.com/v2/checkout/orders/$orderId/capture", [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken,
                    'Content-Type' => 'application/json',
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * Calculates the total amount for a given deal ID.
     *
     * @param int $deal_id The ID of the deal.
     * @return float The total amount of the deal.
     */
    private function calculateTotal($deal_id)
    {
        // get total amount from Deal model
        $deal = FashionDeal::where('id', $deal_id)->first();

        $total = $deal->deal_price;

        //Log::info("Total: $total");

        return $total;
    }
}
