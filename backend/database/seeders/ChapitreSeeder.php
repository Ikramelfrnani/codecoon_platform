<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Chapitre;

class ChapitreSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('chapitres')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $structure = [
            // HTML
            1 => [
                'HTML Structure' => [
                    ['Basic Tags', 'Tags like <html>, <head>, <body>, <p>, <div>'],
                    ['Comments', 'Using <!-- comment -->'],
                    ['Character Encoding', 'Tag <meta charset="UTF-8">'],
                    ['Semantic Tags', 'Using <header>, <footer>, <section>, <article>'],
                ],
                'HTML Forms' => [
                    ['Form Tags', 'form, input, label, textarea, button'],
                    ['HTML5 Validation', 'required, pattern, type=email, etc.'],
                    ['Multi-page Forms', 'Using <fieldset>, <legend>'],
                    ['Form Accessibility', 'Labels and ARIA attributes'],
                ],
                'HTML Media' => [
                    ['Images', 'Tag <img> and its attributes'],
                    ['Audio/Video', 'Tags <audio>, <video>, supported formats'],
                    ['Using SVGs', 'Tag <svg> for vector display'],
                ],
                'SEO HTML' => [
                    ['Title and Meta Description Tags', 'Improve SEO with <title>, <meta>'],
                    ['Sitemap and robots.txt', 'Managing search engines'],
                ],
            ],

            // CSS
            2 => [
                'CSS Fundamentals' => [
                    ['CSS Selectors', 'Types of selectors (class, id, element, combined)'],
                    ['Text Properties', 'color, font-size, font-family, etc.'],
                    ['CSS Units', 'px, em, rem, %, vw, vh'],
                    ['Color Properties', 'color, background-color, gradients'],
                ],
                'Layout' => [
                    ['Box Model', 'margin, border, padding, content'],
                    ['Flexbox', 'display:flex, justify-content, align-items'],
                    ['Grid Layout', 'grid-template, rows, columns'],
                    ['Positioning', 'static, relative, absolute, fixed'],
                ],
                'Responsive Design' => [
                    ['Media Queries', '@media screen and (max-width: 600px)'],
                    ['Mobile First Design', 'Approach and best practices'],
                    ['Responsive Layouts', 'Techniques for fluid layouts'],
                ],
                'Advanced CSS' => [
                    ['Animations and Transitions', 'Using @keyframes and transition'],
                    ['2D/3D Transformations', 'rotate, scale, translate'],
                    ['CSS Filters', 'blur(), brightness(), contrast()'],
                    ['CSS Variables', 'Defining global variables with :root'],
                ],
            ],

            // JavaScript
            3 => [
                'JavaScript Basics' => [
                    ['Variables & Types', 'let, const, primitive types'],
                    ['Conditions & Loops', 'if, else, switch, for, while'],
                    ['Operators', 'Arithmetic, logical, and comparison operators'],
                    ['Arrays and Objects', 'Creating and manipulating arrays and objects'],
                ],
                'Functions & Objects' => [
                    ['Function Declaration', 'function, arrow functions'],
                    ['Objects and Arrays', 'Creation, access, methods'],
                    ['Callback Functions', 'Using callback functions'],
                ],
                'DOM & Events' => [
                    ['DOM Manipulation', 'getElementById, querySelector, etc.'],
                    ['Event Handling', 'click, change, keypress'],
                    ['Creating and Removing Elements', 'appendChild, removeChild'],
                    ['Event Propagation', 'Bubbling and capturing'],
                ],
                'Asynchronous' => [
                    ['Promises', 'then, catch'],
                    ['Async/Await', 'Modern waiting structure'],
                    ['AJAX Requests with fetch', 'Sending HTTP requests with fetch()'],
                    ['WebSockets', 'Real-time communication with WebSockets'],
                ],
                'ES6 and Beyond' => [
                    ['Destructuring', 'Extracting data from objects and arrays'],
                    ['ES6 Modules', 'import, export'],
                    ['ES6 Classes', 'Class syntax and inheritance'],
                    ['Template Literals', 'String interpolation with backticks'],
                ],
            ],

            // PHP
            4 => [
                'PHP Syntax' => [
                    ['Variables and Types', 'string, int, float, bool, array'],
                    ['Control Structures', 'if, switch, while, for'],
                    ['Operators', 'Arithmetic, logical operators, etc.'],
                ],
                'Functions & Forms' => [
                    ['PHP Functions', 'Defining and calling functions'],
                    ['Form Handling', 'GET/POST methods, $_POST'],
                    ['Data Validation', 'Using filter_var() and other functions'],
                ],
                'Sessions & Databases' => [
                    ['Sessions & Cookies', '$_SESSION, setcookie'],
                    ['MySQL Connection', 'mysqli_connect, SQL queries'],
                    ['Prepared Queries', 'Preparing queries to prevent SQL injections'],
                ],
                'OOP in PHP' => [
                    ['Classes & Objects', 'class, new, this'],
                    ['Inheritance & Encapsulation', 'extends, private, public'],
                    ['Interfaces & Traits', 'Interfaces, traits for multiple inheritance'],
                    ['Autoloading', 'Using autoload in PHP'],
                ],
                'Error Handling & Logging' => [
                    ['Error Handling', 'try, catch, custom exceptions'],
                    ['Logging', 'Using Monolog for logging'],
                ],
            ],

            // Python
            5 => [
                'Python Fundamentals' => [
                    ['Data Types', 'int, float, str, list, dict'],
                    ['Conditions & Loops', 'if, elif, else, for, while'],
                    ['Operators', 'Arithmetic and logical operators'],
                    ['Lists and Dictionaries', 'Manipulating lists and dictionaries'],
                ],
                'Functions & Modules' => [
                    ['Defining Functions', 'def, return'],
                    ['Python Modules', 'Importing standard modules'],
                    ['Lambda Functions', 'Anonymous functions with lambda'],
                ],
                'Files & Exceptions' => [
                    ['File I/O', 'open(), read(), write()'],
                    ['Error Handling', 'try, except, finally'],
                    ['Context Manager', 'Using with to manage files'],
                ],
                'OOP in Python' => [
                    ['Classes & Objects', 'class, __init__, self'],
                    ['Inheritance', 'super(), simple inheritance'],
                    ['Polymorphism & Abstraction', 'Abstract methods and polymorphism'],
                ],
                'Advanced Python' => [
                    ['Decorators', 'Dynamically modifying functions'],
                    ['List Comprehensions', 'Lists, dictionaries, sets in one line'],
                    ['Memory Management', 'Managing memory in Python'],
                ],
            ],

            // SQL
            6 => [
                'Basic Queries' => [
                    ['SELECT', 'Queries to read data'],
                    ['WHERE', 'Filtering results'],
                    ['ORDER BY', 'Sorting results'],
                    ['GROUP BY', 'Grouping data'],
                ],
                'Data Modifications' => [
                    ['INSERT & UPDATE', 'Adding and modifying rows'],
                    ['DELETE', 'Deleting data'],
                    ['MERGE', 'Insert and update in one operation'],
                ],
                'Advanced SQL' => [
                    ['JOINS', 'INNER, LEFT, RIGHT JOIN'],
                    ['Subqueries', 'Subqueries in SELECT and WHERE'],
                    ['Indexing', 'Creating and optimizing indexes'],
                    ['Transactions', 'Commit, rollback, managing transactions'],
                ],
                'Advanced SQL (Continued)' => [ // Changed the second "Advanced SQL" to avoid duplication
                    ['Triggers', 'Automatic triggers'],
                    ['Views', 'Creating and using SQL views'],
                    ['Stored Procedures', 'Creating and calling stored procedures'],
                ],
            ],

            // React
            7 => [
                'React Basics' => [
                    ['JSX', 'HTML-like component syntax in JavaScript'],
                    ['Functional Components', 'Creating components with functions'],
                    ['Props and State', 'Passing data via props and managing state with state'],
                ],
                'React Hooks' => [
                    ['useState', 'Local state hook'],
                    ['useEffect', 'Effect hook for side effects'],
                    ['useContext', 'Sharing data between components'],
                    ['useReducer', 'Managing complex state'],
                ],
                'Navigation & Forms' => [
                    ['React Router', 'Navigation between pages'],
                    ['React Forms', 'Controlled components and validation'],
                    ['Form Error Handling', 'Validation and error handling'],
                ],
                'State Management' => [
                    ['Context API', 'Passing global data'],
                    ['Redux', 'Global state with actions/reducers'],
                    ['Redux Middleware', 'Handling side-effects with redux-thunk'],
                ],
            ],

            // Laravel
            8 => [
                'Laravel Structure' => [
                    ['Routes', 'web.php, api.php, parameters'],
                    ['Controllers', 'Creating with artisan, routing logic'],
                    ['Middlewares', 'Using middleware to filter requests'],
                ],
                'Database' => [
                    ['Migrations', 'Creating tables'],
                    ['Eloquent ORM', 'hasOne, belongsTo relationships, etc.'],
                    ['Seeders and Factories', 'Creating mock data for testing'],
                ],
                'Frontend in Laravel' => [
                    ['Blade Templates', 'Blade syntax, extends, section'],
                    ['Blade Components', 'Reuse with <x-component>'],
                    ['Laravel Mix', 'Asset management for the frontend'],
                ],
                'Security & Auth' => [
                    ['Middleware', 'Route filtering'],
                    ['Authentication', 'Jetstream, Breeze, Guards'],
                    ['Protection Against CSRF & XSS Attacks', 'Securing forms'],
                ],
                'RESTful API' => [
                    ['API Routes', 'api.php'],
                    ['API Controllers', 'return response()->json(...)'],
                    ['API Authentication with Sanctum', 'Token-based authentication'],
                ],
            ],
        ];

        // Insertion into the database
        foreach ($structure as $langage_id => $chapitres) {
            foreach ($chapitres as $chapitreTitre => $sousChapitres) {
                $parent = Chapitre::create([
                    'titre_chapitre' => $chapitreTitre,
                    'description_chapitre' => 'Parent Chapter: ' . $chapitreTitre,
                    'langage_id' => $langage_id,
                    'parent_id' => null,
                ]);

                foreach ($sousChapitres as [$titre, $desc]) {
                    Chapitre::create([
                        'titre_chapitre' => $titre,
                        'description_chapitre' => $desc,
                        'langage_id' => $langage_id,
                        'parent_id' => $parent->id,
                    ]);
                }
            }
        }
    }
}
