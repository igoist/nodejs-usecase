const fs = require('fs');

const fileKey = 'data-h1-boards-24893649-test';

const inputFileName = `./data/${ fileKey }.json`;
const outputFileName = `./data/${ fileKey }-translated.md`;

const renderLine = (msg) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(msg);
      resolve(true);
    }, 10);
  })
}

let tmp;
let i = 0;

const wrap = async function() {
  try {
    if (i < tmp.length) {
      let res = await renderLine(`${ tmp[i].pin_id }: ${tmp[i].imgUrl}`);
    } else if (i < tmp.length + 1000) {
      await renderLine(`第${i - tmp.length}位群友大喊: 裤哥是煞笔！`);
    }
    i = i + 1;
    if (i < tmp.length + 1000) {
      wrap();
    } else {
      console.log(`Task complete`);
    }
  } catch(err) {
    console.log(err);
  }
}

fs.readFile(inputFileName, (err, data) => {
  if (err) throw err;
  tmp = JSON.parse(data);
  // for (let i = 0; i < tmp.length; i++) {
  //   let tmpStr = `${ tmp[i].pin_id }: ${tmp[i].imgUrl}\n`;
  //   console.log(tmpStr);

  //   // fs.appendFile(outputFileName, tmpStr, err => {
  //   //   if (err) throw err;
  //   // });
  // }

  wrap();
});


