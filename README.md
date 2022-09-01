# 项目描述
---
- 用来记录新技术学习
- 源码阅读
> markdown参考
> [基本语法](https://www.markdown.xyz/basic-syntax/)
> [表情符号](https://gist.github.com/rxaviers/7360908)

## webpack@5
---
 配置以及调优
* ### asset
     *  asset/resource 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
     *  asset/inline 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
     *  asset/source 将资源导出为源码（source code）. 类似的 raw-loader 功能.
     *  asset 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource
* ### browserslist
    根据[平台占有率](https://caniuse.com/usage-table)来让babel、postcss等执行兼容哪些平台
    ```
        > 0.25%
        last 2 version
        not dead
    ```
* ### postcss
    [postcss工具集使用文档](https://github.com/postcss/postcss/blob/main/docs/README-cn.md)
    [postcss-loader使用文档](https://webpack.docschina.org/loaders/postcss-loader/)
* ### babel in webpack
    通过使用[@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)预设来避免手动安装一系列插件
* ### polyfill
    在webpack@5版本中，要使用[polyfill](https://babeljs.io/docs/en/babel-polyfill)需要手动引入。
    ```
        import "core-js/stable";
        import "regenerator-runtime";
    ```
* ### external
    
* ### source-map
    将打包前后的代码进行映射，方便调试定位，在webpack@5中由 [devtool](https://webpack.docschina.org/configuration/devtool/#root) 选项来控制
* ### resolve
    设置[模块解析](https://webpack.docschina.org/configuration/resolve/#root)
    ```
    resolve: {
        extensions: ['.jsx', '.js', '.css', '.less', '.ts', '.tsx', '...'], //顺序优先级， ... 扩展运算符代表默认配置
        modules: [resolveApp('src'), 'node_modules'], //优先 src 目录下查找需要解析的文件，会大大节省查找时间
        alias: {
            '~': resolveApp('src'),
            '@': resolveApp('src'),
            'components': resolveApp('src/components')
        }
    }
    ```
* ### splitchunks
    使用 [splitchunks](https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks) 来拆分代码块，用于按需加载，配合preload和prefetch，优化页面性能
* ### terserpugin
    使用[TerserWebpackPlugin](https://webpack.docschina.org/plugins/terser-webpack-plugin/)压缩js代码
* ### treeShaking
    * #### usedExports
    标记未使用的代码(unused harmony exports...)，结合minimizer-->terserWebpackPlugin实现tree shaking
    * #### sideEffects
    在package.json中设置`"sideEffects": false`，去除所有模块副作用，包括整个css文件
    可以设置为数组精准管理文件或单独在webpack config中的css规则设置，避免css被摇掉
    * #### PurgeCSSPlugin
    [PurgeCSSPlugin](https://www.npmjs.com/package/purgecss-webpack-plugin) 用于css treeShaking，注意⚠️在本项目中当css选择器名称小于四个字母时不生效，其他地方不清楚
* ### compression
    使用[CompressionPlugin](https://www.npmjs.com/package/compression-webpack-plugin)压缩资源以供http Content-Encoding
* ### diy plugin
* ### diy loader

## awsomeWebpack
---
webpack源码阅读


## dataStructures
---
* 栈
* 链表
* 队列
* 散列表

## ES6
---
ES6+学习

## exsample-cli
---
脚手架


## FunctionalProgramming
---
函数式编程思想学习


## gulp
---
gulp学习


## mobx-tutorial
---
mobx@6


## react-ssr
---
尝试自己搭个react服务端渲染


## rollup
---
rollup学习


## source-load
---
性能优化测试-----资源加载


## TS
---
typescript学习






