<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FashionDeal;
use App\Models\SignedDeal;
use Illuminate\Support\Facades\Auth;

class DealController extends Controller
{
    /**
     * Sign a deal for the authenticated user.
     *
     * @param Request $request The HTTP request object.
     * @throws \Illuminate\Validation\ValidationException If the request data fails validation.
     * @return \Illuminate\Http\JsonResponse The JSON response indicating the success or failure of the signing process.
     */
    public function signDeal(Request $request)
    {
        $request->validate([
            'deal_id' => 'required|exists:fashion_deals,id',
        ]);

        $dealId = $request->input('deal_id');
        $user = Auth::user();
        $deal = FashionDeal::find($dealId);

        if ($deal->status === 'reviewing') {
            return response()->json(['message' => 'Deal is already under reviewing by someone else.'], 400);
        }

        if (SignedDeal::where('user_id', $user->id)->where('deal_id', $dealId)->exists()) {
            return response()->json(['message' => 'Deal already signed, can\'t be signed again'], 400);
        }

        $deal->status = 'reviewing';
        $deal->save();

        SignedDeal::create([
            'user_id' => $user->id,
            'deal_id' => $dealId,
        ]);

        return response()->json(['message' => 'Deal signed successfully']);
    }

    /**
     * Unsign a deal for the authenticated user.
     *
     * @param Request $request The HTTP request object.
     * @throws \Illuminate\Validation\ValidationException If the request data fails validation.
     * @return \Illuminate\Http\JsonResponse The JSON response indicating the success or failure of the unsigning process.
     */
    public function unSignDeal(Request $request)
    {
        $request->validate([
            'deal_id' => 'required|exists:fashion_deals,id',
        ]);

        $dealId = $request->input('deal_id');
        $user = Auth::user();
        $deal = FashionDeal::find($dealId);

        if (!SignedDeal::where('user_id', $user->id)->where('deal_id', $dealId)->exists()) {
            return response()->json(['message' => 'Deal not signed.'], 400);
        }

        if ($deal->status === 'open') {
            return response()->json(['message' => 'Deal is already open'], 400);
        }

        $deal->status = 'open';
        $deal->save();

        SignedDeal::where('user_id', $user->id)->where('deal_id', $dealId)->delete();

        return response()->json(['message' => 'Deal un-signed successfully']);
    }

    /**
     * Retrieves the signed deals for the authenticated user.
     *
     * @param Request $request The HTTP request object.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the signed deals.
     */
    public function getSignedDeals(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $signedDeals = SignedDeal::where('user_id', $user->id)
            ->with('deal', 'deal.category') // Eager load the deal relationship
            ->get();

        return response()->json($signedDeals);
    }
}
