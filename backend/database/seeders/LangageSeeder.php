<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Langage;
use Illuminate\Database\Seeder;

class LangageSeeder extends Seeder
{
    public function run()
    {
        Langage::create([
            'nom_langage' => 'HTML',
            'description_langage' => 'Learn to create structured and accessible web pages using the fundamental language of the web.',
            'nombre_utilisateurs_termines' => 0,
            'nombre_utilisateurs_commences' => 0,
            'lien_editeur' => 'https://editor.example.com/html',
            'niveau' => 'Beginner friendly',
            'image_badge' => '/images/html-5-svgrepo-com.svg',
        ]);

        Langage::create([
            'nom_langage' => 'CSS',
            'description_langage' => 'Style your HTML with beautiful designs and responsive layouts.',
            'nombre_utilisateurs_termines' => 0,
            'nombre_utilisateurs_commences' => 0,
            'lien_editeur' => 'https://editor.example.com/css',
            'niveau' => 'Beginner friendly',
            'image_badge' => '/images/css-3-svgrepo-com.svg',
        ]);

        Langage::create([
            'nom_langage' => 'JavaScript',
            'description_langage' => 'Make your web pages interactive with the language of the web.',
            'nombre_utilisateurs_termines' => 0,
            'nombre_utilisateurs_commences' => 0,
            'lien_editeur' => 'https://editor.example.com/js',
            'niveau' => 'Intermediate',
            'image_badge' => '/images/javascript-svgrepo-com.svg',
        ]);

        Langage::create([
            'nom_langage' => 'PHP',
            'description_langage' => 'Create dynamic web applications on the server side.',
            'nombre_utilisateurs_termines' => 0,
            'nombre_utilisateurs_commences' => 0,
            'lien_editeur' => 'https://editor.example.com/php',
            'niveau' => 'Intermediate',
            'image_badge' => '/images/php-svgrepo-com.svg',
        ]);

        Langage::create([
            'nom_langage' => 'Python',
            'description_langage' => 'Learn a powerful and easy-to-read programming language used in many fields.',
            'nombre_utilisateurs_termines' => 0,
            'nombre_utilisateurs_commences' => 0,
            'lien_editeur' => 'https://editor.example.com/python',
            'niveau' => 'Beginner friendly',
            'image_badge' => '/images/python-svgrepo-com.svg',
        ]);

        Langage::create([
            'nom_langage' => 'SQL',
            'description_langage' => 'Manage and query databases efficiently using SQL.',
            'nombre_utilisateurs_termines' => 0,
            'nombre_utilisateurs_commences' => 0,
            'lien_editeur' => 'https://editor.example.com/sql',
            'niveau' => 'Beginner friendly',
            'image_badge' => '/images/sql-database-generic-svgrepo-com.svg',
        ]);

        Langage::create([
            'nom_langage' => 'React',
            'description_langage' => 'Build fast and interactive UIs using React.js.',
            'nombre_utilisateurs_termines' => 0,
            'nombre_utilisateurs_commences' => 0,
            'lien_editeur' => 'https://editor.example.com/react',
            'niveau' => 'Intermediate',
            'image_badge' => '/images/react-svgrepo-com.svg',
        ]);

        Langage::create([
            'nom_langage' => 'Laravel',
            'description_langage' => 'Create elegant web applications with the Laravel PHP framework.',
            'nombre_utilisateurs_termines' => 0,
            'nombre_utilisateurs_commences' => 0,
            'lien_editeur' => 'https://editor.example.com/laravel',
            'niveau' => 'Intermediate',
            'image_badge' => '/images/laravel-svgrepo-com.svg',
        ]);
    }
}
