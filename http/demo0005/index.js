const log = console.log.bind(this);

const request = require('request');
// const $ = require('cheerio');
const cheerio = require('cheerio');
const fs = require('fs');

const ex = require('./ex');

let time = new Date;
const tmpTS = +time;
const fileName = `./tmps/tmp-${tmpTS}.html`;

const handleDate = () => {
  let y = time.getYear() + 1900;
  let m = time.getMonth() + 1;
  let d = time.getDate();

  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }

  return `${y}-${m}-${d}`;
};

const fileName2 = `./data/data-${handleDate()}.json`;


let getData = () => {
  let uri = 'https://www.zhihu.com/billboard';

  // console.log(uri);
  return new Promise(resolve => {
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
    console.log(`The file ${fileName} has been saved!`);
    try {
      ex.handleFile(fileName, fileName2);
    } catch(err) {
      console.log('err when ex.handleFile: ', err);
    }
  });

  // try {
  //   console.log('enter try');
  //   let objs = [];
  //   let $ = cheerio.load(res);
  //   // let elements = $('div', '.HotList-itemBody .HotList-itemTitle', data);
  //   let elements = $('.HotList-itemTitle', '.HotList-itemBody');
  //   // log(elements);
  //   elements.map((i, el) => {
  //     // log(`${i}: `, el);
  //     log(`${i}: ${cheerio.text($(el))}`);
  //     objs.push({
  //       id: i,
  //       title: cheerio.text($(el))
  //     });
  //   });

  //   fs.writeFile(fileName2, JSON.stringify(objs, null, 2), err => {
  //     if (err) throw err;
  //     console.log(`The file ${fileName2} has been saved!`);
  //   });
  // } catch(err) {
  //   console.log(err);
  // }
};

x();