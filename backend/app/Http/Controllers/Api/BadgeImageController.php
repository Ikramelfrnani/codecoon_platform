<?php

// App/Http/Controllers/Api/BadgeImageController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

class BadgeImageController extends Controller
{
    public function show($filename)
{
    try {
        $path = storage_path("app/public/image/{$filename}");

        if (!file_exists($path)) {
            return response("File not found", 404);
        }

        $mimeType = mime_content_type($path) ?: 'application/octet-stream';

        $headers = [
            'Content-Type' => $mimeType,
            'Access-Control-Allow-Origin' => '*',
        ];

        return response()->make(file_get_contents($path), 200, $headers);

    } catch (\Exception $e) {
        return response("Server error: " . $e->getMessage(), 500);
    }
}
}
