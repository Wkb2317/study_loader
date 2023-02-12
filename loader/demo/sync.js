/**
 * 同步loader
 * @param content 文件内容
 * @param map sourcemap
 * @param meta 其他loader传入的数据
 * @returns {*}
 */
// module.exports = function (content, map, meta){
//     return content
// }

/**
 * 更加灵活
 * this.callback参数
 * @param err  第一个是错误信息
 * @param content
 * @param map
 * @param meta
 */
module.exports = function (content, map, meta) {
  // 同步loader中不能执行异步代码
  console.log("sync");
  this.callback(null, content, map, meta);
};
