/**
 * path.basename
 * path.delimiter
 * path.dirname
 * path.extname
 * path.format
 * path.isAbsolute
 * path.join
 * path.normalize
 * path.parse
 * path.posix
 * path.relative
 * path.resolve
 * path.sep
 */

const log = console.log.bind(console);
const path = require('path');

const testPathStr = '/foo/bar/baz/asdf/quux.html';
log('testPathString: ', testPathStr);

let test = path.basename(testPathStr, '.html');

log('path.basename: ', test);

// log(process.env.PATH);

// log(process.env.PATH.split(path.delimiter));

// let str = 'absds:dasdsa';

// log(str.split(path.delimiter));

log('path.dirname: ', path.dirname(testPathStr));

log('path.extname: ', path.extname(testPathStr));

let newPath = path.format({
  root: '~/ignored',
  dir: '/ABD',
  base: 'test.md',
  name: 'ignored',
  ext: '.ignored'
});

log('path.format: ', newPath);

log('path.join: ', path.join('/foo', 'bar', 'baz', 'abdf', 'acdf', 'addf', 'quux', '.', '..'));

log('path.normalize: ', path.join('/foo', '/////bar', 'baz', 'abdf', '////acdf', '//addf', 'quux', '.', '////.'));

// ┌─────────────────────┬────────────┐
// │          dir        │    base    │
// ├──────┬              ├──────┬─────┤
// │ root │              │ name │ ext │
// "  /    home/user/dir / file  .txt "
// └──────┴──────────────┴──────┴─────┘
log('path.parse: ', path.parse(testPathStr));

log('path.relative: ', path.relative(testPathStr, '/foo/bar/aaa/bbb/ccc'))
log('path.relative: ', path.relative(testPathStr, '/aaa/bar/aaa/bbb/ccc'))

log('path.resolve: ', path.resolve('/foo/bar', '/tmp/file/'));
log('path.resolve: ', path.resolve('wwwroot', '..', 'static_files/png/', '../gif/image.gif'));

log('path.seq: ', 'foo/bar/aaa/bbb/ccc'.split(path.sep));
