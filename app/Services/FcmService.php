<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FcmService
{
    /**
     * Send order notification to admins using FCM HTTP v1 API
     *
     * @param $order
     * @return bool
     */
    public static function sendOrderNotification($order)
    {
        $serviceAccountPath = storage_path('app/firebase-service-account.json');

        if (!file_exists($serviceAccountPath)) {
            Log::warning('Firebase service account file not found at: ' . $serviceAccountPath . '. Please place your firebase-service-account.json there.');
            return false;
        }

        try {
            $serviceAccount = json_decode(file_get_contents($serviceAccountPath), true);
            $projectId = $serviceAccount['project_id'] ?? null;
            $clientEmail = $serviceAccount['client_email'] ?? null;
            $privateKey = $serviceAccount['private_key'] ?? null;

            if (!$projectId || !$clientEmail || !$privateKey) {
                Log::error('Invalid firebase-service-account.json format.');
                return false;
            }

            // 1. Generate Google OAuth2 Access Token using RS256 JWT
            $accessToken = self::generateOAuth2Token($clientEmail, $privateKey);
            if (!$accessToken) {
                Log::error('Failed to generate FCM OAuth2 token.');
                return false;
            }

            $customerName = $order->user->name ?? 'Guest';
            $title = '🔔 New Order Received!';
            $body = "Order " . ($order->order_number ?: $order->id) . " placed by " . $customerName . " for ₹" . $order->total . ".";

            $dataPayload = [
                'order_id' => (string) $order->id,
                'order_number' => (string) ($order->order_number ?: ''),
                'customerName' => (string) $customerName,
                'total' => (string) $order->total,
                'status' => (string) $order->status,
                'click_action' => 'FLUTTER_NOTIFICATION_CLICK',
            ];

            // Get all admin users with registered FCM tokens
            $tokens = \App\Models\User::where('role', 'admin')
                ->whereNotNull('fcm_token')
                ->where('fcm_token', '!=', '')
                ->pluck('fcm_token')
                ->toArray();

            $fcmUrl = "https://fcm.googleapis.com/v1/projects/{$projectId}/messages:send";

            // If we have active admin tokens, send directly to each
            if (!empty($tokens)) {
                $successCount = 0;
                foreach ($tokens as $token) {
                    $messagePayload = [
                        'message' => [
                            'token' => $token,
                            // Data-only message (no notification block) so Android calls our handler
                            // even when the app is in background/killed
                            'android' => [
                                'priority' => 'high',
                            ],
                            'data' => array_merge($dataPayload, [
                                'title' => $title,
                                'body' => $body,
                                'is_incoming_order' => 'true',
                            ]),
                        ]
                    ];

                    $response = Http::withHeaders([
                        'Authorization' => 'Bearer ' . $accessToken,
                        'Content-Type' => 'application/json',
                    ])->post($fcmUrl, $messagePayload);

                    if ($response->successful()) {
                        $successCount++;
                    } else {
                        Log::error("FCM v1 failed for token: {$token}. Error: " . $response->body());
                    }
                }
                Log::info("FCM v1 notifications sent directly to admins. Success count: {$successCount}/" . count($tokens));
                return $successCount > 0;
            } else {
                // Fallback to topic
                Log::info('No admin tokens found in database. Sending to admin-orders topic.');
                $messagePayload = [
                    'message' => [
                        'topic' => 'admin-orders',
                        // Data-only message (no notification block) so Android calls our handler
                        // even when the app is in background/killed
                        'android' => [
                            'priority' => 'high',
                        ],
                        'data' => array_merge($dataPayload, [
                            'title' => $title,
                            'body' => $body,
                            'is_incoming_order' => 'true',
                        ]),
                    ]
                ];

                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $accessToken,
                    'Content-Type' => 'application/json',
                ])->post($fcmUrl, $messagePayload);

                if ($response->successful()) {
                    Log::info('FCM v1 topic notification sent successfully.');
                    return true;
                } else {
                    Log::error('FCM v1 topic notification failed: ' . $response->body());
                    return false;
                }
            }
        } catch (\Exception $e) {
            Log::error('FcmService v1 Exception: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Generate Google OAuth2 Token using private key RS256 JWT
     */
    private static function generateOAuth2Token($clientEmail, $privateKey)
    {
        $header = json_encode(['alg' => 'RS256', 'typ' => 'JWT']);
        $now = time();
        $claims = json_encode([
            'iss' => $clientEmail,
            'scope' => 'https://www.googleapis.com/auth/firebase.messaging',
            'aud' => 'https://oauth2.googleapis.com/token',
            'exp' => $now + 3600,
            'iat' => $now
        ]);

        $base64UrlHeader = self::base64UrlEncode($header);
        $base64UrlPayload = self::base64UrlEncode($claims);
        $signingInput = $base64UrlHeader . '.' . $base64UrlPayload;

        $signature = '';
        if (!openssl_sign($signingInput, $signature, $privateKey, OPENSSL_ALGO_SHA256)) {
            Log::error('Failed to sign JWT with OpenSSL.');
            return null;
        }

        $jwt = $signingInput . '.' . self::base64UrlEncode($signature);

        $response = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion' => $jwt
        ]);

        if ($response->successful()) {
            return $response->json()['access_token'] ?? null;
        }

        Log::error('Google OAuth2 exchange failed: ' . $response->body());
        return null;
    }

    /**
     * URL-safe Base64 encoding helper
     */
    private static function base64UrlEncode($data)
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }
}
