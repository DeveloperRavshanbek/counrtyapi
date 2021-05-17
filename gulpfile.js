const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
sass.compiler = require('sass');
const path = {
    html: './src/*.html',
    css: './src/css/*.+(css|scss)',
    js: './src/js/*.js',
    img: './src/img/**/*',
    styleLib: './src/css/lib/*.+(css|scss)'
}
function htmlSrc() {
    return src(path.html)
        .pipe(dest('./dest/'))
}
function cssSrc() {
    return src(path.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dest/css'))
}
function jsSrc() {
    return src(path.js)
        .pipe(dest('./dest/js'))
}
function imgSrc() {
    return src(path.img)
        .pipe(dest('./dest/img'))
}
function handleCssLib() {
    return src(path.styleLib)
        .pipe(dest('./dest/css/lib'))
}
function localServer(cb) {
    browserSync.init({
        server: {
            baseDir: 'dest',
            index: 'index.html'
        }
    })
    cb();
}

function browserReload(cb) {
    browserSync.reload();
    cb();
}


function watchFiles() {
    watch([path.html, path.css, path.js], series(parallel(htmlSrc, cssSrc, jsSrc), browserReload));
    watch([path.styleLib], parallel(handleCssLib, browserReload));
    watch([path.img], parallel(imgSrc, browserReload));

}

exports.serve = series(
    localServer,
    parallel(
        htmlSrc,
        cssSrc,
        jsSrc,
        imgSrc,
        handleCssLib
    ),
    watchFiles,
);
