const path = require('path');
const { existsSync } = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cwd = process.cwd();

process.noDeprecation = true;

const userPath = (p) => path.resolve(process.cwd(), p);
const thisPath = (p) => path.resolve(__dirname, '../../', p);

const getopts = () => {
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
  const opts = getopts();
  const files = glob.sync('./rrc/*.+(js|jsx|)', { cwd });
  if (files.length === 0) { console.error('Can\'t find any components in your project. Maybe you should run rrc init command first.'); return; };
  const entry = {};
  files.forEach((item) => {
    const file = item.replace(/(.\/rrc\/)|(.jsx?)/g, '');
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
    externals: opts.externals,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                thisPath('./node_modules/babel-preset-env'),
                thisPath('./node_modules/babel-preset-react'),
                thisPath('./node_modules/babel-preset-stage-0'),
              ]
            }
          }
        },
        {
          test: /\.less|\.css$/,
          exclude: [/node_modules/],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: !opts.disableCSSModules,
                localIdentName: '[local]__[hash:base64:5]',
                importLoaders: 1
              }
            },
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
          // antd style without css moudules and postcss
          test: /\.less|\.css$/,
          include: [/node_modules/],
          use: [
            'style-loader',
            { loader: 'css-loader' },
          ]
        },
        {
          test: /\.html$/,
          loader: require.resolve('file-loader'),
          options: {
            name: '[name].[ext]',
          },
        },
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
    resolve: {
      alias: opts.alias || {},
      extensions: [
        '.web.js',
        '.web.jsx',
        '.web.ts',
        '.web.tsx',
        '.js',
        '.json',
        '.jsx',
        '.ts',
        '.tsx',
        ...(opts.extraResolveExtensions || []),
      ],
      modules: [thisPath('./node_modules'), 'node_modules', 'src', 'rrc', ...(opts.extraResolveModules || []),]
    },
    resolveLoader: {
      modules: [thisPath('./node_modules'), 'node_modules']
    },
  }

  return config;
}
