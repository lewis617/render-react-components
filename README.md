# render-react-components

[![NPM version](https://img.shields.io/npm/v/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Build Status](https://img.shields.io/travis/lewis617/render-react-components.svg?style=flat)](https://travis-ci.org/lewis617/render-react-components)
[![NPM downloads](http://img.shields.io/npm/dm/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Dependencies](https://david-dm.org/lewis617/render-react-components/status.svg)](https://david-dm.org/lewis617/render-react-components)

[查看中文版](https://github.com/lewis617/render-react-components/blob/master/README_zh-cn.md)

render-react-components is a cli tool to recursilvly search all the react components in your project(only in src derectory) and create files to render them isolatedly.

![](https://img.alicdn.com/tfs/TB1VPzQnHGYBuNjy0FoXXciBFXa-894-444.gif)

## Getting started
```bash
## Install globally or locally
$ npm i render-react-components -g

## Create files to render components
$ rrc init

## you can use the filter argument(the keyword of compoennt path) to init for part of components
$ rrc init --filter=Component1
## or simply use -f=keyword to filter
$ rrc init -f=Component1

## Local development
$ rrc dev

## Delete all the files that created by rrc init
$ rrc clean

```

## Configuration

For configuration, you can use `.rrc.js` configuration file, e.g.

```js
module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
  }
};
```

## LICENSE

MIT
