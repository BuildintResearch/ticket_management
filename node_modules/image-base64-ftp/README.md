# image-base64-ftp

Description
===========
image-base64-ftp is function to generate base64 string format from images in FTP server.

File photos/images usually put on the folder project at backend server, for example  folder public/images, so backend server can serve easily images to the client. For now backend server is put on container with stateless environtment. File photos/images will put on FTP server.

To serve images from backend server to client, we can use format base64 and put on json format.

Install
=======
`npm install image-base64-ftp `


Dependencies
============

* [ftp package](https://www.npmjs.com/package/ftp)


Examples
========

    var img64=require('image-base64-ftp')

    var strhost:'127.0.0.1'
    var strusername:'username'
    var strpassword:'password'
    

    async function tesPhoto(){
         result= await img64.getImage64Ftp('store/photo.png',
         strhost,strusername,strpassword)
         console.log(result) // output base64
    }
    tesPhoto()



API
===

Methods
-------

* **getImage64Ftp**(< string >pathimagelocation, < string >ftphost, < string >ftpuser, < string >ftppassword] - get image and convert to base64 from ftp server using `await`.`pathimagelocation` can be a path from folder and name image in ftp server. `ftphost` ip address ftp server. `ftpuser` username ftp server. `ftppassword` password ftp server.



   

