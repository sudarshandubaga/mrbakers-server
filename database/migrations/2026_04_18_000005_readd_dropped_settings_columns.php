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
        Schema::table('settings', function (Blueprint $table) {
            if (!Schema::hasColumn('settings', 'email')) {
                $table->string('email')->nullable();
            }
            if (!Schema::hasColumn('settings', 'phone')) {
                $table->string('phone')->nullable();
            }
            if (!Schema::hasColumn('settings', 'store_name')) {
                $table->string('store_name')->nullable();
            }
            if (!Schema::hasColumn('settings', 'app_version')) {
                $table->string('app_version')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
