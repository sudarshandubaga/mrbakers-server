<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    public function validateVoucher(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'amount' => 'required|numeric|min:0'
        ]);

        $voucher = Voucher::where('code', $request->code)->first();

        if (!$voucher) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid promo code.'
            ], 404);
        }

        if (!$voucher->isValid($request->amount)) {
            $msg = 'This promo code is not applicable.';
            if ($voucher->expires_at && $voucher->expires_at->isPast()) {
                $msg = 'This promo code has expired.';
            } elseif ($request->amount < $voucher->min_order_amount) {
                $msg = 'Minimum order amount of ₹' . $voucher->min_order_amount . ' required for this code.';
            } elseif ($voucher->usage_limit && $voucher->usage_count >= $voucher->usage_limit) {
                $msg = 'This promo code usage limit has been reached.';
            }

            return response()->json([
                'success' => false,
                'message' => $msg
            ], 422);
        }

        $discount = $voucher->calculateDiscount($request->amount);

        return response()->json([
            'success' => true,
            'voucher_id' => $voucher->id,
            'code' => $voucher->code,
            'discount' => $discount,
            'message' => 'Promo code applied successfully!'
        ]);
    }
}
