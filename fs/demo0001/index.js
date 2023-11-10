const fs = require('fs');

const length = 16;

let objs = [];

for (let i = 0; i < length; i++) {
  for (let j = 0; j < length; j++) {
    for (let k = 0; k < length; k++) {
      const y = '#' + i.toString(16) + j.toString(16) + k.toString(16);
      objs.push({
        hex: y,
        test: 'eest',
        obj: {
          a: 'a',
          b: 'b'
        }
      });
    }
  }
}

// console.log(objs);
// console.log(JSON.stringify(objs));
const fileName = './map.json';

fs.writeFile(fileName, JSON.stringify(objs, ['hex', 'obj', 'a'], 2), err => {
  if (err) throw err;
  console.log('The file has been saved!');
});


// fs.readFile(fileName, (err, data) => {
//   if (err) throw err;
//   // console.log(JSON.parse(data));
//   let tmp = JSON.parse(data);
//   console.log(tmp.)
// });


// maybe the file is not exists
// fs.exists(fileName, exists => {
//   if (exists) {
//     fs.readFile(fileName, (err, data) => {
//       if (err) throw err;
//       // console.log(JSON.parse(data));
//       let tmp = JSON.parse(data);
//       console.log(tmp.)
//     });
//   }
// });
