<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuizSeeder extends Seeder
{
    public function run()
    {
        $quizzes = [
            // Chapter 1: CSS Fundamentals
            ['titre' => 'Mini Quiz: CSS Selectors', 'langage_id' => 2, 'chapitre_id' => 18, 'type' => 'mini'],
            
            // Chapter 2: Layout
            ['titre' => 'Mini Quiz: Flexbox', 'langage_id' => 2, 'chapitre_id' => 23, 'type' => 'mini'],
            
            // Chapter 3: Responsive Design
            ['titre' => 'Mini Quiz: Media Queries', 'langage_id' => 2, 'chapitre_id' => 28, 'type' => 'mini'],
            
            // Chapter 4: Advanced CSS
            ['titre' => 'Mini Quiz: CSS Variables', 'langage_id' => 2, 'chapitre_id' => 32, 'type' => 'mini'],

            // Langage Css global quiz 
            ['titre' => 'Global Quiz: CSS', 'langage_id' => 2, 'chapitre_id' => null, 'type' => 'global'],

            // Chapter 1: HTML Basics
            ['titre' => 'Mini Quiz: HTML Elements', 'langage_id' => 1, 'chapitre_id' => 1, 'type' => 'mini'],

            // Chapter 2: HTML Forms
            ['titre' => 'Mini Quiz: HTML Forms', 'langage_id' => 1, 'chapitre_id' => 6, 'type' => 'mini'],

            // Chapter 3: HTML Attributes
            ['titre' => 'Mini Quiz: HTML Attributes', 'langage_id' => 1, 'chapitre_id' => 11, 'type' => 'mini'],

            // Chapter 4: HTML Tables
            ['titre' => 'Mini Quiz: HTML Tables', 'langage_id' => 1, 'chapitre_id' => 15, 'type' => 'mini'],

            // Langage HTML global quiz 
            ['titre' => 'Global Quiz: HTML', 'langage_id' => 1, 'chapitre_id' => null, 'type' => 'global'],
        ];

        DB::table('quiz')->insert($quizzes);
    }
}