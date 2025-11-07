<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Langage;
use Illuminate\Http\Request;

class LangageController extends Controller
{
    public function index()
    {
        return response()->json(Langage::all());
    }
}
