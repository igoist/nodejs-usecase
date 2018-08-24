/**
 * Clojure 版本花瓣爬虫 junior demo0001 复刻
 * h1.js 用于爬去 /favorite/type/
 */

const request = require('request');
const fs = require('fs');


const perPage = 30;
let objs = [];

let countMax = 400;

let hArr = [
  {
    p1: 'boards',
    p2: '24893649',
    key: 'jl1p9rji',
  },
];

let hF = 0;

const fileName = `data/data-h1-${ hArr[hF].p1 }-${ hArr[hF].p2 }-${ +new Date() }.json`;
// const fileName = `data/data-h1-${ hArr[hF].p1 }-${ hArr[hF].p2 }-test.json`;

let handleData = data => {
  let regex = /page\[\"board\"\].*;/;
  if (regex.exec(data) !== null) {
    let tmp = regex.exec(data)[0];
    let subTmp = tmp.substr(16, tmp.length -17);
    return JSON.parse(subTmp).pins;
  } else {
    return null;
  }
};

let handleObjs = objs => {
  let tmpArr = [];

  for (let i = 0; i < objs.length; i++) {
    let obj = objs[i];

    let imgUrl = `http://hbimg.b0.upaiyun.com/${ obj.file.key }`;

    tmpArr.push({
      imgUrl,
      pin_id: obj.pin_id
    });
  }

  return tmpArr;
};

let getData = (page) => {
  let uri;
  if (page === 0) {
    uri = `http://huaban.com/${ hArr[hF].p1 }/${ hArr[hF].p2 }/`;
  } else {
    uri = `http://huaban.com/${ hArr[hF].p1 }/${ hArr[hF].p2 }/?${ hArr[hF].key }&max=${ objs[objs.length - 1].pin_id }&limit=${ perPage }&wfl=1`;
    // return [];
  }
  // console.log(uri);
  return new Promise(resolve => {``
    request({
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri,
        method: 'GET'
      }, function (error, response, body) {

      // console.log(body);
      let tmpObjs = handleData(body);
      // console.log(tmpObjs.pins);
      if (tmpObjs) {
        resolve(handleObjs(tmpObjs));
      } else {
        console.log('enter here');
        resolve([]);
      }
    });
  });
};

// getData(0);

let saveFile = objs => {
  fs.writeFile(fileName, JSON.stringify(objs, null, 2), err => {
    if (err) throw err;
    console.log(fileName, 'has been saved!');
  });
};

let page = 0;

let wrap = async function(page) {
  try {
    let res = await getData(page);
    page = page + 1;
    objs.push(...res);
    console.log(`page${page} complete`);
    if (page < countMax & res.length === perPage) {
      setTimeout(() => {
        wrap(page);
      }, 100);
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

