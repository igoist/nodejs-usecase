/**
 * fs.unlink
 * fs.stat
 */

const log = console.log.bind(console);

const fs = require('fs');


// fs.unlink('./ddd', err => {
//   if (err) throw err;
//   log('success')
// })


// log(fs.stat('./index.js', (err, stats) => {
//   if (err) throw err;
//   log(stats);
// }));


log(process.cwd());
