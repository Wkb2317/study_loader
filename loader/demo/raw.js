/**
 * raw loader接收到的数据时二进制数据
 * @param content
 * @returns {*}
 */
module.exports = function (content) {
  console.log(content);
  return content;
};

module.exports.raw = true;
