const schema = require("./schema.json");

module.exports = function (content, sourcemap, meta) {
  // 获取webpack.config.js中loader的options配置
  console.log("banner loader");
  const options = this.getOptions(schema);
  const prefix = `
    /*
    * author: ${options.author}
    */
  `;
  return prefix + content;
};
