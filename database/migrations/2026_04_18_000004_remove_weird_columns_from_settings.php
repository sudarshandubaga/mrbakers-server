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
            // Drop accidentally created capitalized columns if they exist
            if (Schema::hasColumn('settings', 'Store Name')) {
                $table->dropColumn('Store Name');
            }
            if (Schema::hasColumn('settings', 'App Version')) {
                $table->dropColumn('App Version');
            }
            if (Schema::hasColumn('settings', 'Email')) {
                $table->dropColumn('Email');
            }
            if (Schema::hasColumn('settings', 'Phone')) {
                $table->dropColumn('Phone');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Not reversible
    }
};
