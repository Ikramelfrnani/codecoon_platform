<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Badge;

class BadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $badges = [
            ['name' => 'Markup Master', 'file' => 'HTMLBadge.svg', 'gif' => 'html.gif', 'description' => 'Builds clear, solid page structures.', 'langage_id' => 1],
            ['name' => 'Style Sorcerer', 'file' => 'cssbadge.svg', 'gif' => 'css.gif', 'description' => 'Weaves magic into sleek, captivating designs.', 'langage_id' => 2],
            ['name' => 'Logic Architect', 'file' => 'JSBadge.svg', 'gif' => 'js.gif', 'description' => 'Crafts smooth interactions and animations.', 'langage_id' => 3],
            ['name' => 'Backend Smith', 'file' => 'PHPBadge.svg', 'gif' => 'php.gif', 'description' => 'Forges the strong engine behind apps.', 'langage_id' => 4],
            ['name' => 'Code Whisperer', 'file' => 'pythonbadge.svg', 'gif' => 'python.gif', 'description' => 'Writes elegant scripts that speak to machines.', 'langage_id' => 5],
            ['name' => 'Data Alchemist', 'file' => 'sqlBadge.svg', 'gif' => 'sql.gif', 'description' => 'Turns raw data into valuable insights.', 'langage_id' => 6],
            ['name' => 'Component Crafter', 'file' => 'reactBadge.svg', 'gif' => 'react.gif', 'description' => 'Shapes dynamic, modular interfaces.', 'langage_id' => 7],
            ['name' => 'Artisan Builder', 'file' => 'laravelBadge.svg', 'gif' => 'laravel.gif', 'description' => 'Creates robust, well-crafted applications.', 'langage_id' => 8],
        ];

        foreach ($badges as $badge) {
            // Just store the filename, not the full path
            $finalImagePath = File::exists(public_path("storage/image/{$badge['file']}")) ? $badge['file'] : null;
            $finalGifPath = File::exists(public_path("storage/image/{$badge['gif']}")) ? $badge['gif'] : null;

            Badge::create([
                'nom' => $badge['name'],
                'description' => $badge['description'] ?? null,
                'image' => $finalImagePath, // Now stores just the filename like "cssbadge.svg"
                'gif' => $finalGifPath,     // Now stores just the filename like "css.gif"
                'langage_id' => $badge['langage_id'],
            ]);
        }
    }
}
