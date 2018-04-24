# render-react-components

[![NPM version](https://img.shields.io/npm/v/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Build Status](https://img.shields.io/travis/lewis617/render-react-components.svg?style=flat)](https://travis-ci.org/lewis617/render-react-components)
[![NPM downloads](http://img.shields.io/npm/dm/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Dependencies](https://david-dm.org/lewis617/render-react-components/status.svg)](https://david-dm.org/lewis617/render-react-components)

[View English version](https://github.com/lewis617/render-react-components/blob/master/README.md)

render-react-components（简称 rrc） 是一个命令行工具，可以递归找出当前项目中所有的 React 组件（仅限于 src 目录下的所有组件），并为它们创建相互隔离的 demo 页面。

![](https://img.alicdn.com/tfs/TB1VPzQnHGYBuNjy0FoXXciBFXa-894-444.gif)

## Getting started
```bash
## 本地或者全局安装
$ npm i render-react-components -g

## 为项目中所有的 React 组件，创建 demo 页面
$ rrc init

## 如果你只想给部分组件创建 demo 页面，可以使用 filter 参数，输入组件路径的关键词即可
$ rrc init --filter=Component1
## 或者简写
$ rrc init -f=Component1

## 本地开发，支持代码热加载
$ rrc dev

## 删除了 rrc init 创建的所有文件
$ rrc clean

```

## 配置
render-react-components 的 webpack 部分功能是基于 af-webpack 实现的。如需配置，可以在根目录的 .rrc.js 文件中配置：

```js
export default {
  externals: { react: 'window.React' },
}
```

更多配置，请参考 roadhog 的 [.webpackrc.js](https://github.com/sorrycc/roadhog/blob/master/README_zh-cn.md#%E9%85%8D%E7%BD%AE)。他们的写法是一样的。

## LICENSE

MIT