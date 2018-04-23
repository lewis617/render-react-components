import { join } from 'path';
import registerBabel from 'af-webpack/registerBabel';
import excapeRegExp from 'lodash.escaperegexp';

export default function(babelPreset, opts) {
  const { configOnly, disablePreventTest, ignore, cwd } = opts;
  const files = [
    '.roadhogrc.mock.js',
    '.rrc.js',
    'webpack.config.js',
    'mock',
    'src',
    'rrc',
  ].map(file => {
    return excapeRegExp(join(cwd, file));
  });
  const only = configOnly ? [new RegExp(`(${files.join('|')})`)] : null;
  console.log(only);
  registerBabel({
    only,
    ignore,
    babelPreset,
    disablePreventTest,
  });
}
