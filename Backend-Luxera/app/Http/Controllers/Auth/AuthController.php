<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Registers a new user.
     *
     * @param Request $request The HTTP request object containing the user registration data.
     * @throws ValidationException If the validation fails.
     * @return JsonResponse The JSON response containing the registered user, access token, and token type.
     */
    public function register(Request $request)
    {
        // Validate the input fields
        $request->validate([
            'first_name' => 'required|string|max:32',
            'last_name' => 'required|string|max:32',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|min:6|numeric',
            'location' => 'required|string|max:64',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create a new user
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'location' => $request->location,
            'bio' => 'Welcome to Luxera | Update your bio! | Add your profile image',
            'password' => Hash::make($request->password),
        ]);

        // Generate the token for the authenticated user
        $token = $user->createToken($user->first_name)->plainTextToken;

        // Return the registered user, access token, and token type
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Authenticates a user using the provided email and password.
     *
     * @param Request $request The HTTP request object containing the email and password.
     * @throws ValidationException If the email or password is missing or invalid.
     * @return JsonResponse The JSON response containing the authenticated user, access token, and token type.
     */
    public function login(Request $request)
    {
        // Validate the input fields
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Get the user credentials
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->input('email'))->first();

        // Check if the credentials are valid
        if (!Auth::attempt($credentials)) {
            // Check if the email exists in the database
            if ($user) {
                // Email exists but password is incorrect
                return response()->json(['password' => 'The password is incorrect.'], 401);
            } else {
                // Email does not exist
                return response()->json(['email' => 'The provided credentials are incorrect.'], 401);
            }
        }

        // Generate the token for the authenticated user
        $token = $user->createToken($user->first_name)->plainTextToken;

        // Return the authenticated user, access token, and token type
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Logs out the user by deleting their tokens, invalidating their session,
     * and regenerating a new session token. Returns a JSON response with a
     * success message.
     *
     * @param Request $request The HTTP request object.
     * @return \Illuminate\Http\JsonResponse The JSON response with a success message.
     */
    public function logout(Request $request)
    {
        // Delete the user's tokens
        $request->user()->tokens()->delete();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate a new session token
        $request->session()->regenerateToken();

        // Return a success message
        return response()->json(['message' => 'Logged out']);
    }
}
