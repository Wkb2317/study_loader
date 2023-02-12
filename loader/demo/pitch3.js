module.exports = function (content) {
  console.log("normal loader 3");
  return content;
};

// pitch优先执行
module.exports.pitch = function () {
  console.log("pitch loader 3");
};
