const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');

gulp.task('default', () =>
 	gulp.src(process.env.PWD + '/server/tests/*.js', {read: false})
    .pipe(babel({
        presets: ['@babel/env']
    }))
		.pipe(mocha({ reporter: 'nyan' }))
);

