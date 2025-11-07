<?php

namespace App\Http\Controllers;

use App\Models\Chapitre;
use Illuminate\Http\Request;

class ChapitreController extends Controller
{
    public function getByLangage($id)
    {
        return Chapitre::where('langage_id', $id)->get();
    }
}
