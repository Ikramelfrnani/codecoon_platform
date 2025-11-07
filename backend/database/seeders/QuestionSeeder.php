<?php

namespace Database\Seeders;

// database/seeders/QuestionSeeder.php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionSeeder extends Seeder
{
    public function run()
    {
        $questions = [
            // Quiz 1: CSS Selectors
            [
                'quiz_id' => 1,
                'ordre' => 1,
                'texte' => 'Style only the second box so it has: background color #8E44AD, white text, centered text, font size 2rem, and uppercase text.',
                'question_type' => 'practice',
                'initial_code' => ".box { width: 100px; height: 100px; background-color: blue; }",
                'expected_output' => "#box2 { width: 100px; height: 100px; background-color: #8E44AD; color: white; text-align: center; font-size: 2rem; text-transform: uppercase; }",
                'code_language' => 'css'
            ],

            // Quiz 2: Positioning and Flexbox
            [
                'quiz_id' => 2,
                'ordre' => 1,
                'texte' => 'Center horizontally the boxes inside their container, make them appear in reversed order with a 2rem gap',
                'question_type' => 'practice',
                'initial_code' => '.box { width: 100px; height: 100px; background-color: pink; } .challenge-area{ display: block; }',
                'expected_output' => '.box { width: 100px; height: 100px; background-color: pink; } .challenge-area{ display: flex; justify-content: center; flex-direction: row-reverse; gap: 2rem; }',
                'code_language' => 'css'
            ],

            // Quiz 3: Media Queries
            [
                'quiz_id' => 3,
                'ordre' => 1,
                'texte' => 'When the screen width is less than 600px, stack the boxes vertically and center them in the middle of the page.',
                'question_type' => 'practice',
                'initial_code' => '.challenge-area{
                            display: flex;
                            justify-content: center;
                            gap: 1rem;
                            }
                            .box{
                                background-color: blueviolet;
                                width: 100px;
                                height: 100px;
                            }',
                'expected_output' => '.challenge-area{
                                        display: flex;
                                        justify-content: center;
                                        gap: 1rem;
                                    }
                                    .box{
                                        background-color: blueviolet;
                                        width: 100px;
                                        height: 100px;
                                    }

                                    @media only screen and (max-width: 600px) {
                                        .challenge-area {
                                            align-items: center;
                                            flex-direction: column;
                                        }
                                    }',
                'code_language' => 'css'
            ],

            // Quiz 4: Advanced CSS
            [
                'quiz_id' => 4,
                'ordre' => 1,
                'texte' => 'Add a background color using the CSS variable, apply a 0.5s ease transition for smooth animation, and make each box rotate 180 degrees in 3D space (with a 600px perspective) when hovered.',
                'question_type' => 'practice',
                'initial_code' => ':root {
                    --main-color: #00bfff;
                    }
                    .challenge-area{
                        display: flex;
                        flex-direction: column;
                        justify-content:center;
                        align-items: center;
                        gap: 1rem;
                    }

                    .box {
                        width: 100px;
                        height: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 12px;
                    }',
                'expected_output' => ':root {
                    --main-color: #00bfff;
                    }
                    .challenge-area{
                        display: flex;
                        flex-direction: column;
                        justify-content:center;
                        align-items: center;
                        gap: 1rem;
                    }

                    .box {
                        width: 100px;
                        height: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 12px;
                        background-color: var(--main-color);
                        transition: transform 0.5s ease;
                        transform: perspective(600px) rotateY(0deg);
                    }

                    .box:hover {
                        transform: perspective(600px) rotateY(180deg);
                    }',
                'code_language' => 'css'
            ],
            // Global Quiz: CSS
            [
                'quiz_id' => 5,
                'ordre' => 1,
                'texte' => 'Which unit is relative to the font size of the element?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 5,
                'ordre' => 2,
                'texte' => 'What does the z-index property control?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 5,
                'ordre' => 3,
                'texte' => 'Style the button so that it has a blue background, white text, 10px padding, and rounded corners (8px).When hovered, it should turn dark blue',
                'question_type' => 'practice',
                'initial_code' => '<button>Click Me</button>',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 5,
                'ordre' => 4,
                'texte' => 'How do you horizontally center a block-level element (e.g., a div) in CSS?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 5,
                'ordre' => 5,
                'texte' => 'Which property is used to add space inside an element, between the content and its border?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 5,
                'ordre' => 6,
                'texte' => ' Which CSS property changes the space between letters?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 5,
                'ordre' => 7,
                'texte' => 'The box should be 100px by 100px, colored red. Make it smoothly move 50px to the right over 2 seconds when hovered.',
                'question_type' => 'practice',
                'initial_code' => '<div class="box"></div>',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 5,
                'ordre' => 8,
                'texte' => 'What is the default value of the position property?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 5,
                'ordre' => 9,
                'texte' => 'Which selector targets all <p> elements inside a <div>?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 5,
                'ordre' => 10,
                'texte' => 'How do you define a CSS variable?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],

            // Html quizzes

            [
                'quiz_id' => 6,
                'ordre' => 1,
                'texte' => 'Style only the second box so it has: background color #8E44AD, white text, centered text, font size 2rem, and uppercase text.',
                'question_type' => 'practice',
                'initial_code' => ".box { width: 100px; height: 100px; background-color: blue; }",
                'expected_output' => "#box2 { width: 100px; height: 100px; background-color: #8E44AD; color: white; text-align: center; font-size: 2rem; text-transform: uppercase; }",
                'code_language' => 'css'
            ],

            // Quiz 2: Positioning and Flexbox
            [
                'quiz_id' => 7,
                'ordre' => 1,
                'texte' => 'Center horizontally the boxes inside their container, make them appear in reversed order with a 2rem gap',
                'question_type' => 'practice',
                'initial_code' => '.box { width: 100px; height: 100px; background-color: pink; } .challenge-area{ display: block; }',
                'expected_output' => '.box { width: 100px; height: 100px; background-color: pink; } .challenge-area{ display: flex; justify-content: center; flex-direction: row-reverse; gap: 2rem; }',
                'code_language' => 'css'
            ],

            // Quiz 3: Media Queries
            [
                'quiz_id' => 8,
                'ordre' => 1,
                'texte' => 'When the screen width is less than 600px, stack the boxes vertically and center them in the middle of the page.',
                'question_type' => 'practice',
                'initial_code' => '.challenge-area{
                            display: flex;
                            justify-content: center;
                            gap: 1rem;
                            }
                            .box{
                                background-color: blueviolet;
                                width: 100px;
                                height: 100px;
                            }',
                'expected_output' => '.challenge-area{
                                        display: flex;
                                        justify-content: center;
                                        gap: 1rem;
                                    }
                                    .box{
                                        background-color: blueviolet;
                                        width: 100px;
                                        height: 100px;
                                    }

                                    @media only screen and (max-width: 600px) {
                                        .challenge-area {
                                            align-items: center;
                                            flex-direction: column;
                                        }
                                    }',
                'code_language' => 'css'
            ],

            // Quiz 4: Advanced CSS
            [
                'quiz_id' => 9,
                'ordre' => 1,
                'texte' => 'Add a background color using the CSS variable, apply a 0.5s ease transition for smooth animation, and make each box rotate 180 degrees in 3D space (with a 600px perspective) when hovered.',
                'question_type' => 'practice',
                'initial_code' => ':root {
                    --main-color: #00bfff;
                    }
                    .challenge-area{
                        display: flex;
                        flex-direction: column;
                        justify-content:center;
                        align-items: center;
                        gap: 1rem;
                    }

                    .box {
                        width: 100px;
                        height: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 12px;
                    }',
                'expected_output' => ':root {
                    --main-color: #00bfff;
                    }
                    .challenge-area{
                        display: flex;
                        flex-direction: column;
                        justify-content:center;
                        align-items: center;
                        gap: 1rem;
                    }

                    .box {
                        width: 100px;
                        height: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 12px;
                        background-color: var(--main-color);
                        transition: transform 0.5s ease;
                        transform: perspective(600px) rotateY(0deg);
                    }

                    .box:hover {
                        transform: perspective(600px) rotateY(180deg);
                    }',
                'code_language' => 'css'
            ],
            // Global Quiz: CSS
            [
                'quiz_id' => 10,
                'ordre' => 1,
                'texte' => 'Which unit is relative to the font size of the element?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 10,
                'ordre' => 2,
                'texte' => 'What does the z-index property control?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 10,
                'ordre' => 3,
                'texte' => 'Style the button so that it has a blue background, white text, 10px padding, and rounded corners (8px).When hovered, it should turn dark blue',
                'question_type' => 'practice',
                'initial_code' => '<button>Click Me</button>',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 10,
                'ordre' => 4,
                'texte' => 'How do you horizontally center a block-level element (e.g., a div) in CSS?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 10,
                'ordre' => 5,
                'texte' => 'Which property is used to add space inside an element, between the content and its border?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 10,
                'ordre' => 6,
                'texte' => ' Which CSS property changes the space between letters?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 10,
                'ordre' => 7,
                'texte' => 'The box should be 100px by 100px, colored red. Make it smoothly move 50px to the right over 2 seconds when hovered.',
                'question_type' => 'practice',
                'initial_code' => '<div class="box"></div>',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 10,
                'ordre' => 8,
                'texte' => 'What is the default value of the position property?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 10,
                'ordre' => 9,
                'texte' => 'Which selector targets all <p> elements inside a <div>?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
            [
                'quiz_id' => 10,
                'ordre' => 10,
                'texte' => 'How do you define a CSS variable?',
                'question_type' => 'select_choice',
                'initial_code' => '',
                'expected_output' => '',
                'code_language' => 'css'
            ],
        ];

        foreach ($questions as &$q) {
            $q['created_at'] = now();
            $q['updated_at'] = now();
        }

        DB::table('questions')->insert($questions);
    }
}