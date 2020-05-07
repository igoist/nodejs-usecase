const log = console.log.bind(this);

const request = require('request');
// const $ = require('cheerio');
const cheerio = require('cheerio');
const fs = require('fs');

const tmpTS = +new Date();
const fileName = `./tmp-${tmpTS}.html`;



let getData = () => {
  let uri = 'https://www.zhihu.com/billboard';

  // console.log(uri);
  return new Promise(resolve => {``
    request({
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
          'Content-Type': 'text/html; charset=utf-8'
        },
        uri,
        method: 'GET'
      }, function (error, response, body) {
      // let tmpObjs = handleData(body);
      // if (tmpObjs) {
      //   resolve(handleObjs(tmpObjs));
      // } else {
      //   console.log('enter here');
      //   resolve([]);
      // }
      log('here error: ', error);
      resolve(body);
    });
  });
};

let x = async () => {
  let res = await getData();

  fs.writeFile(fileName, res, err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  try {
    console.log('enter try')
    let $ = cheerio.load(res);
    // let elements = $('div', '.HotList-itemBody .HotList-itemTitle', data);
    let elements = $('.HotList-itemTitle', '.HotList-itemBody');
    // log(elements);
    elements.map((i, el) => {
      // log(`${i}: `, el);
      log(`${i}: ${cheerio.text($(el))}`);
    });
  } catch(err) {
    console.log(err);
  }
};

x();


// fs.readFile(fileName, 'utf8', (err, data) => {
//   if (err) throw err;
//   // log(data, typeof data);
//   let $ = cheerio.load(data);
//   // let elements = $('div', '.HotList-itemBody .HotList-itemTitle', data);
//   let elements = $('.HotList-itemTitle', '.HotList-itemBody');
//   // log(elements);
//   elements.map((i, el) => {
//     // log(`${i}: `, el);
//     log(`${i}: ${cheerio.text($(el))}`);
//   });
// });
