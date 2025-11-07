<?php

namespace App\Http\Controllers;
use App\Models\Cours;
use Illuminate\Http\Request;

class CoursController extends Controller
{
    //
    public function getByChapitre($id)
    {
        return Cours::where('chapitre_id', $id)->orderBy('ordre_contenu')->get();
    }

}
