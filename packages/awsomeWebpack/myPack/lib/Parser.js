const babylon = require('babylon')

class Parser  {
  parse(source) {
    return babylon.parse(source, {
      sourceType: 'module',
      plugins: ['dynamicImport']  // 当前插件可以支持 import() 动态导入的语法
    })
  }
}

module.exports = Parser

