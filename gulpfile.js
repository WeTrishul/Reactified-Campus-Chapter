const gulp = require('gulp')
const uglify = require('gulp-uglify-es').default
const rev = require('gulp-rev')
const del = require('del')

gulp.task('js',function(done){
    console.log('minifying js...')
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'))
    done()
})


gulp.task('clean:assets',function(done){
    del.sync('./public/assets')
    done()
})

gulp.task('build',gulp.series('clean:assets','js'),function(done){
    console.log('building assets')
    done()
})



