<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Only admins can create products
        return auth()->check() && auth()->user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0|gte:price',
            'sku' => 'required|string|unique:products|max:255',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|string|url',
            'images' => 'nullable|array',
            'images.*' => 'string|url',
            'weight' => 'nullable|string|max:255',
            'is_featured' => 'nullable|boolean',
            'tag' => 'nullable|string|max:255',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Product name is required',
            'category.required' => 'Category is required',
            'price.required' => 'Price is required',
            'sku.unique' => 'SKU must be unique',
            'original_price.gte' => 'Original price must be greater than or equal to price',
        ];
    }
}
