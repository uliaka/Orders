const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const env = require('gulp-env');
gulp.task('default', () => {
  env({
    vars: {
      NODE_ENV: 'test',
    }
  });
 	return gulp.src(process.env.PWD + '/server/tests/**/*.js', {read: false})
    .pipe(babel({
        presets: ['@babel/env']
    }))
		.pipe(mocha({ reporter: 'nyan' }))
});

