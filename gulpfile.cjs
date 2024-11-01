const gulp = require("gulp");
const {series} = gulp;
const path = require("path");
const clean = require("gulp-clean")

const diretorioFora = path.dirname(__dirname);
const pastaLocal = path.basename(__dirname);
const diretorioAtual = __dirname;
const cleanLocal = path.join(__dirname, "src");

const diretorioEditor = path.join(diretorioFora, "storage", "shared", "termux", pastaLocal)

gulp.task("root-clean", (cb) => {
gulp.src(cleanLocal, { read: false, allowEmpty: true })
   .pipe(clean())
   return cb()
})

gulp.task("trazer", (cb) => {
    
    gulp.src([diretorioEditor + "/**/*", "!ignorar/**/*"])
    .pipe(gulp.dest(diretorioAtual))
    
    return cb()
})

gulp.task("enviarTudo", (cb) => {
    
    gulp.src([diretorioAtual + "/**/*", "!node_modules/**/*"])
    .pipe(gulp.dest(diretorioEditor))
    
    return cb()
})

gulp.task("enviarSrc", (cb) => {
    
    gulp.src([diretorioAtual + "/src/**/*", "!node_modules/**/*"])
    .pipe(gulp.dest(diretorioEditor + "/src"))
    
    return cb()
})


gulp.task("default", (cb) => {
    gulp.watch(diretorioEditor, series(["trazer"]))
})
