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
                'phone' => '+91 92146 88000'
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
        $settings->save();

        return response()->json(['success' => true, 'settings' => $settings]);
    }
}
