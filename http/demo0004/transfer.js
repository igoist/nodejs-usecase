const fs = require('fs');

const fileKey = 'data-h1-1534745330067';

const inputFileName = `./data/${ fileKey }.json`;
const outputFileName = `./data/${ fileKey }-translated.md`;

fs.readFile(inputFileName, (err, data) => {
  if (err) throw err;
  let tmp = JSON.parse(data);
  for (let i = 0; i < tmp.length; i++) {
    let tmpStr = `${ tmp[i].pin_id }: ${tmp[i].imgUrl}\n`;
    console.log(tmpStr);

    // fs.appendFile(outputFileName, tmpStr, err => {
    //   if (err) throw err;
    // });
  }
});


