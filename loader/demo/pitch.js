module.exports = function (content) {
  console.log("normal loader 1");
  return content;
};

/**
 * pitch会比normal优先执行
 * 熔断机制：
 *    如果有pitch函数返回值，则后面的normal函数和pitch函数都不会执行
 */
module.exports.pitch = function () {
  console.log("pitch loader 1");
};
