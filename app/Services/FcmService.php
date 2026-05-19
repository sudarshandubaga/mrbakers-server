<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FcmService
{
    /**
     * Send order notification to admin-orders topic
     *
     * @param array $orderData
     * @return bool
     */
    public static function sendOrderNotification($order)
    {
        $serverKey = env('FCM_SERVER_KEY');
        if (!$serverKey) {
            Log::warning('FCM_SERVER_KEY is not set in .env. Skipping push notification.');
            return false;
        }

        try {
            $customerName = $order->user->name ?? 'Guest';
            
            // Get all admin users with registered FCM tokens
            $tokens = \App\Models\User::where('role', 'admin')
                ->whereNotNull('fcm_token')
                ->where('fcm_token', '!=', '')
                ->pluck('fcm_token')
                ->toArray();

            // Structure data payload (Data-only payload to force app wakeup and custom alarm play)
            $dataPayload = [
                'order_id' => (string) $order->id,
                'order_number' => (string) ($order->order_number ?: ''),
                'customerName' => (string) $customerName,
                'total' => (string) $order->total,
                'status' => (string) $order->status,
                'click_action' => 'FLUTTER_NOTIFICATION_CLICK',
            ];

            $payload = [
                'priority' => 'high',
                'data' => $dataPayload,
            ];

            if (!empty($tokens)) {
                // Send to direct devices
                $payload['registration_ids'] = $tokens;
            } else {
                // Fallback to topic
                Log::info('No admin tokens found in database. Falling back to admin-orders topic.');
                $payload['to'] = '/topics/admin-orders';
            }

            $response = Http::withHeaders([
                'Authorization' => 'key=' . $serverKey,
                'Content-Type' => 'application/json',
            ])->post('https://fcm.googleapis.com/fcm/send', $payload);

            if ($response->successful()) {
                Log::info('FCM order notification sent successfully. Target tokens count: ' . count($tokens));
                return true;
            } else {
                Log::error('FCM order notification failed: ' . $response->body());
                return false;
            }
        } catch (\Exception $e) {
            Log::error('FcmService Exception: ' . $e->getMessage());
            return false;
        }
    }
}
