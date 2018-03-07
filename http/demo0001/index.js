/**
 * In this demo
 * use http.get to get content with the specific url, and then use the regex expression to match the pins
 */

const http = require('http');
// const cheerio = require('cheerio');
const fs = require('fs');

const url = 'http://huaban.com/search/?q=%E7%85%A7%E7%89%87%E5%A2%99&jegvhmak&page=1&per_page=20&wfl=1';

http.get(url, res => {

  // const { statusCode } = res;
  // const contentType = res.headers['content-type'];

  // let err;
  // if (statusCode !== 200) {
  //   error = new Error('请求失败。\n' +
  //                     `状态码: ${statusCode}`);
  // } else if (!/^application\/json/.test(contentType)) {
  //   error = new Error('无效的 content-type.\n' +
  //     `期望 application/json 但获取的是 ${contentType}`);
  // }
  // if (err) {
  //   console.error(error.message);
  //   // 消耗响应数据以释放内存
  //   res.resume();
  //   return;
  // }

  res.setEncoding('utf8');

  let html = '';

  res.on('data', chunk => {
    html += chunk;
  });

  res.on('end', () => {
    let ret = html.match(/page\[\"pins\"\].*;/g);
    ret = ret[0].slice(15);
    ret = ret.slice(0, ret.length - 1);
    fs.writeFile('map.json', JSON.stringify(JSON.parse(ret), null, 2), err => {
      if (err) throw err;
      console.log('The file has been saved!');
    });

    // let $ = cheerio.load(html);

    // $('.pin.wfc').each((index, i) => {
      // console.log(index, i);
    // });
  });

}).on('error', (e) => {
  console.error(`错误: ${e.message}`);
});;
