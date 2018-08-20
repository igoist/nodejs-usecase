const fs = require('fs');

// const fileKey = 'data-d00-1534493132065';
// const fileKey = 'data-d01-1534493150043';
const fileKey = 'data-d02-1534493160955';

const inputFileName = `./data/${ fileKey }.json`;
const outputFileName = `./data/${ fileKey }-translated.md`;

fs.readFile(inputFileName, (err, data) => {
  if (err) throw err;
  let tmp = JSON.parse(data);
  for (let i = 0; i < tmp.length; i++) {
    let tmpStr = `${ tmp[i].title }: ${tmp[i].link}\n`;
    // console.log(tmpStr);

    fs.appendFile(outputFileName, tmpStr, err => {
      if (err) throw err;
    });
  }
});


