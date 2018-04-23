# render-react-components

[![NPM version](https://img.shields.io/npm/v/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Build Status](https://img.shields.io/travis/lewis617/render-react-components.svg?style=flat)](https://travis-ci.org/lewis617/render-react-components)
[![NPM downloads](http://img.shields.io/npm/dm/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Dependencies](https://david-dm.org/lewis617/render-react-components/status.svg)](https://david-dm.org/lewis617/render-react-components)

[View English version](./README.md)

render-react-components（简称 rrc） 是一个包含 `init`、`dev` 的命令行工具，他基于 [roadhog](https://github.com/sorrycc/roadhog) 实现, 但是添加了 `init` 命令来递归找出当前项目中所有的 React 组件（仅限于 src 目录下的所有组件），并创建相关文件来隔离地渲染它们。

![](https://img.alicdn.com/tfs/TB1VPzQnHGYBuNjy0FoXXciBFXa-894-444.gif)

## Getting started
```bash
## 本地或者全局安装
$ npm i render-react-components -g

## 检查版本
$ rrc -v
1.0.0

## 为项目中所有的 React 组件，初始化渲染环境
$ rrc init

## 本地开发
$ rrc dev

```

## 配置
render-react-components 的 webpack 部分功能是基于 af-webpack 实现的。如需配置，可以在根目录的 .rrc.js 文件中配置：

```js
export default {
  externals: { react: 'window.React' },
}
```

更多配置，请参考 roadhog 的 [.webpackrc.js](https://github.com/sorrycc/roadhog/blob/master/README_zh-cn.md#%E9%85%8D%E7%BD%AE)。

## LICENSE

MIT