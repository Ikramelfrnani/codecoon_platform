<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResultatSeeder extends Seeder
{
    public function run()
    {
        DB::table('resultats')->insert([
            'utilisateur_id' => 1,
            'quiz_id' => 1,
            'score' => 85
        ]);
    }
}
