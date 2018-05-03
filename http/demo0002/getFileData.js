const http = require('http');
const fs = require('fs');

const fileName = 'data/data-files.json';

// import info from './info';

// let headers = {
//   'Cookie': info.cookie,
// };

let getData = (num) => {
  return new Promise(resolve => {
    let options = {
      hostname: 'live.huaban.com',
      path: `/api/v1/live/${num}`,
      method: 'GET',
      // headers
    };

    http.get(options, res => {
      res.setEncoding('utf8');

      let html = '';

      res.on('data', chunk => {
        html += chunk;
      });

      res.on('end', () => {
        let res = JSON.parse(html);
        resolve(res);
      });
    });
  });
};



/**
 * main
 *
 */

let arrLive = [];
let arrFilesId = {};
let arrFiles = [];

let attrTable = [
  'banner',
  'background',
  'mobileBackground',
  'title',
  'mobileTitle',
  'imgPast'
];

let wrap = (n) => {

  getData(arrLive[n]).then(res => {
    if (n < arrLive.length) {
      console.log(`page${n} complete`);

      /**
       * banner
       * background
       * mobileBackground
       * title
       * mobileTitle
       * imgPast
       * anchor.avatar
       */

      for (let i = 0; i < 6; i++) {
        if (!arrFilesId[res[attrTable[i]].id]) {
          arrFiles.push(res[attrTable[i]]);
          arrFilesId[res[attrTable[i]].id] = res[attrTable[i]].id;
        }
      }

      if (!arrFilesId[res.anchor.avatar.id]) {
        arrFiles.push(res.anchor.avatar);
        arrFilesId[res.anchor.avatar.id] = res.anchor.avatar.id;
      }

      // console.log(arrFilesId);
      // console.log(arrFiles);

      n = n + 1;
      wrap(n);
    } else {
      console.log(`page${n} complete`);
      // console.log(arrFilesId);
      saveFile(arrFiles);
    }
  });
};

fs.readFile('data/data-lives.json', (err, data) => {
  if (err) throw err;

  data = JSON.parse(data);

  for (let i = 0; i < data.length; i ++) {
    arrLive.push(data[i].id);
  }
  // console.log(arrLive);

  wrap(0);
});

let saveFile = objs => {
  fs.writeFile(fileName, JSON.stringify(objs, null, 2), err => {
    if (err) throw err;
    console.log(fileName, 'has been saved!');
  });
};
