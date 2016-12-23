const gulp = require('gulp'),
      sass = require('gulp-sass'),
      pug = require('gulp-pug'),
      imagemin = require('gulp-imagemin'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync').create();

// compilacions de sass a css
gulp.task('sass', () =>
    gulp.src('./Components/Scss/*.scss')
        .pipe(sass({
            outputStyle: 'expended',
            sourceComments: false
        }))
        .pipe(autoprefixer({
            version: ['last 2 browsers']
        }))
        .pipe(gulp.dest('./dest/css'))
        .pipe(browserSync.stream())
    );

// compilacion gulp a html
gulp.task('pug', () =>
    gulp.src('./Components/Pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dest'))
        .on('end', browserSync.reload)
    );

// optimizar imagenes
gulp.task('imagemin', () =>
    gulp.src('./dest/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dest/imageopt'))
);


// servido que mostrara los cambios
gulp.task('default',() => {
    browserSync.init({
        server:'./dest'
    });

    gulp.watch('Components/Scss/**/*.scss',['sass']);
    gulp.watch('Components/Pug/**/*.pug',['pug']);
    gulp.watch('dest/images/**/*',['imagemin']);

})









