module.exports = class CleanWebpackPlugin {
  apply(complier) {
    complier.hooks.emit.tap("CleanWebpackPlugin", (compilation) => {
      // 1. 获取打包路径
      const outPutPath = complier.options.output.path;
      // 2. 获取文件夹内信息
      const fs = complier.outputFileSystem;
      // 3. 递归删除
      this.remove(fs, outPutPath);
      // 4. 删除空文件夹
      this.removeEmptyDir(fs, outPutPath);
    });
  }

  remove(fs, outPutPath) {
    // 获取打包目录下的文件信息
    const fileList = fs.readdirSync(outPutPath);
    fileList.forEach((item) => {
      const path = `${outPutPath}/${item}`;
      // 1. 是否是文件夹
      if (fs.statSync(path).isDirectory()) {
        // 2. 是文件夹，递归删除文件夹下的文件
        if (!fs.readdirSync(path).length) {
          fs.rmdirSync(path);
          return;
        }
        this.remove(fs, path);
      } else {
        // 3. 删除文件
        fs.unlinkSync(path);
      }
    });
  }

  removeEmptyDir(fs, outPutPath) {
    const fileList = fs.readdirSync(outPutPath);
    fileList.forEach((item) => {
      const path = `${outPutPath}/${item}`;
      if (!fs.readdirSync(path).length) {
        fs.rmdirSync(path);
      } else {
        this.removeEmptyDir(fs, path);
      }
    });
  }
};
