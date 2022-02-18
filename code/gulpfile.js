//----------------------------------------------------------------------
//  モード
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");

const plumber = require("gulp-plumber");
const sassGlob = require("gulp-sass-glob-use-forward");
const sass = require("gulp-dart-sass");
const autoprefixer = require("gulp-autoprefixer");

const srcPath = {
  styles: {
    src: "../src/sass/**/*.scss",
    dist: "../src/css/",
    map: "css/",
  },
};

//----------------------------------------------------------------------
//  関数定義
//----------------------------------------------------------------------
sass.compiler = require("sass");
function compile(done) {
  src(srcPath.styles.src, { sourcemaps: true }) //元になるファイルを記述
    .pipe(plumber()) // watch中にエラーが発生してもwatchが止まらないようにする
    .pipe(sassGlob()) // glob機能を使って@import文を省略する
    .pipe(sass()) // sassのコンパイルをする
    .pipe(autoprefixer()) // ベンダープレフィックスを自動付与する
    .pipe(dest(srcPath.styles.dist, { sourcemaps: srcPath.styles.map })); //destで出力先を指定
  done();
}

//----------------------------------------------------------------------
//  タスク定義
//----------------------------------------------------------------------
exports.compile = series(compile);
exports.watch = function () {
  watch(srcPath.styles.src, compile);
};

/************************************************************************/
/*  END OF FILE                                                         */
/************************************************************************/
