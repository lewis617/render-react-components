# render-react-components

[![NPM version](https://img.shields.io/npm/v/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Build Status](https://img.shields.io/travis/lewis617/render-react-components.svg?style=flat)](https://travis-ci.org/lewis617/render-react-components)
[![NPM downloads](http://img.shields.io/npm/dm/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Dependencies](https://david-dm.org/lewis617/render-react-components/status.svg)](https://david-dm.org/lewis617/render-react-components)

[查看中文版](./README_zh-cn.md)

render-react-components is a cli tool with `init`、`dev` commands. It's inspired by roadhog, but add the `init` command to recursilvly list all the react components in your project and create files to render them isolatedly.

![](https://img.alicdn.com/tfs/TB1VPzQnHGYBuNjy0FoXXciBFXa-894-444.gif)

## Getting started
```bash
## Install globally or locally
$ npm i render-creact-components -g

## Check version
$ rrc -v
1.0.0

## Create files to render components
$ rrc init

## Local development
$ rrc dev

```

## Configuration

render-react-components's webpack part is based on the af-webpack's implementation. For configuration, create `.rrc` in the project root. The format is JSON, e.g.

```js
{
  "externals": { "react": "window.React" }
}
```

If you prefer JS configuration, or need to do some programming or abstract judgment, you can use `.rrc.js` configuration file, support ES6 syntax, e.g.

```js
export default {
  externals: { react: 'window.React' },
}
```

More details, please checkout the [`.webpackrc.js`](https://github.com/sorrycc/roadhog/blob/master/README.md#configuration) of roadhog.

## LICENSE

MIT
