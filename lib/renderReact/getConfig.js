const path = require('path');
const { existsSync } = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cwd = process.cwd();

process.noDeprecation = true;

const getRrcConfig = () => {
  const jsRCFile = path.resolve(cwd, '.rrc.js');
  let config = {};
  if (existsSync(jsRCFile)) {
    config = require(jsRCFile);
    if (config.default) {
      config = config.default;
    }
  }
  return config;
}

module.exports = (port) => {
  const rrcConfig = getRrcConfig();
  const files = glob.sync('./rrc/*.+(js|jsx|)', { cwd });
  if (files.length === 0) { return console.error('Can\'t find any components in your project.'); };
  const entry = {};
  files.forEach((item) => {
    const file = item.replace(/.jsx?/, '');
    entry[file] = [
      `webpack-dev-server/client?http://0.0.0.0:${port}/`,
      'webpack/hot/only-dev-server',
      item,
    ];
  });
  const config = {
    mode: 'development',
    context: cwd,
    devtool: 'cheap-module-eval-source-map',
    entry,
    output: {
      filename: '[name].js',
    },
    externals: rrcConfig.externals,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react', 'stage-0']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer],
              },
            },
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer],
              },
            },
            'less-loader',
          ]
        },
        {
          test: /\.html$/,
          use: [
            'raw-loader'
          ]
        }
      ],
    },
    plugins: [
      // 允许错误不打断程序
      new webpack.NoEmitOnErrorsPlugin(),

      // 进度插件
      new webpack.ProgressPlugin((percentage, msg) => {
        const stream = process.stderr;
        if (stream.isTTY && percentage < 0.71) {
          stream.cursorTo(0);
          stream.write(`📦   ${msg}`);
          stream.clearLine(1);
        }
      }),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('development') },
        __DEV__: JSON.stringify(JSON.parse('true')),
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  }
  
  return config;
}
