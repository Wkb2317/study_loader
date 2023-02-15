/**
 * webpack执行流程：
 * 1. 首先会读取webpack.config.js中的配置， 此时就会调用plugins中的new，执行construct方法
 * 2. webpack会创建一个complier对象
 * 3. 遍历所有插件，执行apply方法
 * 4. 执行剩下的流程
 */
module.exports = class TestPlugin {
  constructor() {
    console.log("test plugins constructor");
  }

  apply(compiler) {
    console.log("test apply");

    // 钩子注册
    // 从文档可知, make 是 AsyncParallelHook, 也就是异步并行钩子, 特点就是异步任务同时执行
    // 使用tapAsync、tapPromise注册，进行异步操作会等异步操作做完再继续往下执行
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("TestPlugin make11");
        callback();
      }, 3000);

      compilation.hooks.seal.tap("TestPlugin", () => {
        console.log("compilation seal");
      });
    });
    compiler.hooks.make.tapPromise("TestPlugin", (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("TestPlugin make22");
          resolve();
        }, 1000 * 10);
      });
    });
    // 如果使用tap注册的话，进行异步操作是不会等待异步操作执行完成的。
    compiler.hooks.make.tap("TestPlugin", (compilation) => {
      setTimeout(() => {
        console.log("TestPlugin make33");
      }, 1000 * 9);
    });

    // 从文档可知, emit 是 AsyncSeriesHook, 也就是异步串行钩子, 特点就是异步任务顺序执行
    compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.emit() 111");
        callback();
      }, 3000);
    });
    compiler.hooks.emit.tapPromise("TestPlugin", (compilation, callback) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("TestPlugin emit()22");
          resolve();
        }, 1000 * 10);
      });
    });
  }
};
