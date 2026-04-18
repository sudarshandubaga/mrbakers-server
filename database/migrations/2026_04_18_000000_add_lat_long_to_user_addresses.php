<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('user_addresses')) {
            Schema::table('user_addresses', function (Blueprint $table) {
                if (!Schema::hasColumn('user_addresses', 'latitude')) {
                    $table->decimal('latitude', 10, 7)->nullable()->after('pincode');
                }
                if (!Schema::hasColumn('user_addresses', 'longitude')) {
                    $table->decimal('longitude', 10, 7)->nullable()->after('latitude');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_addresses', function (Blueprint $table) {
            $table->dropColumn(['latitude', 'longitude']);
        });
    }
};
