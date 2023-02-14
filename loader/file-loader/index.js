const loaderUtils = require("loader-utils");

module.exports = function (content) {
  // 1. 根据文件内容生产一个新的文件名称
  let interpolatedName = loaderUtils.interpolateName(this, "[hash].[ext]", {
    content,
  });
  // 2. 发送文件
  interpolatedName = `images/${interpolatedName}`;
  this.emitFile(interpolatedName, content);
  // 3. 返回
  return `module.exports = "${interpolatedName}"`;
};

// 二进制loader
// 定义位置必须在上面导出函数的下面
// 要不然会覆盖raw属性
module.exports.raw = true;
