<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chapitre;
use App\Models\Cours;

class CoursSeeder extends Seeder
{
    public function run()
    {
        // Seed les cours pour chaque langage avec leur contenu associé
        $this->seedCoursByLangage(2, $this->getCssContenus()); // CSS
        $this->seedCoursByLangage(1, $this->getHtmlContenus()); // HTML
    }

    private function seedCoursByLangage(int $langageId, array $contenus)
    {
        // Récupère les sous-chapitres (ceux qui ont un parent_id)
        $chapitres = Chapitre::where('langage_id', $langageId)
            ->whereNotNull('parent_id')
            ->get();

        foreach ($chapitres as $chapitre) {
            $titre = $chapitre->titre_chapitre;

            if (isset($contenus[$titre])) {
                foreach ($contenus[$titre] as $index => $texte) {
                    $type = 'texte';
                    $chemin = '';
                    $texte = trim($texte);

                    if (strtolower($texte) === 'editor') {
                        $type = $this->getEditorType($titre, $langageId);
                        $texte = '';
                    } elseif (strtolower($texte) === 'video') {
                        $type = $this->getVideoType($titre, $langageId);
                        $texte = '';
                        $chemin = 'CodeCoon_' . str_replace(' ', '', $titre) . '.mp4';
                    }

                    Cours::create([
                        'type_contenu' => $type,
                        'ordre_contenu' => $index + 1,
                        'texte' => $texte,
                        'chemin' => $chemin,
                        'chapitre_id' => $chapitre->id,
                    ]);
                }
            }
        }
    }

    // Retourne le type d'éditeur à utiliser pour un chapitre CSS donné
    private function getEditorType(string $titre, int $langageId): string
    {
        if ($langageId === 2) {
            return match ($titre) {
                'CSS Selectors' => 'select editor',
                'Text Properties' => 'text editor',
                'CSS Units' => 'unit editor',
                'Color Properties' => 'color editor',
                'Box Model' => 'box editor',
                'Flexbox' => 'flex box editor',
                'Grid Layout' => 'grid editor',
                'Positioning' => 'position editor',
                'Media Queries' => 'media editor',
                'Mobile First Design' => 'mobile editor',
                'Responsive Layouts' => 'responsive editor',
                'Animations and Transitions' => 'animation editor',
                '2D/3D Transformations' => 'transform editor',
                'CSS Filters' => 'filter editor',
                'CSS Variables' => 'variable editor',
                default => 'text editor',
            };
        }

        return 'text editor'; // par défaut pour HTML ou autres
    }

    // Retourne le type de vidéo à utiliser pour un chapitre CSS donné
    private function getVideoType(string $titre, int $langageId): string
    {
        if ($langageId === 2) {
            return match ($titre) {
                'CSS Selectors' => 'select video',
                'Color Properties' => 'color video',
                default => 'video',
            };
        }

        return 'video';
    }

    // Contenus CSS
    private function getCssContenus(): array
    {
        return [
    'CSS Selectors' => [
        'CSS selectors are used to target the HTML elements you want to style. There are tag selectors, class selectors, ID selectors, and combined selectors.',
        'Select elements based on their tag name. Example: `p { color: blue; }` selects all paragraphs.',
        'Select elements based on their `class` attribute. Example: `.highlight { font-weight: bold; }` selects all elements with class "highlight".',
        'Editor',
        'Select a single unique element by its `id` attribute. Example: `#header { background-color: grey; }`.',
        'Selects all elements. Example: `* { margin: 0; padding: 0; }` resets all margins and paddings.',
        'Select elements with specific attributes or attribute values. Example: `input[type="text"] { border: 1px solid black; }`.',
        'Video'
    ],
    'Text Properties' => [
    'Text properties are used to define the appearance of text. These include color, size, font, weight, spacing, and more.',
    'Set the text color using `color`. Example: `p { color: blue; }` changes the text color of all paragraphs to blue.',
    'Set the text size using `font-size`. Example: `h1 { font-size: 32px; }` sets the size of heading text.',
    'Define the font type using `font-family`. Example: `body { font-family: Arial, sans-serif; }` sets the font of the body text.',
    'Make text bold or light using `font-weight`. Example: `.title { font-weight: bold; }` makes elements with class "title" bold.',
    'Make text italic using `font-style`. Example: `em { font-style: italic; }` italicizes emphasized text.',
    'Align text using `text-align`. Example: `p { text-align: center; }` centers all paragraph text.',
    'Control letter spacing using `letter-spacing`. Example: `h2 { letter-spacing: 2px; }` adds space between characters.',
    'Control line spacing using `line-height`. Example: `p { line-height: 1.5; }` increases space between lines.',
    'Transform text using `text-transform`. Example: `h3 { text-transform: uppercase; }` converts text to uppercase.',
    'Add or remove decoration using `text-decoration`. Example: `a { text-decoration: none; }` removes underline from links.',
    'Truncate overflowing text using `text-overflow`. Example: `.box { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }` shows "..." for overflow.',
    'Editor'
    ],

    'CSS Units' => [
    'CSS units can be absolute (`px`) or relative (`em`, `rem`, `%`, `vw`, `vh`). They affect the size of elements.',
    'Use `px` for absolute sizing. Example: `p { font-size: 16px; }` sets the paragraph text size to 16 pixels.',
    'Use `em` for relative sizing based on the parent element. Example: `h2 { font-size: 2em; }` makes the text 2 times the size of its parent.',
    'Use `rem` for relative sizing based on the root element (`html`). Example: `p { font-size: 1.5rem; }` scales based on the root font size.',
    'Use `%` to size elements relative to their parent. Example: `div { width: 50%; }` makes the div half the width of its container.',
    'Use `vw` (viewport width) and `vh` (viewport height) for responsive design. Example: `section { height: 100vh; }` makes the section as tall as the viewport.',
    'Editor'
    ],

   'Color Properties' => [
    'Properties like `color`, `background-color`, and `background-image` define colors and backgrounds.',
    'Use `color` to change the text color. Example: `p { color: red; }` sets the paragraph text to red.',
    'Use `background-color` to set the background color of an element. Example: `div { background-color: lightblue; }` adds a light blue background.',
    'Editor',
    'Use `background-image` to add an image as a background. Example: `body { background-image: url("bg.jpg"); }` sets an image as the page background.',
    'Use `rgba()` or `hsla()` to set colors with transparency. Example: `div { background-color: rgba(0, 0, 0, 0.5); }` adds a semi-transparent black background.',
    'Use `linear-gradient()` for gradient backgrounds. Example: `div { background: linear-gradient(to right, red, yellow); }` creates a horizontal color gradient.',
    'Video'
    ],

    'Box Model' => [
    'The CSS box model includes `margin`, `border`, `padding`, and `content`. It defines the space an element occupies.',
    'Use `margin` to create space outside the element. Example: `div { margin: 10px; }` adds 10px space around the div.',
    'Use `border` to add a border around the element. Example: `p { border: 1px solid black; }` adds a black border.',
    'Use `padding` to create space inside the element, between border and content. Example: `div { padding: 20px; }` adds space inside.',
    'The `content` area is where text and images appear.',
    'Use `box-sizing` to control how width and height are calculated. Example: `* { box-sizing: border-box; }` includes padding and border in the element\'s size.',
    'Editor'
    ],

    'Flexbox' => [
        'Flexbox is a layout system that distributes space between items in a flexible container.',
        'Use `display: flex` to create a flex container. Example: `.container { display: flex; }` arranges children in a row by default.',
        'Control direction with `flex-direction`. Example: `.container { flex-direction: column; }` stacks items vertically.',
        'Align items vertically with `align-items`. Example: `.container { align-items: center; }` centers items on the cross axis.',
        'Distribute space between items with `justify-content`. Example: `.container { justify-content: space-between; }` spaces items evenly.',
        'Use `flex-wrap` to allow items to wrap onto multiple lines. Example: `.container { flex-wrap: wrap; }`.',
        'Editor'
    ],

    'Grid Layout' => [
        'The CSS grid system allows you to create two-dimensional layouts using `grid-template-rows`, `grid-template-columns`, etc.',
        'Create a grid container with `display: grid`. Example: `.grid { display: grid; }`.',
        'Define columns with `grid-template-columns`. Example: `.grid { grid-template-columns: 1fr 2fr 1fr; }` sets three columns with different widths.',
        'Define rows with `grid-template-rows`. Example: `.grid { grid-template-rows: 100px auto 100px; }`.',
        'Place items precisely with `grid-column` and `grid-row`. Example: `.item { grid-column: 1 / 3; }` spans two columns.',
        'Control gaps between grid items with `grid-gap`. Example: `.grid { grid-gap: 10px; }` adds spacing.',
        'Editor'
    ],

        'Positioning' => [
        'Positioning types include `static`, `relative`, `absolute`, and `fixed`. They control the placement of elements on the page.',
        'The default position is `static`. Elements flow normally in the page layout. Example: `div { position: static; }`.',
        'Use `relative` to move an element relative to its normal position. Example: `p { position: relative; top: 10px; }` shifts paragraph down 10px.',
        'Use `absolute` to position an element relative to the nearest positioned ancestor. Example: `.box { position: absolute; top: 0; left: 0; }`.',
        'Use `fixed` to position an element relative to the viewport. It stays in place when scrolling. Example: `nav { position: fixed; top: 0; }`.',
        'Editor'
    ],

    'Media Queries' => [
        'Media queries make a site responsive by applying styles based on screen width: `@media (max-width: 768px)`.',
        'Apply styles only on small screens. Example: `@media (max-width: 600px) { body { background: lightgrey; } }`.',
        'Combine conditions with `and`. Example: `@media (min-width: 600px) and (max-width: 900px) { ... }`.',
        'Use orientation queries: `@media (orientation: portrait) { ... }`.',
        'Editor'
    ],

    'Mobile First Design' => [
        'Mobile-first design means designing for small screens first, then progressively adapting to larger screens.',
        'Start your CSS with base styles for mobile devices.',
        'Add media queries for larger screens to enhance or change styles.',
        'Example: base styles for mobile, then `@media (min-width: 768px)` for tablets and desktops.',
        'Editor'
    ],

    'Responsive Layouts' => [
        'Responsive layouts use fluid grids, media queries, and relative units to adapt to any screen size.',
        'Use percentages or `fr` units instead of fixed pixels for widths.',
        'Combine with media queries to adjust layout on different devices.',
        'Example: `.container { width: 90%; max-width: 1200px; margin: auto; }`.',
        'Editor'
    ],

    'Animations and Transitions' => [
        '`transition` and `@keyframes` animations add dynamic visual effects.',
        'Use `transition` for smooth changes on hover or state change. Example: `button { transition: background-color 0.3s ease; }`.',
        '`@keyframes` defines animation steps. Example: `@keyframes slide { from { left: 0; } to { left: 100px; } }`.',
        'Apply animations with `animation` property. Example: `.box { animation: slide 2s infinite; }`.',
        'Editor'
    ],

    '2D/3D Transformations' => [
        'CSS transformations let you rotate, scale, and translate elements in 2D or 3D space.',
        'Use `transform: rotate(45deg);` to rotate an element.',
        'Use `transform: scale(1.5);` to enlarge.',
        'Use `transform: translateX(100px);` to move horizontally.',
        'Use `transform-style: preserve-3d;` and `perspective` for 3D effects.',
        'Editor'
    ],

    'CSS Filters' => [
        'CSS filters apply graphic effects like `blur()`, `brightness()`, and `contrast()` directly to elements.',
        'Example: `img { filter: blur(5px); }` blurs an image.',
        'Use `brightness(0.5)` to darken and `contrast(200%)` to increase contrast.',
        'Filters can be combined: `filter: blur(2px) brightness(1.2);`.',
        'Editor'
    ],

    'CSS Variables' => [
        'CSS variables, declared with `--variable-name` in `:root`, allow you to reuse values across styles.',
        'Declare variables in `:root` for global scope. Example: `:root { --main-color: #06c; }`.',
        'Use variables with `var()`. Example: `p { color: var(--main-color); }`.',
        'Variables make theme changes easier and keep code DRY.',
        'Editor'
    ]
];
    }

    // Contenus HTML
    private function getHtmlContenus(): array
    {
        return $content = [
    'Basic Tags' => [
        'HTML (HyperText Markup Language) is the standard language used to create the structure of web pages.',
        'A web page is structured using HTML elements enclosed in tags, such as <html>, <head>, <body>, etc.',
        'Common elements include <p> for paragraphs, <a> for links, <div> for sections, and <h1> to <h6> for headings.',
        'Editors like VSCode or Sublime Text help write and manage HTML efficiently.',
        'Video tutorials can help visualize how to use basic tags.',
    ],
    'Comments' => [
        'Comments in HTML allow you to add notes or explanations within the code that are not displayed in the browser.',
        'They are created using <!-- comment --> syntax.',
        'Comments help document your code or temporarily disable parts during development.',
        'Editors highlight comments differently for better readability.',
        'Video demonstrations show how to effectively use comments in projects.',
    ],
    'Character Encoding' => [
        'Character encoding defines how characters are represented in the document.',
        'The <meta charset="UTF-8"> tag specifies the character encoding for the HTML document and ensures correct display of text.',
        'UTF-8 is the most common encoding and supports a wide range of characters including special symbols and emojis.',
        'Setting proper encoding prevents issues with displaying accented or non-Latin characters.',
        'Editors and browsers respect the charset declaration for correct rendering.',
    ],
    'Semantic Tags' => [
        'Semantic HTML5 tags provide meaning to the structure of the web page, improving accessibility and SEO.',
        'Common semantic tags include <header>, <nav>, <main>, <section>, <article>, <footer>.',
        'Using semantic tags helps search engines better understand the content of your pages.',
        'Semantic structure also improves navigation for screen readers and other assistive technologies.',
        'Video examples demonstrate best practices for semantic HTML.',
    ],
    'Form Tags' => [
        'HTML forms allow users to submit data to a server.',
        'The <form> element wraps input controls like <input>, <textarea>, <select>, and buttons.',
        'Example: <form><input type="text" name="name"><input type="submit" value="Send"></form>.',
        'Forms require proper labeling for accessibility.',
        'Video tutorials guide you through creating interactive forms.',
    ],
    'HTML5 Validation' => [
        'HTML5 introduced built-in client-side validation features.',
        'Attributes like required, minlength, maxlength, pattern, and type help validate input fields.',
        'Example: <input type="email" required> ensures the user enters a valid email address.',
        'Browsers automatically display error messages when validation fails.',
        'Validation reduces the need for extra JavaScript for simple checks.',
        'Video guides explain how to leverage HTML5 validation effectively.',
    ],
    'Multi-page Forms' => [
        'Multi-page forms allow users to fill out long forms step by step.',
        'Use the <fieldset> element to group related fields and <legend> for titles.',
        'Example: <form><fieldset><legend>Personal Information</legend><input type="text" name="name"></fieldset></form>.',
        'Navigation buttons like "Next" and "Previous" help users move between form pages.',
        'Video examples show how to create user-friendly multi-page forms.',
    ],
    'Form Accessibility' => [
        'Accessibility ensures that forms are usable by everyone, including people with disabilities.',
        'Use <label> elements to associate text with form controls for screen readers.',
        'Example: <label for="name">Name:</label><input type="text" id="name" name="name">.',
        'Provide clear instructions and error messages to guide users.',
        'Video tutorials demonstrate how to make forms accessible to all users.',
    ],
    'Images'=> [
        'Images enhance the visual appeal of web pages and can convey information effectively.',
        'Use the <img> tag to embed images, specifying the source with the src attribute.',
        'Example: <img src="image.jpg" alt="Description of image">.',
        'The alt attribute provides alternative text for screen readers and when images fail to load.',
        'Video examples show how to optimize images for web use.',
    ],
    'Audio/Video'=> [
        'HTML5 introduced native support for audio and video playback.',
        'Use the <audio> and <video> tags to embed media files directly in web pages.',
        'Example: <video src="video.mp4" controls> plays a video with playback controls.',
        'The controls attribute adds play, pause, and volume controls for user interaction.',
        'Video tutorials demonstrate how to work with audio and video elements effectively.',
    ],
    'Using SVGs' => [
        'SVG (Scalable Vector Graphics) allows you to create vector-based graphics directly in HTML.',
        'Use the <svg> tag to define SVG elements, which can be styled with CSS and manipulated with JavaScript.',
        'Example: <svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"></circle></svg> creates a red circle.',
        'SVGs are resolution-independent and can scale without losing quality.',
        'Video examples show how to create and use SVG graphics in web projects.',
    ],
    'Title and Meta Description Tags' => [
        'The <title> tag defines the title of the web page, displayed in the browser tab and search results.',
        'The <meta name="description" content="Your description here"> tag provides a brief summary of the page content for search engines.',
        'Example: <title>My Web Page</title><meta name="description" content="This is a sample web page.">',
        'Properly set title and description improve SEO and user experience.',
        'Video tutorials explain how to optimize titles and descriptions for better visibility.',
    ],
    'Sitemap and robots.txt'=> [
        'A sitemap is an XML file that lists all the pages of your website, helping search engines index them.',
        'The robots.txt file tells search engines which pages to crawl or ignore.',
        'Example of robots.txt: User-agent: * Disallow: /private/ allows all bots but blocks the /private/ directory.',
        'Sitemaps and robots.txt improve SEO and control how search engines interact with your site.',
        'Video guides show how to create and manage sitemaps and robots.txt files.',
    ],
    // Tu peux ajouter d'autres sections ici comme "HTML Tables", "HTML Links", "HTML Lists", etc.
];


    }
}
