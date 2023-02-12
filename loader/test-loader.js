/**
 *
 * @param content 文件内容
 * @param map sourcemap
 * @param meta 其他loader传入的数据
 * @returns {*}
 */
module.exports = function (content, map, meta){
    console.log(content)
    return content
}
