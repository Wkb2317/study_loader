// 文件头加注释信息
module.exports = class BannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(complier) {
    complier.hooks.emit.tapAsync("BannerWebpackPlugin", (compilation, callback) => {
      // 1. 获取要添加文件的路径
      const extensions = ["js", "css"];
      const sourceKey = Object.keys(compilation.assets).filter((assetPath) => {
        const ext = assetPath.split(".")[1];
        return extensions.includes(ext);
      });
      //2. 获取路径对应的文件内容
      const prefix = `/*
* Author: ${this.options.author} 
*/`;

      sourceKey.forEach((path) => {
        // 获取资源
        let source = compilation.assets[path].source();
        const content = prefix + source;
        // 替换资源
        compilation.assets[path] = {
          source() {
            return content;
          },
          length() {
            return content.length;
          },
        };
      });

      callback();
    });
  }
};
