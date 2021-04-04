const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

mix.js('resources/js/register.js', 'public/js')
    .sass('resources/sass/register.scss', 'public/css');

mix.sass('resources/sass/alpaca.scss', 'public/css');

mix.js('resources/js/home.js', 'public/js').
    sass('resources/sass/home.scss', 'public/css');

mix.js('resources/js/create-alpaca-form.js', 'public/js').
    sass('resources/sass/create-alpaca-form.scss', 'public/css');

mix.js('resources/js/create-alpaca.js', 'public/js').
    sass('resources/sass/create-alpaca.scss', 'public/css');

mix.js('resources/js/action-form.js', 'public/js').
    sass('resources/sass/action-form.scss', 'public/css');

mix.js('resources/js/alpaca-home.js', 'public/js').
    sass('resources/sass/alpaca-home.scss', 'public/css');
