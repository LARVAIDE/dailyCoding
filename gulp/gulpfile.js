//入口
exports.foo = doneCallback => {
    console.log('foo fn');
    doneCallback();//gulp异步任务，必须提供一个回调函数来标识任务结束
} 


exports.default = doneCallback => {
    console.log('default');
    doneCallback();
} 

//4.0以前的版本,不再推荐使用
const gulp = require('gulp')
gulp.task('fn', doneCallback => {
    console.log('fn sss')
    doneCallback()
})


//命令组合
const { series, parallel } = require('gulp');

const task1 = doneCallback => {
    setTimeout(() => {
        console.log('task1');
        doneCallback();
    }, 1003)
} 
const task2 = doneCallback => {
    setTimeout(() => {
        console.log('task2');
        doneCallback();
    }, 1001)
} 
const task3 = doneCallback => {
    setTimeout(() => {
        console.log('task3');
        doneCallback();
    }, 1000)
} 


exports.merge = series(task1, task2, task3) //串行
// exports.merge = parallel(task1, task2, task3) //并行


/**
 * 异步任务
*/
exports.callBack = doneCallback => {
    doneCallback(new Error('doneCallback failed!'))
}

exports.promise = () => {
    return Promise.resolve();
}
exports.promise = () => {
    return Promise.reject(new Error('doneCallback failed!'));
}

const timeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
exports.async = async () => {
    await timeout(1000)
    console.log('doneCallback finished')
}


/**
 * 构建过程
*/
const fs = require('fs');
const { Transform } = require('stream');
exports.build = () => {
    //读取流
    const read = fs.createReadStream('src/index.css')
    //写入
    const write = fs.createWriteStream('dist/index.min.css')
    //转换
    const transform = new Transform({
        transform: (chunk, encoding, callBack) => {
            const input = chunk.toString()
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            callBack(null, output) //错误优先
        }
    })
    read
        .pipe(transform)
        .pipe(write)

    return read
}


//gulp文件处理与插件
const { src, dest } = require('gulp')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

exports.gulpFileHandle = () => {
    return src('src/*.css')
        .pipe(cleanCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest('dist'))
}

//样式转换
const sass = require('gulp-sass')(require('sass'))
const babel = require('gulp-babel')
const styles = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(sass())
        .pipe(dest('dist'))
}

const scripts = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('dist'))
}

module.exports = {
    styles,
    scripts
}