const log = console.log.bind(this);

const cheerio = require('cheerio');
const fs = require('fs');

// const fileName = `./tmps/tmp-1588819365867.html`;
let objs = [];

const handleFile = (fileName, resultName) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) throw err;
    let $ = cheerio.load(data);

    let el = $('script#js-initialData')[0];
    // log(el.children[0].data);
    let obj = JSON.parse(el.children[0].data);
    let hotList = obj.initialState.topstory.hotList;
    hotList.map((item, i) => {
      // if (i > 0) {
      //   return ;
      // }
      // console.log(i, item);
      let t = item.target;
      let title = t.titleArea.text;
      let excerpt = t.excerptArea.text;
      let link = t['link']['url'];
      let img = t['imageArea']['url'];

      // console.log(title);
      // console.log(excerpt);
      // console.log(link);
      // console.log(img);
      objs.push({
        title,
        excerpt,
        link,
        img
      });
    });

    let tmpFileName = resultName || 'data/test.json';

    fs.writeFile(tmpFileName, JSON.stringify(objs, null, 2), (err) => {
      if (err) throw err;
      console.log(`The file ${tmpFileName} has been saved!`);
    });
  });
};

// handleFile(fileName);

exports.handleFile = handleFile;

// CjcIABADGgg0OT|YxNDU4NiCGgcr|1BTBFOIQ1QAByCTM5M|zAxMjA4Nn|gAqgEJYmlsbGJvYXJk0gEA
// CjcIABADGgg0OT|U4MDIwMyDciMb|1BTBNOKUbQAFyCTM5M|jg1NzM2M3|gAqgEJYmlsbGJvYXJk0gEA
// CjcIABADGgg0OT|YxNjU5OCD9k8r|1BTB5OM8eQAJyCTM5M|zAyMDk1NX|gAqgEJYmlsbGJvYXJk0gEA
// CkQIABADGgg0OT|YzMjQzMyDXsMv|1BTDkAjj5SEADcgkzOTMwOTIwOTB4AKoBCWJpbGxib2FyZNIBAPIBCQgBEgV6aGlsaQ
