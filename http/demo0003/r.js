const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const doubanArr = [
  {
    name: 'd00',
    param: '145219'
  },
  {
    name: 'd01',
    param: 'HZhome'
  },
  {
    name: 'd02',
    param: 'hzhouse'
  }
]

const doubanFlag = 2;

const fileName = `data190109/data-${ doubanArr[doubanFlag].name }-${ +new Date() }.json`;

// const url = 'https://cnodejs.org/api/v1/topics?page=1&tab=share&limit=2';
// const url = 'https://www.douban.com/group/topic/114702883/';
const perPage = 25;
let objs = [];

let count = 200;
// let flagArr = Array.apply(null, {length: count}).map(() => {
//   return 0;
// });

// let checkFlagArr = () => {
//   for (let i = 0; i < flagArr.length; i++) {
//     if (flagArr[i] === 1) {
//       return true;
//     }
//   }
//   return false;
// }

let getData = (page) => {
  return new Promise(resolve => {
    request({
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: `https://www.douban.com/group/${ doubanArr[doubanFlag].param }/discussion?start=${page * perPage}`,
        method: 'GET'
      }, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.

      let $ = cheerio.load(body);
      let tmpObjs = [];
      $('.olt tr .title a').each((index, i) => {
        console.log(`${ i.attribs.title }: ${ i.attribs.href }`);
        // console.log(page, index);
        tmpObjs.push({
          title: i.attribs.title,
          link: i.attribs.href
        });
      });
      resolve(tmpObjs);
    });
  });
};

// console.log(flagArr);
// console.log(checkFlagArr());

let saveFile = objs => {
  fs.writeFile(fileName, JSON.stringify(objs, null, 2), err => {
    if (err) throw err;
    console.log(fileName, 'has been saved!');
  });
  // console.log(objs);
};

let page = 0;

let wrap = async function(page) {
  try {
    let res = await getData(page);
    page = page + 1;
    objs.push(...res);
    console.log(`page${page} complete`);
    if (page < count) {
      setTimeout(() => {
        wrap(page);
      }, 2000);
    } else {
      console.log(`Task complete`);
      saveFile(objs);
    }
  } catch(err) {
    console.log(err);
    saveFile(objs);
  }
}

wrap(page);

