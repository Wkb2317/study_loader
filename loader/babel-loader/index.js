const babel = require("@babel/core");
const schema = require("./schema.json");
module.exports = function (content) {
  // 获取options
  const options = this.getOptions(schema);
  // 异步
  const callback = this.async();
  babel.transform(content, options, function (err, result) {
    result; // => { code, map, ast }
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
  });
};
