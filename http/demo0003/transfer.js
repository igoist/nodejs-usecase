const fs = require('fs');



fs.readFile('./data/data-1534387199968.json', (err, data) => {
  if (err) throw err;
  let tmp = JSON.parse(data);
  for (let i = 0; i < tmp.length; i++) {
    console.log(`${ tmp[i].title }: ${tmp[i].link}`);
  }
});
