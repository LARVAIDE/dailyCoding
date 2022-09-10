/**
 * 用途：删除js bundle中的一些注释
 */
class MyPlugin {
  apply(compiler) {
    console.log("plugin启动");
    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      //Compilation--->此次打包过程中的上下文
      for (const name in compilation.assets) {
        if (name.endsWith(".js")) {
          const withoutComments = compilation.assets[name]
            .source()
            .replace(/\/\*\*+\*\//g, "");
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          };
        }
      }
    });
  }
}

module.exports = MyPlugin;
