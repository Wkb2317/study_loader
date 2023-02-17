/**
 * 将runtime script文件变成内联script，减少网络请求
 * */
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = class InlineWebpackPlugin {
  constructor(tests) {
    this.tests = tests;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("InlineWebpackPlugin", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        "InlineWebpackPlugin", // <-- Set a meaningful name here for stacktraces
        (data, cb) => {
          // Manipulate the content
          data.headTags = this.getScript(data.headTags, compilation.assets);
          data.bodyTags = this.getScript(data.bodyTags, compilation.assets);
          // Tell webpack to move on
          cb(null, data);
        }
      );

      HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync("InlineWebpackPlugin", (_, callback) => {
        // 删除文件
        const assets = compilation.assets;
        Object.keys(assets).forEach((item) => {
          if (this.tests.some((test) => test.test(item))) {
            delete assets[item];
          }
        });

        callback();
      });
    });
  }

  // 将runtime文件转换成内联script文件
  getScript(tags, assets) {
    /**
     * [ 
     * {attributes: {defer: true, type: undefined, src: 'runtime~main.f2ba4875fe.js'}
        meta: {plugin: 'html-webpack-plugin'}
        tagName: "script"
        voidTag: false 
      }
    ]
     * */
    return tags.map((tag) => {
      if (tag.tagName === "script" && this.tests.some((test) => test.test(tag.attributes.src))) {
        const scriptName = tag.attributes.src;
        return (tag = { tagName: "script", innerHTML: assets[scriptName].source(), closeTag: true });
      }
      return tag;
    });
  }
};
