// Include gulp
let {series, parallel, watch, src, dest} = require('gulp');


// Include Our Plugins
let eslint = require('gulp-eslint');
let fs = require('fs');
let header = require('gulp-header');
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let concatCss = require('gulp-concat-css');
let uglify = require('gulp-uglify');
let templateCache = require('gulp-angular-templatecache');
let addStream = require('add-stream');

let directories = {
   assets: 'dist/positioning/assets',
   source: 'source',
   resources: 'resources',
   outresources: 'dist/positioning/resources',
   views: 'views',
   outbower: 'dist/positioning/bower_components'
};

// Lint Task
function lint() {
   return src(directories.source + '/**/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
}
exports.lint = lint;

function resources() {
   return src(directories.resources + '/**/*')
      .pipe(dest(directories.outresources));
}
exports.resources = resources;

function views() {
   return src(directories.views + '/**/*')
      .pipe(dest('dist'))
}
exports.views = views;

//Concatenate & Minify JS
function commonScripts() {
   return prepareScripts('common');
}
exports.commonScripts = commonScripts;

function positioningScripts() {
   return prepareScripts('positioning');
}
exports.positioningScripts = positioningScripts;


//Concatenate & Minify JS
function squash(cb) {
   cb();
}
exports.squash = squash; // ['squashCommon','squashIcsm', 'squashWater', 'squashStart', 'squashImagery', 'squashPositioning']);

function squashCommon() {
   return src(directories.assets + '/common.js')
      .pipe(babel({
         compact: true,
         comments: false,
         presets: ['es2015'],
         plugins: ["syntax-async-generators"]
      }))
      .pipe(uglify())
      .pipe(header(fs.readFileSync(directories.source + '/licence.txt', 'utf8')))
      .pipe(dest(directories.assets + "/min"));
}
exports.squashCommon = squashCommon;

function squashPositioning() {
   return squashJs('positioning')
}
exports.squashPositioning = squashPositioning;

// Watch Files For Changes
function watchFiles() {
   let ignore = { ignoreInitial: false };
   // We watch both JS and HTML files.
   watch(directories.source + '/**/*(*.js|*.html)', ignore, lint);
   watch(directories.source + '/common/**/*(*.js|*.html)', ignore, series(commonScripts, squashCommon));
   watch(directories.source + '/positioning/**/*(*.js|*.html)', ignore, series(positioningScripts, squashPositioning));
   watch(directories.source + '/**/*.css', ignore, catCss);
//   watch(directories.assets + '/common.js', ignore, squashCommon);
   watch(directories.views + '/*', ignore, views);
   watch(directories.resources + '/**/*', ignore, resources);
}
exports.default = series(resources, views, package, watchFiles);

function catCss() {
   return src(directories.source + '/**/*.css')
      .pipe(concatCss("positioning.css"))
      .pipe(dest(directories.assets));
}
exports.catCss = catCss;

function package() {
   return src('package.json')
      .pipe(dest(directories.assets));
}
exports.package = package;

// Private functions
function squashJs(name) {
   return src(directories.assets + '/' + name + '.js')
      .pipe(uglify())
      .pipe(dest(directories.assets + "/min"));
}

function prepareScripts(name) {
   return src(directories.source + '/' + name + '/**/*.js')
      .pipe(babel({
         compact: false,
         comments: true,
         presets: ['es2015'],
         plugins: ["syntax-async-generators", "transform-regenerator"]
      }))
      .pipe(addStream.obj(prepareNamedTemplates(name)))
      .pipe(concat(name + '.js'))
      .pipe(header(fs.readFileSync(directories.source + '/licence.txt', 'utf8')))
      .pipe(dest(directories.assets));
}

function prepareNamedTemplates(name) {
   return src(directories.source + '/' + name + '/**/*.html')
      .pipe(templateCache({ module: name + ".templates", root: name, standalone: true }));
}