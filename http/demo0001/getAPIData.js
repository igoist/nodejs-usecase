const http = require('http');
const fs = require('fs');

const fileName = 'data/data-lives.json';

http.get('http://localhost:3333/api/v1/lives?limit=9&max=11', res => {
  res.setEncoding('utf8');

  let html = '';

  res.on('data', chunk => {
    html += chunk;
  });

  res.on('end', () => {
    let list = JSON.parse(html);
    let wrap = {
      lives: list
    };
    fs.writeFile(fileName, JSON.stringify(wrap, null, 2), err => {
      if (err) throw err;
      console.log(fileName, 'has been saved!');
    });
  });
});
