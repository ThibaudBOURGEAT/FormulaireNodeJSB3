//npm install gulp gulp-csso gulp-sass gulp-autoprefixer gulp-load-plugins gulp-rename
// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './app/src/sass'; // dossier de travail
var destination = './app'; // dossier à livrer

gulp.task('css', function () {
  return gulp.src(source + '/style.scss')
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + '/src/css'));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src(destination + '/src/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/dist'));
});

// Tâche "build"
gulp.task('build', ['css']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch(source + '*.scss', ['build']);
});

// Tâche par défaut
gulp.task('default', ['build']);
