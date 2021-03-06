/**
 * gulp task
 *
 * @author    アルム＝バンド
 * @copyright Copyright (c) アルム＝バンド
 */
const gulp = require("gulp"),
      watch = require("gulp-watch"),
      plumber = require("gulp-plumber"),
      notify = require("gulp-notify"),
      uglify = require("gulp-uglify"),
      rename = require("gulp-rename"),
      concat = require("gulp-concat"),
      fs = require("fs"),
      browserSync = require("browser-sync")
const dir = {
    assets: {
        jscookie   : './node_modules/js-cookie'
    },
    src: {
        js         : './src/js',
        public     : './public/'
    },
    dist: {
        html       : './docs',
        dist       : './dist',
        js         : './docs/js'
    }
}
const filename = 'the9kbpizzatoast'

gulp.task("js.concat", () => {
    return gulp.src([`${dir.assets.jscookie}/src/js.cookie.js`, `${dir.src.js}/${filename}.js`])
        .pipe(plumber())
        .pipe(concat(`${filename}.js`))
        .pipe(gulp.dest(`${dir.src.js}/concat/`))
})
gulp.task("js", gulp.series(gulp.parallel("js.concat"), () => {
    return gulp.src(`${dir.src.js}/concat/${filename}.js`)
        .pipe(plumber())
        .pipe(uglify({output: {comments: "some"}}))
        .pipe(rename(`${dir.dist.js}/${filename}.min.js`))  // 出力するファイル名を変更
        .pipe(gulp.dest("./"))
}))

gulp.task("public.copy", () => {
    return gulp.src(
        [`${dir.src.public}/**/*`]
    )
    .pipe(plumber())
    .pipe(gulp.dest(dir.dist.html))
})

gulp.task("js.copy", () => {
    return gulp.src(
        [`${dir.dist.js}/${filename}.min.js`]
    )
    .pipe(plumber())
    .pipe(gulp.dest(dir.dist.dist))
})

gulp.task("browsersync", () => {
    browserSync({
        server: {
            baseDir: dir.dist.html
        },
        open: 'external',
        https: true
    })

    watch(`${dir.src.public}/**/*`, gulp.series("public.copy", browserSync.reload))
    watch(`${dir.src.js}/*.js`, gulp.series("js", browserSync.reload))
})

gulp.task("server", gulp.series("browsersync"))
gulp.task("build", gulp.parallel("public.copy", "js.copy", "js"))

//最初のタスク
gulp.task("init", gulp.series("build", "server"))
//gulpのデフォルトタスクで諸々を動かす
gulp.task("default", gulp.series("server"))