var fs = require('fs');
var FTPClient = require('ftp');
var c = new FTPClient();

let base64 = ''

var ftp_con = c.connect({
    host: "85.25.130.56",
    user: "buildint_master",
    password: "buildint@2021"
  });

c.on('ready', function() {
  c.get('/test.jpg', function(err, stream) {
    //    var content = '';
       
       stream.on('data', function(chunk) {
        //    content = chunk.toString();
           base64 += Buffer.from(chunk.toString(), 'binary').toString('base64');
       });
       stream.on('end', function() {
           // content variable now contains all file content. 
            console.log(base64)
       });
  })
});

module.exports = ftp_con