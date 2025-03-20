const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const notify = require("gulp-notify");
const gulpif  = require('gulp-if');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();


let prod = false;
const isProd = (done) => {
  prod = true;
  done();
}

const clean = () => {
	return del(['dist/*'])
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'))
}

const styles = () => {
  return src('src/styles/**/*.css')
  .pipe(gulpif(!prod, sourcemaps.init()))
  .pipe(concat('main.css'))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(gulpif(prod, cleanCSS({ level: 2 })))
  .pipe(gulpif(!prod, sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream());
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(gulpif(prod, htmlmin({
      collapseWhitespace: true
    })))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const svgSprites = () => {
  return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest('dist/images'));
}

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
    ])
    .pipe(gulpif(!prod, sourcemaps.init()))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulpif(prod, uglify({
      toplevel: true
    }).on("error", notify.onError())))
    .pipe(gulpif(!prod, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist"
    },
  });
}

const images = () => {
  return src([
		'src/images/**/*.jpg',
		'src/images/**/*.png',
		'src/images/*.svg',
		'src/images/**/*.jpeg',
		])
    .pipe(image())
    .pipe(dest('dist/images'))
};

watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.css', styles);
watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);


exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;

exports.dev = series(clean, resources, scripts, styles, images, svgSprites, watchFiles)
exports.build = series(isProd, clean, resources, htmlMinify, scripts, styles, images, svgSprites)
