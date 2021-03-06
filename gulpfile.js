var gulp = require('gulp');
var del = require( 'del' );
var sass = require('gulp-sass'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require( 'gulp-imagemin' );
var notify = require( 'gulp-notify' );
var sourcemaps = require( 'gulp-sourcemaps' );
var newer = require( 'gulp-newer' );
var ghPages = require('gulp-gh-pages');

var paths = { 
  cleanItems: ['img/','js/','css/','styles/'],
  dataSrc : [ 'data/**/*.xml' ] , 
  indexSrc: 'index.html', 
  imageSrc : [ 'images/**/*' ] , 
  imageDstFldr: 'img', 
  sassSrc : [ 'sass/**/*.scss' ] , 
  stylesSrc: 'styles/**/*.css' , 
  stylesFldr: 'styles', 
  cssDstFldr: 'css', 
  cssprelimNm: 'all.css', 
  cssDstFile: 'all.min.css', 
  scriptsSrc: [ 'scripts/**/*.js' ] , 
  jssrcFold: 'scripts', 
  jsdestFold: 'js', 
  jsprelimNm: 'all.js', 
  jsdestName: 'all.min.js'
}; 

gulp.task( 'watch', function() {
  gulp.watch( paths.indexSrc , ['html']);
  gulp.watch( paths.dataSrc , ['data']);
  gulp.watch( paths.scriptsSrc , ['scripts']);
  gulp.watch( paths.sassSrc , ['styles']);
  gulp.watch( paths.imageSrc , ['imgminify']);
});

gulp.task('connect', function() {
  connect.server( { livereload: true } );
} );

gulp.task('clean', function() {
  return del( paths.cleanItems );
} );

gulp.task( "imgminify" , function() {
  return gulp.src( paths.imageSrc )
    .pipe( newer( paths.imageDstFldr ))
    .pipe( imagemin( { optimizationLevel: 3, progressive: true, interlaced: true } ) )
    .pipe( gulp.dest( paths.imageDstFldr ))
    .pipe( notify( { message: 'Image minify task is complete' } ) );
});

gulp.task('data', function() {
  gulp.src( paths.dataSrc )
    .pipe( connect.reload() )
    .pipe( notify( { message: 'data task complete and reloaded' } ) );
});

gulp.task('html', function() {
  gulp.src( paths.indexSrc )
    .pipe( connect.reload() )
    .pipe( notify( { message: 'html task complete and reloaded' } ) );
});

gulp.task('scripts', function() {
  return gulp.src( paths.scriptsSrc )
    .pipe( sourcemaps.init() )
    .pipe( concat( paths.jsprelimNm ) )
    .pipe( rename( paths.jsdestName ) )
    .pipe( uglify() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( paths.jsdestFold ) )
    .pipe( connect.reload() )
    .pipe( notify( { message: 'Scripts task complete and reloaded' } ) );
});

gulp.task('sass', function() {
  return gulp.src( paths.sassSrc )
    .pipe( sourcemaps.init() )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( autoprefixer( { browsers: ['last 6 versions'], cascade: false } ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( paths.stylesFldr ) )
    .pipe( notify( { message: 'Sass subtask complete' } ) );
});

gulp.task('styles', ['sass'], function() { 
  return gulp.src( paths.stylesSrc )
    .pipe( concat( paths.cssprelimNm ) )
    .pipe( rename( paths.cssDstFile ) )
    .pipe( cssnano() )
    .pipe( gulp.dest( paths.cssDstFldr ) )
    .pipe( connect.reload() )
    .pipe( notify( { message: 'Styles task complete and reloaded' } ) );
});

gulp.task( 'deploy', [ 'scripts', 'styles', 'imgminify' ], function() {
  gulp.src( [ 'js/all.min.js', 'css/all.min.css', 'data/*', 'img/**/*', 'fonts/*', 'index.html', 'favicon.png' ], { base: './' } )
  .pipe( ghPages() );
});

gulp.task('default', [ 'clean' ], function() { 
  gulp.start( 'connect', 'watch', 'scripts', 'styles', 'imgminify' );
});