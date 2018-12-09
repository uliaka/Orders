const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
 
function develop (done) {
  const options = {
    script: './server.js',
    ext: 'html js',
    done: done,
  };

  const stream = nodemon(options);
  stream.on('restart', function () {
    console.log('restarted!')
  });

  stream.on('crash', function() {
    console.error('Application has crashed!\n')
    stream.emit('restart', 10)  // restart the server in 10 seconds
  });
}


gulp.task('develop', develop);
