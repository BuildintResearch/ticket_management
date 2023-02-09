var mysql = require('mysql')

var con = mysql.createPool({
    host: '13.126.200.203',
    port:'3306',
    user: 'buildint_master',
    password: '',
    database: 'buildint_master',
    connectionLimit:200,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    waitForConnections: true,
    timeout:1000
});
// con.connect(function(err){
//     if(err) throw err;
//     console.log('Database is connected successfully')
// });
module.exports=con