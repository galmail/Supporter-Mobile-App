// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var rjs = require('gulp-requirejs');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
	return gulp.src('app/js/*/*.js').pipe(jshint()).pipe(jshint.reporter('default'));
});

// Compile Our Sass
// gulp.task('sass', function() {
// return gulp.src('scss/*.scss')
// .pipe(sass())
// .pipe(gulp.dest('css'));
// });

// Concatenate & Minify JS
// gulp.task('scripts', function() {
// return gulp.src('js/*.js')
// .pipe(concat('all.js'))
// .pipe(gulp.dest('dist'))
// .pipe(rename('all.min.js'))
// .pipe(uglify())
// .pipe(gulp.dest('dist'));
// });

gulp.task('requirejsBuild', function() {
	rjs({
		mainConfigFile : "app/js/main.js",
		baseUrl : "app/js",
		name : "main",
		out : "supporter.js",
		removeCombined : true,
		findNestedDependencies : true,
		include: ['libs/requirejs/require.js']
	}).pipe(gulp.dest('./www/js/'));
	// pipe it to the output DIR
});

gulp.task('clean', function(){
  return gulp.src(['www/*'], {read:false})
  .pipe(clean());
});


gulp.task('html', function(){
  gulp.src('app/index-prod.html')
  .pipe(rename('index.html'))
  .pipe(gulp.dest('www'));
});

var filesToMove = [
        'app/css/**/*.*',
        'app/fonts/**/*.*',
        'app/img/**/*.*'
    ];

gulp.task('assets', function(){
  gulp.src(filesToMove, { base: './app' })
  .pipe(gulp.dest('./www'));
});


// Watch Files For Changes
// gulp.task('watch', function() {
// gulp.watch('js/*.js', ['lint', 'scripts']);
// gulp.watch('scss/*.scss', ['sass']);
// });

// Default Task
gulp.task('default', ['lint', 'requirejsBuild','assets','html']); 