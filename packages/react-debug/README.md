# 调试react源码

## 下载react
`git clone https://github.com/facebook/react`
`git reset --hard 80f3d88190c07c2da11b5cac58a44c3b90fbc296`

### 修改`./scripts/rollup/build.js`
找到 rollup 的配置，添加一行 sourcemap: true

### 找出没有生成 sourcemap 的那几个插件注释掉
```js
/** 
 * 注释这几个插件
 */
const Wrappers = require('./wrappers');
const stripUnusedImports = require('./plugins/strip-unused-imports');
const prettier = require('rollup-plugin-prettier');
const closure = require('./plugins/closure-plugin');
```

## 启动步骤
1. 先在react目录下运行`yarn run build`
2. 将上面的产物copy至debug目录下
3. 在debug目录下运行`npm run start`
4. 调试代码