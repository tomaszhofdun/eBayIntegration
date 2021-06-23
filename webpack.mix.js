const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react("resources/js/app.js", "public/js")
    .sourceMaps()
    // .styles("resources/css/normalize.css", "public/css/normalize.css")
    .sass("resources/sass/app.scss", "public/css");

// mix.styles("resources/css/normalize.css", "public/css/normalize.css");

mix.browserSync({
    proxy: "http://laravelhttps.test",
    port: 4000,
    tunnel: true
});
