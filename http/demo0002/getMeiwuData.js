const http = require('http');
const fs = require('fs');


function PostCode(codestring) {
  // Build the post string from an object
  // An object of options to indicate where to post to
  let post_data = JSON.stringify({
    "limit": 2, // 每页显示数据
    "start": 3 // 分页开始位置
  });

  var post_options = {
      host: 'meiwu.co',
      port: '80',
      path: '/r/huaban/getBestGoods',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();
}


PostCode('');
