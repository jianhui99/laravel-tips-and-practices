<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

/**
 * This trait is used to return an API response
 * 
 * @package App\Traits
 */
trait ApiResponse
{
    public static function responseWithSuccess(array $data = null, string $message = null, int $code = 200) : JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message
        ], $code);
    }

    public static function responseWithError(string $message = null, int $code = 400) : JsonResponse
    {
        return response()->json([
            'success' => false,
            'data' => null,
            'message' => $message
        ], $code);
    }
}