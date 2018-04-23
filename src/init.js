const glob = require('glob');
const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
const filterNonReactComponent = files =>
  files.filter(comPath => {
    const content = fs.readFileSync(path.join(cwd, comPath)).toString();
    return content.match(/(import React)|(from 'react')|(from "react")/) && (!content.match(/(from 'react-dom')|(from "react-dom")/));
  });
const src2rrc = files =>
  files.map(comPath =>
    comPath
      .replace(/^src\//, '')
      .replace(/\//g, '_')
      .replace(/_index|\.js/g, ''));

const init = () => {
  glob('src/**/*.js', (err, res) => {
    if (err) {
      console.log('Error', err);
    } else {
      // 过滤非 React 组件
      const filteredFiles = filterNonReactComponent(res);
      // 把 src 变成 rrc，顺便把 / 变成 _，把 index 去掉
      const rrcFiles = src2rrc(filteredFiles);

      // 创建 .rrc.js
      fs.writeFileSync(
        '.rrc.js',
        `export default {\n  entry: 'rrc/**/*.js',\n  disableCSSModules: true,\n};`,
      );

      // 创建 rrc 文件夹
      if (!fs.existsSync('rrc')) {
        fs.mkdirSync('rrc');
      }
      // 创建 page.html
      fs.writeFileSync(
        'rrc/page.html',
        `<div id="app"></div><script>document.write(\`<script src="\${location.search.replace('?c=', '')}.js"><\\/script>\`)</script>`,
      );
      // 创建 index.html
      fs.writeFileSync(
        'rrc/index.html',
        `温馨提示：如需修改组件的 props 或者引入第三方依赖，可以在 rrc 文件夹中找到同名的 js 文件来修改。<ul>${rrcFiles
          .map(fileName =>
              `<li><a href="page.html?c=${fileName}">${fileName}</a></li>`)
          .join('')}</ul>`,
      );
      // 创建 index.js
      fs.writeFileSync(
        'rrc/index.js',
        `import './index.html';\nimport './page.html';\n`,
      );
      // 创建 js 文件
      rrcFiles.forEach((fileName, i) => {
        const componentName = fileName.split('_')[
          fileName.split('_').length - 1
        ];
        if (!fs.existsSync(`rrc/${fileName}.js`)) {
          fs.writeFileSync(
            `rrc/${fileName}.js`,
            `import React, { Component } from 'react';
import { render } from 'react-dom';
import ${componentName} from '../${filteredFiles[i].replace('.js', '')}';

class App extends Component {
  state = {}
  render() {
    return (
      <div>
        <${componentName} />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));\n`,
          );
        }
      });
    }
  });
};

export default init;
