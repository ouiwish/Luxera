<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Update the user's profile.
     *
     * @param Request $request The HTTP request object.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the updated user and a success message.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'first_name' => 'sometimes|string|alpha|max:32',
            'last_name' => 'sometimes|string|alpha|max:32',
            // 'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'sometimes|numeric|regex:/^\+?\d{6,20}$/',
            'location' => 'sometimes|string|max:64',
            'bio' => 'sometimes|string|max:1000',
            'profile_image' => 'sometimes|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle profile photo upload
        if ($request->hasFile('profile_image')) {
            // Delete old profile photo if it exists
            if ($user->profile_image && Storage::disk('public')->exists(str_replace(url('storage/'), '', $user->profile_image))) {
                Storage::disk('public')->delete(str_replace(url('storage/'), '', $user->profile_image));
            }
            $profilePhotoPath = $this->storeFile($request->file('profile_image'), $user->id, 'avatars');
            $data['profile_image'] = url("storage/" . $profilePhotoPath);

            $user->profile_image = $data['profile_image'];

            $user->save();
        }


        foreach (['first_name', 'last_name', 'email', 'phone', 'location', 'bio'] as $field) {
            if ($request->has($field)) {
                $user->{$field} = $request->{$field};
            }
        }

        $user->save();

        return response()->json([
            'user' => $user,
            'message' => 'Profile updated successfully',
        ]);
    }

    /**
     * Change the password of the authenticated user.
     *
     * @param \Illuminate\Http\Request $request The HTTP request object.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the result of the password change.
     */
    public function changePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['current_password' => 'Current password is incorrect'], 400);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'message' => 'Password updated successfully',
        ]);
    }

        /**
     * Store a file and return its path.
     *
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $id
     * @param string $folder
     * @return string
     */
    private function storeFile($file, $id, $folder)
    {
        $filePath = "assets/{$folder}/" . $id . '.' . Str::random(40) . '.' . $file->getClientOriginalExtension();
        Storage::disk('public')->put($filePath, file_get_contents($file->getRealPath()));
        return $filePath;
    }
}
