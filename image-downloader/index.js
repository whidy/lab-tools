var https = require("https");
var fs = require("fs");

var server = https.createServer(function(req, res) {}).listen(50082);
const url =
  "https://personalbank.cib.com.cn/pers/creditCard/AddInYard/AddInImage";
const MAX = 500
let count = 0
const download = function() {
  return new Promise((resolve, reject) => {
    if (count === MAX)  {
      console.log('done')
      resolve('done')
      return
    }
    https.get(url, function(res) {
      var imgData = "";
      res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开

      res.on("data", function(chunk) {
        imgData += chunk;
      });

      res.on("end", function() {
        fs.writeFile(`./samples/${+new Date()}.jpg`, imgData, "binary", function(
          err
        ) {
          if (err) {
            reject(err)
          }
          count++
          console.log('next:' + count);
          resolve(wait());
        });
      });
    });
  })
}

download()
function wait(duration = 1000) {
  return new Promise((resolve, reject) => {
    // console.log('开始请求');
    setTimeout(() => {
      // console.log(`设定请求间隔等待时长为：${duration}ms`);
      resolve(download());
    }, duration);
  });
}
