<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReponseSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('reponses')->insert([
            //question5
            [
                'question_id' => 5,
                'texte' => 'px',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 5,
                'texte' => 'em',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 5,
                'texte' => 'cm',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question6
            [
                'question_id' => 6,
                'texte' => 'Element height',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 6,
                'texte' => 'Stacking order',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 6,
                'texte' => 'Box shadow',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question7
            [
                'question_id' => 7,
                'texte' => 'button {
                                background-color: blue;
                                color: white;
                                padding: 10px;
                                border-radius: 8px;
                            }
                            button:hover {
                                background-color: darkblue;
                            }',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question8
            [
                'question_id' => 8,
                'texte' => 'align: center;',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 8,
                'texte' => 'margin: 0 auto;',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 8,
                'texte' => 'position: center;',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question9
            [
                'question_id' => 9,
                'texte' => 'margin',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 9,
                'texte' => 'border-spacing',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 9,
                'texte' => 'padding',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question10
            [
                'question_id' => 10,
                'texte' => 'letter-spacing',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 10,
                'texte' => 'line-height',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 10,
                'texte' => 'word-spacing',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question11
            [
                'question_id' => 11,
                'texte' => '.box {
                                width: 100px;
                                height: 100px;
                                background-color: red;
                                transition: transform 2s ease;
                            }
                            .box:hover {
                                transform: translateX(50px);
                            }',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question12
            [
                'question_id' => 12,
                'texte' => 'relative',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 12,
                'texte' => 'static',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 12,
                'texte' => 'absolute',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question13
            [
                'question_id' => 13,
                'texte' => 'div > p',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 13,
                'texte' => 'div p',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 13,
                'texte' => 'div + p',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question14
            [
                'question_id' => 14,
                'texte' => '$main-color: blue;',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 14,
                'texte' => 'var: --main-color;',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 14,
                'texte' => '--main-color: blue;',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            //html
            //question5
            [
                'question_id' => 19,
                'texte' => 'px',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 19,
                'texte' => 'em',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 19,
                'texte' => 'cm',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question6
            [
                'question_id' => 20,
                'texte' => 'Element height',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 20,
                'texte' => 'Stacking order',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 20,
                'texte' => 'Box shadow',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question7
            [
                'question_id' => 21,
                'texte' => 'button {
                                background-color: blue;
                                color: white;
                                padding: 10px;
                                border-radius: 8px;
                            }
                            button:hover {
                                background-color: darkblue;
                            }',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question8
            [
                'question_id' => 22,
                'texte' => 'align: center;',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 22,
                'texte' => 'margin: 0 auto;',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 22,
                'texte' => 'position: center;',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question9
            [
                'question_id' => 23,
                'texte' => 'margin',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 23,
                'texte' => 'border-spacing',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 23,
                'texte' => 'padding',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question10
            [
                'question_id' => 24,
                'texte' => 'letter-spacing',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 24,
                'texte' => 'line-height',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 24,
                'texte' => 'word-spacing',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question11
            [
                'question_id' => 25,
                'texte' => '.box {
                                width: 100px;
                                height: 100px;
                                background-color: red;
                                transition: transform 2s ease;
                            }
                            .box:hover {
                                transform: translateX(50px);
                            }',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question12
            [
                'question_id' => 26,
                'texte' => 'relative',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 26,
                'texte' => 'static',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 26,
                'texte' => 'absolute',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question13
            [
                'question_id' => 27,
                'texte' => 'div > p',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 27,
                'texte' => 'div p',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 27,
                'texte' => 'div + p',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            //question14
            [
                'question_id' => 28,
                'texte' => '$main-color: blue;',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 28,
                'texte' => 'var: --main-color;',
                'est_correct' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'question_id' => 28,
                'texte' => '--main-color: blue;',
                'est_correct' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
