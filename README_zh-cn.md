# render-react-components

[![NPM version](https://img.shields.io/npm/v/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Build Status](https://img.shields.io/travis/lewis617/render-react-components.svg?style=flat)](https://travis-ci.org/lewis617/render-react-components)
[![NPM downloads](http://img.shields.io/npm/dm/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Dependencies](https://david-dm.org/lewis617/render-react-components/status.svg)](https://david-dm.org/lewis617/render-react-components)

[View English version](./README.md)

render-react-components（简称 rrc） 是一个包含 `init`、`dev` 的命令行工具，他基于 [roadhog](https://github.com/sorrycc/roadhog) 实现, 但是添加了 `init` 命令来递归找出当前项目中所有的 React 组件，并创建相关文件来隔离地渲染它们。

![](https://img.alicdn.com/tfs/TB1VPzQnHGYBuNjy0FoXXciBFXa-894-444.gif)

## Getting started
```bash
## 本地或者全局安装
$ npm i render-creact-components -g

## 检查版本
$ rrc -v
1.0.0

## 为项目中所有的 React 组件，初始化渲染环境
$ rrc init

## 本地开发
$ rrc dev

```

## 配置
render-react-components 的 webpack 部分功能是基于 af-webpack 实现的。如需配置，在项目根目录新建 .webpackrc 完成，格式为 JSON，比如：

```js
{
  "externals": { "react": "window.React" }
}
```

如果你偏爱 JS 的配置方式，或者需要通过编程的方式做一些判断或者抽象，可以用 .webpackrc.js配置文件，支持 ES6 语法，比如：

```js
export default {
  externals: { react: 'window.React' },
}
```

索引：

* [entry](#entry)
* [theme](#theme)
* [define](#define)
* [externals](#externals)
* [alias](#alias)
* [extraResolveExtensions](#extraresolveextensions)
* [browserslist](#browserslist)
* [publicPath](#publicpath)
* [outputPath](#outputpath)
* [devtool](#devtool)
* [commons](#commons)
* [hash](#hash)
* [html](#html)
* [disableCSSModules](#disablecssmodules)
* [disableCSSSourceMap](#disablecsssourcemap)
* [extraBabelPresets](#extrababelpresets)
* [extraBabelPlugins](#extrababelplugins)
* [extraBabelIncludes](#extrababelincludes)
* [copy](#copy)
* [proxy](#proxy)
* [sass](#sass)
* [manifest](#manifest)
* [ignoreMomentLocale](#ignoremomentlocale)
* [disableDynamicImport](#disabledynamicimport)
* [env](#env)

### entry

指定 webpack 入口文件，支持 [glob](https://github.com/isaacs/node-glob) 格式。

比如你的项目是多页类型，会希望把 src/pages 的文件作为入口。可以这样配：

```
"entry": "src/pages/*.js"
```

### theme
配置主题，实际上是配 less 变量。支持对象和字符串两种类型，字符串需要指向一个返回配置的文件。
比如：

```
"theme": {
  "@primary-color": "#1DA57A"
}
```

或者，

```
"theme": "./theme-config.js"
```

### define
通过 webpack 的 DefinePlugin 传递给代码，值会自动做 `JSON.stringify` 处理。
比如：

```js
"define": {
  "process.env.TEST": 1,
  "USE_COMMA": 2,
}
```

### externals
配置 webpack 的?[externals](https://webpack.js.org/configuration/externals/)?属性。
比如：

```js
// 配置 react 和 react-dom 不打入代码
"externals": {
  "react": "window.React",
  "react-dom": "window.ReactDOM"
}
```

### alias
配置 webpack 的 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) 属性。

### extraResolveExtensions

配置 webpack 的 [resolve.extensions](https://webpack.js.org/configuration/resolve/#resolve-extensions) 属性。

### browserslist
配置 [browserslist](https://github.com/ai/browserslist)，同时作用于 babel-preset-env 和 autoprefixer。
比如：

```js
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

### publicPath
配置 webpack 的 [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) 属性。

### outputPath
配置 webpack 的?[output.path](https://webpack.js.org/configuration/output/#output-path)?属性。

### devtool
配置 webpack 的 [devtool](https://webpack.js.org/configuration/devtool/) 属性。

### commons

配置 webpack 的 [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) 插件，格式为数组，有几项配几个 CommonsChunkPlugin 。

比如：

```markup
"commons": [
  {
    async: '__common',
    children: true,
    minChunks(module, count) {
      if (pageCount <= 2) {
        return count >= pageCount;
      }
      return count >= pageCount * 0.5;
    },
  },
]
```

### hash

配置让构建产物文件名带 hash，通常会和 [manifest](#manifest) 配合使用。

### html

配置 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 插件。

比如：

```markup
"html": {
  "template": "./src/index.ejs"
}
```

### disableCSSModules

禁用 [CSS Modules](https://github.com/css-modules/css-modules)。

### disableCSSSourceMap

禁用 CSS 的 SourceMap 生成。

### extraBabelPresets

定义额外的 babel preset 列表，格式为数组。

### extraBabelPlugins

定义额外的 babel plugin 列表，格式为数组。

### extraBabelIncludes

定义额外需要做 babel 转换的文件匹配列表，格式为数组。

### copy

定义需要单纯做复制的文件列表，格式为数组，项的格式参考 [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) 的配置。

比如：

```markup
"copy": [
  {
    "from": "",
    "to": ""
  }
]
```

### proxy

配置 webpack-dev-server 的 [proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) 属性。
如果要代理请求到其他服务器，可以这样配：

```markup
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}
```

然后访问?`/api/users`?就能访问到?[http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users)?的数据。

### sass
配置 [node-sass](https://github.com/sass/node-sass#options) 的选项。注意：使用 sass 时需在项目目录安装 node-sass 和 sass-loader 依赖。

### manifest
配置后会生成 manifest.json，option 传给 [https://www.npmjs.com/package/webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin)。
比如：

```markup
"manifest": {
  "basePath": "/app/"
}
```

### ignoreMomentLocale

忽略 moment 的 locale 文件，用于减少尺寸。

### disableDynamicImport

禁用 `import()` 按需加载，全部打包在一个文件里，通过 [babel-plugin-dynamic-import-node-sync](https://github.com/seeden/babel-plugin-dynamic-import-node-sync) 实现。

### env

针对特定的环境进行配置。dev 的环境变量是?`development`，build 的环境变量是?`production`。
比如：

```js
"extraBabelPlugins": ["transform-runtime"],
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```

这样，开发环境下的 extraBabelPlugins 是?`["transform-runtime", "dva-hmr"]`，而生产环境下是?`["transform-runtime"]`。

## 环境变量

可环境变量临时配置一些参数，包括：

* `PORT`，端口号，默认 8000
* `HOST`，默认 localhost
* `ANALYZE`，是否在 build 时分析构建产物
* `ESLINT`，设为 `none` 时禁用 eslint 检测
* `TSLINT`，设为 `none` 时禁用 tslint 检测
* `COMPRESS`, 设为 `none` 时 build 时不压缩
* `BROWSER`, 设为 `none` 时不自动打开浏览器

比如使用 3000 端口启动 dev server，

```bash
# OS X, Linux
$ PORT=3000 roadhog dev

# Windows (cmd.exe)
$ set PORT=3000&&roadhog dev

# Or use cross-env for all platforms
$ cross-env PORT=3000 roadhog dev
```


## LICENSE

MIT