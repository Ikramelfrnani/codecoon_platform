<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Badge;

class BadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $badges = Badge::all()->map(function ($badge) {
            // Convert image and gif to go through the API endpoint
            $badge->image = $badge->image ? url("/api/badge/image/{$badge->image}") : null;
            $badge->gif = $badge->gif ? url("/api/badge/image/{$badge->gif}") : null;
            return $badge;
        });

        return response()->json($badges);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Get badge by langage_id and return with full image/gif URLs
     */
    public function getBadgeByLangage($langage_id)
    {
        $badge = Badge::where('langage_id', $langage_id)->first();

        if (!$badge) {
            return response()->json(['message' => 'Badge not found'], 404);
        }

        // Use API-based image URLs instead of asset()
        $badge->image = $badge->image ? url("/api/badge/image/{$badge->image}") : null;
        $badge->gif = $badge->gif ? url("/api/badge/image/{$badge->gif}") : null;

        return response()->json($badge);
    }
}