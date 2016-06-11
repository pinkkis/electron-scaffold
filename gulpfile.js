const gulp = require('gulp');
const inject = require('gulp-inject');
const less = require('gulp-less');
const es = require('event-stream');
const bowerFiles = require('main-bower-files');
const path = require('path');
const childProcess = require('child_process');
const electron = require('electron-prebuilt');

gulp.task('run', () => {
	childProcess.spawn(electron, ['./app'], {stdio: 'inherit'});
});

gulp.task('watch', ['build'], () => {
	gulp.watch('./src/webapp/**/*.js', ['inject']);
});

gulp.task('build', ['less', 'inject'], () => {
	// content
});

gulp.task('less', () => {
	return gulp.src('./app/less/app.less')
		.pipe(less({
			paths: [path.join(__dirname, 'app', 'less', 'includes')]
		}))
		.pipe(gulp.dest('./app/css'));
});

gulp.task('inject', () => {
	gulp.src('./app/index.html')
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
		.pipe(inject(es.merge(
			gulp.src([
				'./app/css/**/*.css',
				'./app/scripts/app.js',
				'./app/scripts/**/*.module.js',
				'./app/scripts/**/*.js'
			], {read: false})
		)))
		.pipe(gulp.dest('./app'));
});

gulp.task('clean', () => {
	// do nothing
});

gulp.task('deploy', () => {
	// content
});