var  http = require('http'),
     url = require('url'),
     fs = require("fs")

var host = 'http://hrs.ucweb.local/uchr/Portal/EPhoto.aspx?objname=3896A66628A6475847B66878381887C678&ID=3302';
var html = [];
for(var i = 2000; i<4100;i++ ){
  host = 'http://hrs.ucweb.local/uchr/Portal/EPhoto.aspx?objname=3896A66628A6475847B66878381887C678&ID='+i;
  getFile(host,'D://pic2/'+i+'.png')
}

console.log('------------done!----------------');

/**
 * 远程下载文件
 * @param   {String}    url   文件远程url
 * @param   {String}    fpath 储存地址
 * @return  {Undefined}       无返回值
 * @private
 */
function getFile(url,fpath){
  // 检测是否存在
  // @todo 比起检测文件，读查数据库是否更好？
  try{
    fs.exists(
      fpath
      ,function(has){
        if(has){
          // 存在
          console.log("[FILE EXIST]");
          return;
        }
        // 创建流
        var file = fs.createWriteStream(fpath);
        // 获取文件
        httpGetFile(url,file,3);
      }
    );
  }catch(e){

  }
}

function httpGetFile(url,file,reTry){
  try
  {
    return http.get(url,function(res){
      res
        .on("data",function(data){
          // 写文件
          file.write(data);
        })
        .on("end",function(){
          // 完成
          file.end();
        });
    })
      .on("error",function(e){
        console.log("Get file FAILED: ",e.message);
      });
  }catch(e){

  }
}




http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname;
  path = path == '/' ? 0 : parseInt(path.slice(1));
  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(html[path]);
}).listen(3000);

console.log('Server running at localhost:3000');