/**
 * 异步loader
 * @param content
 * @param map
 * @param meta
 */
module.exports = function (content, map, meta) {
    const callback = this.async()

    setTimeout(() => {
        console.log('async')
        callback(null, content, map, meta)
    },1000)
}
