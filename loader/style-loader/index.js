module.exports = function (content) {
  // 1. 只用style-loader的时候，不能处理css中的其他资源
  // 2. 用css-loader的时候，返回的是js代码，插入到style标签里的是js代码
  // const script = `
  //     const style = document.createElement("style");
  //     style.innerHTML = ${JSON.stringify(content)};
  //     document.head.appendChild(style);
  // `;
  // return script;
};

// 解决方法，pitch loader的熔断机制和inline loader的优先执行机制
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  // 1. 获取下面要使用的loader和要处理的资源
  // console.log(remainingRequest); // E:\study\webpack5\my_loader\node_modules\.pnpm\registry.npmmirror.com+css-loader@6.7.3_webpack@5.75.0\node_modules\css-loader\dist\cjs.js!E:\study\webpack5\my_loader\src\assets\css\index.css
  // 2. 将绝对路径转换成相对路径
  const absolute_path = remainingRequest
    .split("!")
    .map((path) => {
      return this.utils.contextify(this.context, path);
    })
    .join("!");

  /**
   * inline loader的使用方法
   * 1. 使用 ! 前缀，将禁用所有已配置的 normal loader(普通 loader)
   * 2. 使用 !! 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）
   * 3. 使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders
   **/
  const script = `
    import style from '!!${absolute_path}'
    const styleEl = document.createElement("style");
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
  `;

  return script;
};
