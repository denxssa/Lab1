const mix = require('laravel-mix');

mix.js('resources/js/app.jsx', 'public/js')
    .react()
    .sass('resources/scss/app.scss', 'public/css')
    .version();
