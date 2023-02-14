// imports
var PromiseFtp = require('promise-ftp');
var FTPClient = require('ftp');
var c = new FTPClient();
var express = require('express')
var flash = require('express-flash')
var session = require('express-session');
var img64 = require('image-base64-ftp')
var FTPStorage = require('multer-ftp')
const multer  = require('multer');
const {Base64Encode} = require("base64-stream");
// const fileUpload = require('express-fileupload');

// // custom ftp upload function
// function ftp_upload(dest,filename){
//     //make ftp connection
//     c.connect({
//       host: "85.25.130.56",
//       user: "buildint_master",
//       password: "buildint@2021"
//     });
//     console.log(filename)
//     //check if directory exists on ftp
//     c.on('ready', function(){
//       console.log('------ upload:ready ----------------');
//       dir = dest  // test dir
//       c.cwd(dir, (err) => {   // check dir exists
//         err ? c.mkdir(dir, () => {  // if not make dir
//           c.cwd(dir, (err) => {   // cd to dir
//             console.log('Uploading, dir made')  // upload if exists
//             c.put(dir,filename, (err, filelist)=>{
//                 console.log(filelist)
//               c.end()
//             })
//           })
//         })
//         : c.cwd(dir, (err) => {   // cd to dir
//           console.log('Uploading, dir exists')  // upload if exists
//           c.put(dir,filename, (err)=>{
//             c.end()
//           })
//         })
//       })
//     })
//   }

// multer upload function
let upload = multer({
    storage: new FTPStorage({
        ftp:{
            host:'85.25.130.56',
            user:'buildint_master',
            password: 'buildint@2021',
        }
    })
})
var bodyParser = require('body-parser')
var urlparser = bodyParser.urlencoded({ extended: true })
var db = require('./routes/database')
const cors = require("cors");
const { json, urlencoded } = require('express');
var app = express();
var checklist = require('./routes/checklist');
app.engine('html',require('ejs').renderFile)
app.use(express.static("public"));
app.use(express.static("views/checklist/"));

const corsOptions = {
    origin:"*",
    credential:true,
    optionSuccessStatus:200,
}
const oneDay = 1000 * 60 * 60 * 24;
app.use(cors(corsOptions))
app.use(flash());
app.use(session({ 
    secret: 'vunj0Ra]Pe6u:}ym9(-.wms;/sejvh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

//vars
global.user_type=''

// test routes
// app.get("/test", async function (req,res){
//     res.render('ticket/add_project.ejs')
// })

// checklist routes
app.use("/checklist",checklist);

//routes
app.get("/getimage", async function (req, res) {
    var path = req.query.path
    console.log(path)
    const ftp = new PromiseFtp();
    try {
      await ftp.connect({ host: '85.25.130.56', user: 'buildint_master', password: 'buildint@2021' })
      const stream = await ftp.get(path);
      await new Promise((resolve, reject) => {
        res.on("finish", resolve);
        stream.once("error", reject);
        stream.pipe(new Base64Encode()).pipe(res); // see here
    })
    } catch (e) {
        console.error(e);
    } finally {
        await ftp.end();
    }
  });

app.get('/', (req,res) => {
    if(req.session.loggedin){
        res.render('ticket/index.ejs')
    }
    else{
        res.redirect('/login')
    }
});

app.get('/adduser', (req, res) => {
    if(req.session.loggedin){
        res.render('ticket/add_user.ejs')
    }
    else{
        res.render('ticket/login.ejs',{ message: req.flash('loginMessage') })
    }
})

app.get('/addproject', (req, res) => {
    if(req.session.loggedin){
        res.render('ticket/add_project.ejs',{"message":""})
    }
    else{
        res.render('ticket/login.ejs',{ message: req.flash('loginMessage') })
    }
})

//issues page
app.get('/issues',(req,res) => {
    if(req.session.loggedin){
        res.render('ticket/issues.ejs')
    }
    else{
        res.render('ticket/login.ejs',{ message: req.flash('loginMessage') })
    }
})

// single issue page
app.get('/issuepage',(req,res) => {
    if(req.session.loggedin){
        res.render('ticket/issuepage.ejs')
    }
    else{
        res.render('ticket/login.ejs')
        // res.render('login.ejs',{ message: req.flash('loginMessage') })
    }
})

app.get('/create_ticket',(req,res) => {
    if(req.session.loggedin){
        res.render('ticket/ticket_gen.ejs')
    }
    else{
        res.render('ticket/login.ejs',{ message: req.flash('loginMessage') })
    }
})

// login route
app.get('/login', (req, res) => {
    if(req.session.loggedin){
        res.render('ticket/index.ejs',{user_type:user_type})
    }
    else{
        res.render('ticket/login.ejs',{ message: req.flash('loginMessage') })
    }
})

// login route
app.post('/loginpost', urlparser, (req, res) => {
    var {email, pass} = req.body
    db.query('SELECT * FROM users WHERE usermail = ? AND pass = ?',[email, pass], function(err, rows, fields){
        user_type = rows[0]['user_type']
        console.log(user_type)
        if(err) throw err
        if(rows.length <= 0){
            console.log('username/pass not found',rows)
            req.flash('error','Please enter correct email and password')
            res.redirect('/login')
        }
        else{       
            console.log('user found',rows[0]['user_id'])
            req.session.loggedin = true;
            res.redirect('/')
        }
    })
})

// logout route
app.get('/logout', function (req, res){
    req.session.destroy();
    res.redirect('/login')
})


// insert ticket to db, add user, add project
app.post('/posturl/:form',urlparser, upload.any(),async (req, res,next) => {
    console.log("Files : ",req.files)
    var form = req.params.form
        if(form == 'ticket'){
            if(req.files!=null){
                let file_name_list = "";
                for(i=0;i<req.files.length;i++){        
                    file_name_list += req.files[i]['path']+";"
                }
                file_name_list = file_name_list.slice(0, -1)
                req.body['attachments'] = file_name_list;
            }
            var sql = 'INSERT INTO tickets SET ?';
            const formData = req.body
            console.log("URL POST : ",formData)
            db.query(sql, formData, function(err, data){
            if(err) throw err;
            console.log("User data inserted successfully")
            })  
            res.redirect('/create_ticket')
        }

    if(form == 'adduser'){
        const {fname,lname,usermail, pass, dept,user_type, mobileno} = req.body
        console.log(req.body)
        db.query('INSERT INTO users SET ?',{fname:fname,lname:lname,usermail:usermail,pass:pass,dept:dept,user_type:user_type,mobileno:mobileno})
        res.redirect('/adduser')
    } 
    if(form == 'addproject'){
        db.query('INSERT INTO projects SET ?', req.body, function (err, rows, fields){
            if(err) {throw err}
            else{
                console.log('Project Added Successfully')
                // generate ticket to service team to perform site survey
                obj = {userid: '36',
                subject: 'Site Survey',
                project: req.body['project_name'],
                location: req.body['location_name'],
                dept: 'Service',
                status: 'POC',
                assignee: '40',
                priority: 'High',
                due_date: '',
                description: 'Complete the site survey and upload the checklist',
                attachments: 'none'}
                db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                    if(err){throw err}
                    else{
                        console.log('Ticket generated !!!')
                        res.render('ticket/add_project.ejs',{"message":req.body})
                    }
                })
                
            }
        })
    }
    if(form == 'comment'){
        if(req.files!=null){
            let file_name_list = "";
            for(i=0;i<req.files.length;i++){
                file_name_list += req.files[i]['path']+";"
            }
            file_name_list = file_name_list.slice(0, -1)
            req.body['attachments'] = file_name_list;
        }
        const {tkid,description,user_id,attachments} = req.body
        console.log(req.body)
        db.query('INSERT INTO ticket_followup SET ?',{tkid:tkid,description:description,user_id:user_id,attachments:attachments})
        res.redirect('back');
    }
})


// fetch data from db using * and where conditions
app.get('/getdata/:table/:column/:where', function(req, res){
    var table = req.params.table;
    var column = req.params.column;
    var where = req.params.where;
    if(where == 'none' && column !='none'){
        query = `SELECT ${column} FROM ${table}`
        db.query(query, function(err, rows, fields){
            if(err) console.log(err)
            res.send(rows)
        })
    }
    else if(where=='none' && column=='none'){
        query = `SELECT * FROM ${table}`
        db.query(query, function(err, rows, fields){
            if(err) console.log(err)
            res.send(rows)
        })
    }
    else{
        db.query('SELECT * from '+table+' where '+column+' = "'+where+'";', function(err, rows, fields){
            if(err) throw err
            res.send(rows)
        })
    }
})

app.get('/gettable/:ass', function(req,res){
    var ass = req.params.ass
    db.query('SELECT * FROM tickets WHERE assignee = '+ass, function(err, rows, fields){
        if(err) throw err
        res.send(rows)
    })
})

app.get('/issuepage/:id', function(req, res){
    var id = req.params.id
    db.query('SELECT * from ticket_followup WHERE tkid = '+id, function(err, rows1, fields){
        if(err) throw err
    db.query('SELECT * FROM tickets WHERE tkid = '+id, function(err, rows, fields){
        if(err) throw err
    db.query('SELECT * from users', function(err, rows2, fields){
        if(err) throw err
        res.render('ticket/issuepage.ejs',{'data':rows,'followup':rows1,'users':rows2})
    })
    })
    })
})

app.get('/update/:id/:action', function(req, res){
    var id = req.params.id
    var action = req.params.action
    console.log(id, action)
    if(action == 'solved'){
        db.query('UPDATE tickets SET solved = 1 where tkid = '+id)
        res.redirect('back');
    }   
    if(action == 'reopen'){
        db.query('UPDATE tickets SET solved = 0 where tkid = '+id)
        res.redirect('back');
    }  
    if(action == 'del'){
        db.query('DELETE FROM tickets WHERE tkid = '+id)
        res.redirect('/mytickets')
    }  
})

app.get('/mytickets', function(req, res){
    if(req.session.loggedin){
        res.render('ticket/mytickets.ejs')
    }
    else{
        res.render('login.ejs',{ message: req.flash('loginMessage') })
    }
})

app.get('/history', function(req, res){
    if(req.session.loggedin){
        res.render('ticket/history.ejs')
    }
    else{
        res.render('ticket/login.ejs',{ message: req.flash('loginMessage') })
    }
})

//ftp file route // unused route
// app.post('/files', upload.any(),async (req, res, next) => {
//     let file_name_list = "";
//     // req.files[0]['path'] = './upload/'+req.files[0]['path']
//     if(req.files == null){
//         res.send('no files selected')
//     }
//     else{
//         for(i=0;i<req.files.length;i++){
//             file_name_list += req.files[i]['path']+";"
//         }
//         file_name_list = file_name_list.slice(0, -1)
//         console.log(file_name_list)
//         // res.send("File upload successfull ")
//         res.end('success')
//     }
// });

app.get('/fetchimg/:tkid', async(req,res) => {
    var tkid = req.params.tkid
    db.query('SELECT * from tickets WHERE tkid='+tkid, function(err, rows, fields){
        if(err) throw err
        res.send(rows)
    })
})
app.get('/fetchimg1/:tkid', async(req,res) => {
    var tkid = req.params.tkid
    db.query('SELECT * from ticket_followup WHERE comment_id='+tkid, function(err, rows, fields){
        if(err) throw err
        res.send(rows)
    })
})

//server
var server = app.listen(5500, function(){
    console.log('app listening to port 5500')
});