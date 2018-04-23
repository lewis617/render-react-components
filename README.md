# render-react-components

[![NPM version](https://img.shields.io/npm/v/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Build Status](https://img.shields.io/travis/lewis617/render-react-components.svg?style=flat)](https://travis-ci.org/lewis617/render-react-components)
[![NPM downloads](http://img.shields.io/npm/dm/render-react-components.svg?style=flat)](https://npmjs.org/package/render-react-components)
[![Dependencies](https://david-dm.org/lewis617/render-react-components/status.svg)](https://david-dm.org/lewis617/render-react-components)

[查看中文版](./README_zh-cn.md)

render-react-components is a cli tool with `init`、`dev` commands. It's inspired by roadhog, but add the `init` command to recursilvly list all the react components in your project and create files to render them seperately.

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

render-react-components's webpack part is based on the af-webpack's implementation. For configuration, create `.webpackrc` in the project root. The format is JSON, e.g.

```js
{
  "externals": { "react": "window.React" }
}
```

If you prefer JS configuration, or need to do some programming or abstract judgment, you can use `.webpackrc.js` configuration file, support ES6 syntax, e.g.

```js
export default {
  externals: { react: 'window.React' },
}
```

Index:

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

Specify webpack entries, support [glob](https://github.com/isaacs/node-glob) format.

suppose your project is multipages, wanting files in src/pages as entries. your can do the followings.

```
"entry": "src/pages/*.js"
```

### theme

Configure the theme, in fact, with less variables. Support both object and string type, the string needs to point to a file which return configurations.

e.g.

```
"theme": {
  "@primary-color": "#1DA57A"
}
```

or,

```
"theme": "./theme-config.js"
```

### define

Pass to code through the webpack's DefinePlugin plugin, the value will automatically be processed with `JSON.stringify`.

e.g.

```js
"define": {
  "process.env.TEST": 1,
  "USE_COMMA": 2,
}
```

### externals

Configure webpack's [externals] (https://webpack.js.org/configuration/externals/) property.

e.g.

```js
// Don't pack react and react-dom
"externals": {
  "react": "window.React",
  "react-dom": "window.ReactDOM"
}
```

### alias

Configure webpack's [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) property.

### extraResolveExtensions

Configure webpack's [resolve.extensions](https://webpack.js.org/configuration/resolve/#resolve-extensions) property.

### browserslist

Configure [browserslist](https://github.com/ai/browserslist), works on both babel-preset-env and autoprefixer.

e.g.

```js
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

### publicPath

Configure webpack's [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) property.

### outputPath

Configure webpack's [output.path](https://webpack.js.org/configuration/output/#output-path) property.

### devtool

Configure webpack's [devtool](https://webpack.js.org/configuration/devtool/) property.

### commons

Configure webpack's [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) plugin, the format is Array.

e.g.

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

Configuration to build with hash file name, and it's usually used in conjunction with the [manifest](#manifest).

### html

Configure [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) plugin.

e.g.

```markup
"html": {
  "template": "./src/index.ejs"
}
```

### disableCSSModules

Disable [CSS Modules](https://github.com/css-modules/css-modules)，we do not recommend doing this.

### disableCSSSourceMap

Disable generate CSS's SourceMap.

### extraBabelPresets

Define an additional list of babel presets, the formatt is Array.

### extraBabelPlugins

Define an additional list of babel plugins, the formatt is Array.

### extraBabelIncludes

Define an additional list of file matches that need to be transformed with babel, the format is Array.

### copy

Define a list of files that need to be copied. The format is an array, and the format of the item refers to the configuration of [copy-webpack-plugin] (https://github.com/webpack-contrib/copy-webpack-plugin).

e.g.

```markup
"copy": [
  {
    "from": "",
    "to": ""
  }
]
```

### proxy

Configure the [proxy] (https://webpack.js.org/configuration/dev-server/#devserver-proxy) property of webpack-dev-server.

e.g. proxy requests to other servers,

```markup
"proxy": {
  "/api": {
    "target": "http://jsonplaceholder.typicode.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api" : "" }
  }
}
```

Then visit `/ api / users` to access the data from [http://jsonplaceholder.typicode.com/users](http://jsonplaceholder.typicode.com/users].

### sass

Configure the options for [node-sass] (https://github.com/sass/node-sass#options). Note: node-sass and sass-loader dependencies must be installed in the project directory when using sass.

### manifest

Configure to generate manifest.json, it's option will pass to [https://www.npmjs.com/package/webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin).

e.g.

```markup
"manifest": {
  "basePath": "/app/"
}
```

### ignoreMomentLocale

Ignore moment locale file, used to reduce the size.

### disableDynamicImport

Disable `import ()` to load on demand, but bundle all the files in a single file, implement via [babel-plugin-dynamic-import-node-sync](https://github.com/seeden/babel-plugin-dynamic-import-node-sync).

### env

Set specific options for certain environment. `development` is for dev, and `production` is for build.

e.g.

```js
"extraBabelPlugins": ["transform-runtime"],
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```

Thus, extraBabelPlugins in development is `['transform-runtime', 'dva-hmr']`, and `['transform-runtime']` in production.

## Environment Variables

You can temporarily configure some parameters for environment variables, including:

* `PORT`, default 8000
* `HOST`, default localhost
* `ANALYZE`, whether to analyze the output bundle in `roadhog build`
* `ESLINT`, set `none` disable eslint check
* `TSLINT`, set `none` disable tslint check
* `COMPRESS`, set `none` to disable file compressing in `roadhog build`
* `BROWSER`, set `none` to disable browser open in `roadhog dev`

e.g. start dev server with port 3000,

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
