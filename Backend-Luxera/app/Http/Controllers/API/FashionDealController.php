<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FashionDeal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FashionDealController extends Controller
{
    /**
     * Retrieves all open fashion deals with their associated category.
     *
     * @return \Illuminate\Database\Eloquent\Collection|FashionDeal[]
     */
    public function index()
    {
        return FashionDeal::with('category')
            ->where('status', 'open')
            ->get();
    }

    /**
     * Store a newly created fashion deal.
     *
     * @param Request $request The HTTP request object containing the data for the fashion deal.
     * @throws \Illuminate\Validation\ValidationException If the validation fails.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the created fashion deal.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'original_price' => 'required|string|max:255',
            'deal_price' => 'required|string|max:255',
            'discount' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $profilePhotoPath = $this->storeFile($request->file('image'), $request->category_id, 'fashion_deals');
            $validated['image'] = url("storage/" . $profilePhotoPath);
        }

        $fashionDeal = FashionDeal::create($validated);

        return response()->json($fashionDeal, 201);
    }

    /**
     * Retrieve a fashion deal with its associated category by ID.
     *
     * @param int $deal The ID of the fashion deal to retrieve.
     * @return \Illuminate\Database\Eloquent\Model|null The fashion deal with its associated category, or null if not found.
     */
    public function show($deal)
    {
        return FashionDeal::with('category')->where('id', $deal)->first();
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
