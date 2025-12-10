<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * GET /categories
     */
    public function index()
    {
        $categories = Category::with('parent')->get();

        return response()->json($categories);
    }

    /**
     * POST /categories
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name"        => "required|string|unique:categories,name",
            "parent_id"   => "nullable|exists:categories,id",
            "description" => "nullable|string",
            "image"       => "nullable|string",
        ]);

        $validated["slug"] = Str::slug($validated["name"]);

        $category = Category::create($validated);

        return response()->json([
            "status" => true,
            "message" => "Category created successfully",
            "data" => $category
        ], 201);
    }

    /**
     * GET /categories/{id}
     */
    public function show(Category $category)
    {
        return response()->json([
            "status" => true,
            "data" => $category->load("parent")
        ]);
    }

    /**
     * PUT /categories/{id}
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            "name"        => "required|string|unique:categories,name," . $category->id,
            "parent_id"   => "nullable|exists:categories,id",
            "description" => "nullable|string",
            "image"       => "nullable|string",
        ]);

        $validated["slug"] = Str::slug($validated["name"]);

        $category->update($validated);

        return response()->json([
            "status" => true,
            "message" => "Category updated successfully",
            "data" => $category
        ]);
    }

    /**
     * DELETE /categories/{id}
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([
            "status" => true,
            "message" => "Category deleted successfully"
        ]);
    }
}
