var PromiseFtp = require('promise-ftp');
const {Base64Encode} = require("base64-stream");
var FTPClient = require('ftp');
var c = new FTPClient();
var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var urlparser = bodyParser.urlencoded({ extended: true })
// c.connect({
//   host: "85.25.130.56",
//   user: "buildint_master",
//   password: "buildint@2021"
// });

// give list of all files in particular ftp directory
// c.on('ready', function() {
//   let dir = "ticketa"
//   try{
//     c.list(dir,function(err, list) {
//       if (err) {console.log(err)}
//       else{
//        for(i=0;i<list.length;i++){
//          console.dir(list[i].name);
//        }
//       }
//       c.end();
//      });
//   }
//   catch(err){
//       console.log("done")
//   }
//  });

 //check if directory exists on ftp

 app.get("/getimage", async function (req, res) {
  var path = req.url.path
  console.log(path)
  const ftp = new PromiseFtp();
  console.log(req.body)
  try {
    await ftp.connect({ host: '85.25.130.56', user: 'buildint_master', password: 'buildint@2021' })
    
    const stream = await ftp.get(req.body['path']);
    await new Promise((resolve, reject) => {
      res.on("finish", resolve);
      stream.once("error", reject);
      stream.pipe(new Base64Encode()).pipe(res); // see here
  });
  } catch (e) {
    console.error(e);
  } finally {
    await ftp.end();
  }
});

var server = app.listen(5500, function(){
  console.log('app listening to port 5500')
});