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
            $payload = [
                'to' => '/topics/admin-orders',
                'priority' => 'high',
                'notification' => [
                    'title' => '🔔 New Order Received!',
                    'body' => "Order " . ($order->order_number ?: $order->id) . " placed by " . $customerName . " for ₹" . $order->total . ".",
                    'sound' => 'alarm',
                    'android_channel_id' => 'orders',
                ],
                'data' => [
                    'order_id' => (string) $order->id,
                    'order_number' => (string) ($order->order_number ?: ''),
                    'customerName' => (string) $customerName,
                    'total' => (string) $order->total,
                    'status' => (string) $order->status,
                    'click_action' => 'FLUTTER_NOTIFICATION_CLICK', // For background click handling
                ],
            ];

            $response = Http::withHeaders([
                'Authorization' => 'key=' . $serverKey,
                'Content-Type' => 'application/json',
            ])->post('https://fcm.googleapis.com/fcm/send', $payload);

            if ($response->successful()) {
                Log::info('FCM order notification sent successfully.');
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
