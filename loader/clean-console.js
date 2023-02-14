module.exports = function (content, map, meta) {
  console.log("clean log loader");
  return content.replace(/console\.log\(.*\);?/g, "");
};
