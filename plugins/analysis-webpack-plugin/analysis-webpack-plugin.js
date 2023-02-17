module.exports = class AnalysisWebpackPlugin {
  apply(compiler) {
    // 注册钩子函数
    compiler.hooks.emit.tap("AnalysisWebpackPlugin", (compilation) => {
      const assets = compilation.assets;
      const assetsEntries = Object.entries(assets);
      //  排序
      const assetsFileSizeSort = assetsEntries.sort((a, b) => (a[1].size() > b[1].size() ? -1 : 1));
      let content = `|文件名|文件大小|
|--|--|`;
      assetsFileSizeSort.forEach(([filename, file]) => {
        content += `
|${filename}|${Math.ceil(file.size() / 1024)}kb|`;
      });

      compilation.assets["analysis.md"] = {
        source() {
          return content;
        },

        length() {
          return content.length;
        },
      };
    });
  }
};
