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
            if (!Schema::hasColumn('settings', 'store_name')) {
                $table->string('store_name')->nullable();
            }
            if (!Schema::hasColumn('settings', 'app_version')) {
                $table->string('app_version')->nullable();
            }
            if (!Schema::hasColumn('settings', 'email')) {
                $table->string('email')->nullable();
            }
            if (!Schema::hasColumn('settings', 'phone')) {
                $table->string('phone')->nullable();
            }
            
            // Re-check and ensure dynamic pages in case previous migration was skipped or failed mid-way
            if (!Schema::hasColumn('settings', 'help_support')) {
                $table->longText('help_support')->nullable();
            }
            if (!Schema::hasColumn('settings', 'privacy_policy')) {
                $table->longText('privacy_policy')->nullable();
            }
            if (!Schema::hasColumn('settings', 'terms_conditions')) {
                $table->longText('terms_conditions')->nullable();
            }
            if (!Schema::hasColumn('settings', 'disclaimer')) {
                $table->longText('disclaimer')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Don't drop columns in down, to avoid data loss on rollback of this fix
    }
};
