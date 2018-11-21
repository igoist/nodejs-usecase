var cheerio = require('cheerio');
var http = require('https');
var iconv = require('iconv-lite');
const fs = require('fs');

const perPage = 18;
const count = 10;

let objs = [];
const fileName = 'data/bilibili.json';

let saveFile = objs => {
  fs.writeFile(fileName, JSON.stringify(objs, null, 2), err => {
    if (err) throw err;
    console.log(fileName, 'has been saved!');
  });
  console.log(objs);
};


let getData = (page) => {
  return new Promise(resolve => {
    // https://bangumi.bilibili.com/media/web_api/search/result?season_version=-1&area=-1&is_finish=-1&copyright=-1&season_status=-1&season_month=-1&pub_date=-1&style_id=-1&order=3&st=1&sort=0&page=1&season_type=1&pagesize=20
    var url = `https://bangumi.bilibili.com/media/web_api/search/result?season_version=-1&area=-1&is_finish=-1&copyright=-1&season_status=-1&season_month=-1&pub_date=-1&style_id=-1&order=3&st=1&sort=0&page=${ page }&season_type=1&pagesize=${ perPage }`;

    http.get(url, function(res) {
      var chunks = [];

      res.on('data', function(chunk) {
        chunks.push(chunk);
      });

      res.on('end', function() {
        var titles = [];
        var html = iconv.decode(Buffer.concat(chunks), 'utf8');
        const result = JSON.parse(html);
        result.result.data.map((item, index) => {
          console.log(index, item.title);
        })
        resolve(result.result.data);
      });
    });
  });
};


let page = 1; // page start with 1
const duration = 1000;

let wrap = async function(page) {
  try {
    let res = await getData(page);
    page = page + 1;
    objs.push(...res);
    console.log(`page${page} complete`);
    if (page < count) {
      setTimeout(() => {
        wrap(page);
      }, duration);
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

/**
 * area: '日本',
 * arealimit: 1194,
 * attention: 1874581,
 * bangumi_id: 0,
 * bgmcount: '11',
 * cover: 'http://i0.hdslb.com/bfs/bangumi/f24f032372642f35257f66478ccfa51800b504a8.jpg',
 * danmaku_count: 601830,
 * ep_id: 254027,
 * favorites: 1874581,
 * is_finish: 0,
 * lastupdate: 1541079000,
 * lastupdate_at: '2018-11-01 21:30:00',
 * new: false,
 * play_count: 28886839,
 * pub_time: '',
 * season_id: 22504,
 * season_status: 2,
 * spid: 0,
 * square_cover: 'http://i0.hdslb.com/bfs/bangumi/c5d7c4d48d218bb05f2b63af5227d3e80b081793.jpg',
 * title: '卫宫家今天的饭',
 * viewRank: 0,
 * weekday: -1
 */
