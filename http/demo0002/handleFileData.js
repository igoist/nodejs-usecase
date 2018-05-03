const fs = require('fs');

const oldFileName = 'data/data-files.json';
const newFileName = 'data/data-files-handled.json';

fs.readFile(oldFileName, (err, data) => {
  if (err) throw err;
  data = JSON.parse(data);
  let regex = /\/\/(\w+-\w+)\.b0\.upaiyun\.com\/(\w+)/;

  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].url);
    let ret = regex.exec(data[i].url);

    let bucket = ret[1];
    let key = ret[2];

    // console.log(bucket, key);

    data[i].bucket = bucket;
    data[i].key = key;
    delete data[i].url;
  }

  fs.writeFile(newFileName, JSON.stringify(data, null, 2), err => {
    if (err) throw err;
    console.log(newFileName, ' has been saved!');
  });
});
