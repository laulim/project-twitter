var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber');


gulp.task('server', ['sass'], function() {
	browserSync.init({
		server: { baseDir: './docs/'}
	});
	gulp.watch('docs/**/*.html').on('change', browserSync.reload);
	gulp.watch('docs/sass/**/*.scss', ['sass']);
});

gulp.task('sass', function(){
	return gulp.src('./docs/sass/**/main.scss')
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'Sass',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(sass())
		.pipe(gulp.dest('./docs/css'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['server']);