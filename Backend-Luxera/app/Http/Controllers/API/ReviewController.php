<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    
    /**
     * Retrieves all reviews along with the user's profile image.
     *
     * @return \Illuminate\Http\JsonResponse The JSON response containing the reviews.
     */
    public function index()
    {
        $reviews = Review::with('user:id,first_name,last_name,profile_image')->get();
        return response()->json($reviews);
    }

    
    /**
     * Store a new review.
     *
     * This function stores a new review for the authenticated user. It first checks if the user has already created a review. If so, it returns a JSON response with an error message and a status code of 403.
     *
     * If the user has not created a review yet, the function validates the request data using the following rules:
     * - 'rating' must be an integer between 1 and 5
     * - 'title' must be a string with a maximum length of 255 characters
     * - 'content' must be a string
     *
     * If the data is valid, a new 'Review' model is created with the user's ID, the validated data, and the user's profile image is loaded.
     *
     * Finally, a JSON response is returned with the created review and a status code of 201.
     *
     * @param Request $request The HTTP request object containing the review data.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the created review or an error message.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // Ensure the user has not already created a review
        if ($user->review) {
            return response()->json(['message' => 'You have already submitted a review.'], 403);
        }

        $validatedData = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $review = Review::create([
            'user_id' => $user->id,
            'rating' => $validatedData['rating'],
            'title' => $validatedData['title'],
            'content' => $validatedData['content'],
        ])->load('user:id,first_name,last_name,profile_image');

        return response()->json($review, 201);
    }

    
    /**
     * Display the authenticated user's review.
     *
     * This function fetches the review associated with the authenticated user's ID. It first checks if the user is authenticated, and if so, it queries the 'Review' model with the user's ID and eager loads the 'user' relationship to retrieve the user's profile image. If no review is found, it returns a JSON response with an error message and a status code of 404. Otherwise, it returns a JSON response with the retrieved review.
     *
     * @param Request $request The HTTP request object.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the retrieved review or an error message.
     */
    public function show(Request $request)
    {
        $user = Auth::user();
        $review = Review::with('user:id,first_name,last_name,profile_image')->where('user_id', $user->id)->first();
    
        if (!$review) {
            return response()->json($review, 204);
        }
    
        return response()->json($review);
    }

    
    /**
     * Update an existing review for the authenticated user.
     *
     * @param Request $request The HTTP request object containing the updated review data.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException If the review is not found.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the updated review or an error message.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        $review = Review::where('user_id', $user->id)->firstOrFail();

        // Ensure the authenticated user is the owner of the review
        if ($review->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string|max:1024',
        ]);

        $review->update($validatedData);

        return response()->json($review->load('user:id,first_name,last_name,profile_image'));
    }

    
    /**
     * Delete an existing review.
     *
     * This function deletes a review for the authenticated user. It first checks if the user has already created a review. If so, it returns a JSON response with an error message and a status code of 403.
     *
     * If the user has not created a review yet, the function ensures that the authenticated user is the owner of the review. If not, it returns a JSON response with an error message and a status code of 403.
     *
     * If the user is the owner of the review, the review is deleted and a JSON response is returned with a success message.
     *
     * @param Request $request The HTTP request object containing the review data.
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException If the review is not found.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the success message or an error message.
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();
        $review = Review::where('user_id', $user->id)->firstOrFail();

        // Ensure the authenticated user is the owner of the review
        if ($review->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }
}

