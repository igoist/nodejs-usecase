const fs = require('fs');
const readline = require('readline');

const inputFileName = './example.md';
const fileName = './data/result.json';
let objs = [];


var lineReader = readline.createInterface({
  input: fs.createReadStream(inputFileName)
});


let saveFile = objs => {
  fs.writeFile(fileName, JSON.stringify(objs, null, 2), err => {
    if (err) throw err;
    console.log(fileName, 'has been saved!');
  });
  // console.log(objs);
};


lineReader.on('line', function (line) {
  // console.log('Line from file:', line);
  // var result = line.match(/\(([^)]*)\)/);
  // var result = line.match(/\[([^)]*)\]/);
  // var result = line.match(/\d\d\d\d\.\d\d\.\d\d/);

  let result = line.match(/(\d\d\d\d\.\d\d\.\d\d).*\[([^)]*)\]\(([^)]*)\)/);
  if (result) {
    // console.log(result[1], result[2], result[3]);
    objs.push({
      date: result[1],
      title: result[2],
      link: result[3],
    });
  }
});

lineReader.on('close', function (line) {
  // saveFile(objs);
  console.log(objs);
});
