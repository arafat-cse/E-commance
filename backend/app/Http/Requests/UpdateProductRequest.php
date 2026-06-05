<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $productId = $this->route('id');

        return [
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'category' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0|gte:price',
            'sku' => 'sometimes|string|unique:products,sku,' . $productId . '|max:255',
            'stock' => 'sometimes|integer|min:0',
            'image' => 'nullable|string|url',
            'images' => 'nullable|array',
            'images.*' => 'string|url',
            'weight' => 'nullable|string|max:255',
            'is_featured' => 'nullable|boolean',
            'tag' => 'nullable|string|max:255',
        ];
    }
}
