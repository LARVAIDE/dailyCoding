class ChunkPlugin {
  constructor(options) {
    this.options = options || {};
  }
  
  apply(compiler) {
    debugger
    const options = this.options;
    compiler.hooks.thisCompilation.tap("ChunkPlugin", (compilation) => {
      debugger
      compilation.hooks.optimizeChunks.tap("ChunkPlugin", (chunks) => {
        return true;
      });
    });
  }
}

module.exports = ChunkPlugin;
