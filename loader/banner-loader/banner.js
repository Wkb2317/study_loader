const schema = require("./schema.json");

module.exports = function (content, sourcemap, meta) {
  // 获取webpack.config.js中loader的options配置
  console.log("banner loader");
  const options = this.getOptions(schema);
  console.log(options);
  const prefix = `
    /*
    * author: ${options.author}
    */
  `;
  console.log(content);
  return prefix + content;
};
