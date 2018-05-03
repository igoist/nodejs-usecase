const fs = require('fs');

const oldFileName = 'data/data-lives.json';
const newFileName = 'data/data-lives-handled.json';

fs.readFile(oldFileName, (err, data) => {
  if (err) throw err;
  let tmp = JSON.parse(data);
  for (let i = 0; i < tmp.length; i++) {
    tmp[i].banner = JSON.stringify(tmp[i].banner);
    tmp[i].course = JSON.stringify(tmp[i].course);
    tmp[i].extra = JSON.stringify(tmp[i].extra);
    delete tmp[i].category;
  }

  fs.writeFile(newFileName, JSON.stringify(tmp, null, 2), err => {
    if (err) throw err;
    console.log(newFileName, ' has been saved!');
  });
});
