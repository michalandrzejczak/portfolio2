const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const ignore = require('gulp-ignore');
const runSequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('clean', () =>
    gulp.src('./dist', {
        read: false
    })
    .pipe(clean({
        force: true
    }))
);

gulp.task('buildcss', () => {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist'))
});

gulp.task('htmlmin', () =>
    gulp.src('./src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('copyImages', () =>
    gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'))
);

gulp.task('buildjs', () =>
    gulp.src('./src/js/*.js')
    .pipe(concat('scripts.bundle.js'))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(browserify({
        insertGlobals: true,
        debug: !gulp.env.production
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .on('error', function (e) {
        console.error(e);
        this.emit('end');
    })
);

gulp.task('copyPhp', () =>
    gulp.src('./src/*.php')
    .pipe(gulp.dest('dist'))
);

gulp.task('build', () =>
    runSequence(
        'buildcss',
        'htmlmin',
        'buildjs',
        'copyImages',
        'copyPhp',
    )
);

gulp.task('watch', () => {
    gulp.watch('./src/sass/*/**', ['buildcss']);
    gulp.watch('./src/*.html', ['htmlmin']);
    gulp.watch('./src/js/*', ['buildjs']);
    gulp.watch('./src/img/*', ['copyImages']);
    gulp.watch('./src/*.php', ['copyPhp']);
});

gulp.task('default', ['build', 'watch']);