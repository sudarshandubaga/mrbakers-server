<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::updateOrCreate(
            ['id' => 1],
            [
                'store_name' => 'Mr. Bakers',
                'app_version' => '1.0.0',
                'email' => 'contact@mrbakers.in',
                'phone' => '+91 99999 88888',
                'help_support' => '<h1>Help & Support</h1><p>Welcome to Mr. Bakers support. If you have any issues with your order, please contact us at support@mrbakers.in or call our helpline.</p>',
                'privacy_policy' => '<h1>Privacy Policy</h1><p>We value your privacy. Your data is secure with us and used only to improve your experience.</p>',
                'terms_conditions' => '<h1>Terms & Conditions</h1><p>By using our app, you agree to our terms of service. Orders once placed can be cancelled within 10 minutes.</p>',
                'disclaimer' => '<h1>Disclaimer</h1><p>Images shown are for representation purpose only. Actual product appearance may vary based on design and seasonal ingredients.</p>'
            ]
        );
    }
}
