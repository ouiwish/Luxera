<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Retrieves all categories from the database.
     *
     * @return \Illuminate\Database\Eloquent\Collection|Category[] The collection of all categories.
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Store a new category in the database.
     *
     * @param Request $request The HTTP request object containing the category data.
     * @throws \Illuminate\Validation\ValidationException If the validation fails.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the created category.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories',
        ]);

        $category = Category::create($validated);

        return response()->json($category, 201);
    }
}
