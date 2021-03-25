# CJNotebook
拉取代码后，直接运行
```
npm install
npm start
npm run electron-start
```

## 创建MyNotebook
```
npx create-react-app cj-notebook
cd cj-notebook
npm start
```
### 2.Web项目转Elect项目
安装electron
```
npm install -save electron
```

在package.json文件中增加启动命令
```
 "scripts": {
   ....,
    "electron-start": "electron ."
  },
```

在createreactapp-electron-demo项目的根目录（不是src目录）创建Electron的启动文件main.js（main.js文件可以直接拷贝electron-quick-start仓库里的main.js）
在createreactapp-electron-demo项目中的package.json文件中增加main字段，值为"main.js"
```
{
  "name": "createreactapp-electron-demo",
  ...
  "main": "main.js",
}
```

对代码进行相应修改，注意url的加载方法变化

# 启动react项目
```
npm start
```
# 启动electron
```
npm run electron-start
```
支持热调试，当你修改代码后，桌面应用也将会重新更新。

如果加载页面方法是这样的
```
 mainWindow.loadURL('http://localhost:3000/');
```
那么不启动react项目,启动electron则是空白

所以加载路径改为
```
mainWindow.loadURL(url.format({
pathname: path.join(__dirname, './build/index.html'), protocol: 'file:', slashes: true }))
```
然后运行如下两个命令
```
npm run build
npm run electron-start
```
发现还是空白
在文件package.json中添加字段homepage，如下：
```
{
 ...
  "main": "main.js",
  "homepage": ".",
  ...
}
```

原因：默认情况下，homepage是http://localhost:3000，build后，所有资源文件路径都是/static，而Electron调用的入口是file:协议，/static就会定位到根目录去，所以找不到静态文件。在package.json文件中添加homepage字段并设置为"."后，静态文件的路径就变成了相对路径，就能正确地找到了。

这样要看修改效果每次都要 build,如果开发环境可以直接加载 localhost:3000 这个地址，就是要启动两个终端

但这两种环境切换比较麻烦，直接在package.json中添加DEV字段做标志，代码中动态加载即可
```
{
  ...
  "homepage":".",
  "DEV":false,
  ...
}
```

打包
安装electron-packager
```
npm install electron-packager --save-dev
```

electron-packager命令
```
electron-packager <location of project> <name of project> <platform> <architecture> <electron version> <optional options>
```
location of project: 项目的本地地址，此处我这边是 ~/createreactapp-electron-demo
name of project: 项目名称，此处是 createreactapp-electron-demo
platform: 打包成的平台 --all
architecture: 使用 x86 还是 x64 还是两个架构都用
electron version: electron 的版本

在 package.json 文件的在 scripts 中加上如下代码：
```
"package": "electron-packager ./build createreactapp-electron-demo --all --out ~/ --electron-version 12.0.0"
```

开始打包
npm run package