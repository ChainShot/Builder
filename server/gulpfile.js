const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('default', function (done) {
  nodemon({ script: 'src/index.js', done });
})
