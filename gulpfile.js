const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('default', () =>
 	gulp.src(process.env.PWD + '/server/tests/*.js', {read: false})
		.pipe(mocha({ reporter: 'nyan' }))
);

