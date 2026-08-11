<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class AppSettingController extends Controller
{
    public function index()
    {
        $settings = Setting::first();
        if (!$settings) {
            $settings = Setting::create([
                'store_name' => 'Mr Bakers',
                'app_version' => '1.0.0',
                'email' => 'contact@mrbakersjodhpur.in',
                'phone' => '+91 92146 88000',
                'min_cart_total' => null,
                'delivery_charges_upto_min_cart_total' => null
            ]);
        }

        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $settings = Setting::first();
        if (!$settings) {
            $settings = new Setting();
        }
        
        $settings->store_name = $request->store_name;
        $settings->app_version = $request->app_version;
        $settings->email = $request->email;
        $settings->phone = $request->phone;
        $settings->help_support = $request->help_support;
        $settings->privacy_policy = $request->privacy_policy;
        $settings->terms_conditions = $request->terms_conditions;
        $settings->disclaimer = $request->disclaimer;
        $settings->order_from_time = $request->order_from_time;
        $settings->order_to_time = $request->order_to_time;
        $settings->order_disabled_message = $request->order_disabled_message;
        $settings->min_cart_total = $request->min_cart_total;
        $settings->delivery_charges_upto_min_cart_total = $request->delivery_charges_upto_min_cart_total;
        $settings->save();

        return response()->json(['success' => true, 'settings' => $settings]);
    }
}
