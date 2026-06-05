<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Only authenticated users can create orders
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'shipping_address' => 'required|array',
            'shipping_address.name' => 'required|string|max:255',
            'shipping_address.phone' => 'required|string|max:20',
            'shipping_address.email' => 'required|email',
            'shipping_address.address' => 'required|string|max:500',
            'shipping_address.city' => 'required|string|max:255',
            'shipping_address.state' => 'required|string|max:255',
            'shipping_address.zip' => 'required|string|max:20',
            'notes' => 'nullable|string|max:1000',
            'coupon_code' => 'nullable|string|max:50',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'shipping_address.required' => 'Shipping address is required',
            'shipping_address.name.required' => 'Full name is required',
            'shipping_address.phone.required' => 'Phone number is required',
            'shipping_address.email.required' => 'Email is required',
            'shipping_address.address.required' => 'Address is required',
            'shipping_address.city.required' => 'City is required',
            'shipping_address.state.required' => 'State is required',
            'shipping_address.zip.required' => 'ZIP code is required',
        ];
    }
}
