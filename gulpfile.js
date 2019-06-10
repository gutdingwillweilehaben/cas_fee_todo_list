// Include gulp
const gulp = require('gulp');

// Include plugins
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const cleanCSS = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');
const critical = require('critical').stream;

// Gulp Task Source Map disabled -> enlarge the CSS file twice when active
const sourcemaps = require('gulp-sourcemaps');



// Delete the Private folder in order to rebuild it from scratch later
gulp.task('clean', () => {
    return gulp.src('Public', {read: false})
        .pipe(clean());
});


// Copy files and folders from Private to Public
gulp.task('copy', () => {
    gulp
    .src([
            'Private/assets/img/**/*',
            'Private/assets/js/**/*',
            'Private/assets/css/*'
    ], {
        base: 'Private/'
    })
    .pipe(gulp.dest('Public'));
});



// Creates a CSS file from scss files,
// Creates a source map to display the SCSS file name in the dev tools next to styles section,
// Gulp Task Source Map disabled -> enlarge the CSS file to double when active
gulp.task('sass', function () {
    return gulp.src('Private/assets/scss/**/*.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('Public/assets/css'));
});


// Adds relevant prefixes to the CSS file,
// Minify CSS
gulp.task('css', function () {
    return gulp.src('Public/assets/css/styles.css')
            .pipe(autoprefixer())
            .pipe(cleanCSS())
        .pipe(gulp.dest('Public/assets/css'));
});


// Autoprefix
gulp.task('autoprefix', () =>
    gulp.src('Public/assets/css/styles.css')
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
);

// Tiny static page generator
// Include partial files into templates and replacing placeholder "variables"
gulp.task('fileinclude', function() {
    gulp.src(['Private/templates/*'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./Public/templates'));
});


// Generate & Inline Critical-path CSS (Above the fold, Optimize CSS Delivery)
gulp.task('critical', function () {
    return gulp.src('Public/templates/*.html')
        .pipe(critical({base: 'Public/', inline: true, css: ['Public/assets/css/styles.css']}))
        .pipe(gulp.dest('Public/templates'));
});


gulp.task('default', function(callback) {
    runSequence(
        'clean',
        'sass',
        'css',
        'copy',
        'fileinclude',
        callback);
});



gulp.task('build', function(callback) {
    runSequence(
        'clean',
        'sass',
        'css',
        'copy',
        'fileinclude',
    callback);
});



gulp.task('watch', () => {
    gulp.watch('Private/assets/scss/**/*.scss', ['sass']);
    gulp.watch('Private/**/*', ['fileinclude', 'copy']);
});
