const http = require('http');
const fs = require('fs');

const fileName = 'data/data-anchors.json';
const limit = 10;

import info from './info';

let anchors = [];

let headers = {
  'Cookie': info.cookie,
};

let getData = (pageNum) => {
  return new Promise(resolve => {
    let options = {
      hostname: 'live.huaban.com',
      path: `/admin/anchor/api/list/?page=${pageNum}`,
      method: 'GET',
      headers
    };

    http.get(options, res => {
      res.setEncoding('utf8');

      let html = '';

      res.on('data', chunk => {
        html += chunk;
      });

      res.on('end', () => {
        let list = JSON.parse(html);
        resolve(list.hits);
      });
    });
  });
};

let page = 1;

let saveFile = objs => {
  fs.writeFile(fileName, JSON.stringify(objs, null, 2), err => {
    if (err) throw err;
    console.log(fileName, 'has been saved!');
  });
};

let wrap = (page) => {
  getData(page).then(res => {
    if (res.length === limit) {
      console.log(`page${page} complete`);
      page = page + 1;
      anchors.push(...res);
      wrap(page);
    } else {
      anchors.push(...res);
      console.log(`page${page} complete`);
      saveFile(anchors);
    }
  });
};

wrap(page);
