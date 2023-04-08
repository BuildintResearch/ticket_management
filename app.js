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
var mailer = require('./mailer')

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
const { json, urlencoded, query } = require('express');
var app = express();
// app.use(express.json());       
// app.use(express.urlencoded({extended: true})); 
var checklist = require('./routes/checklist');
app.use(express.static("./views/ticket/"));
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

app.get('/dashboard', (req, res) => {
    if(req.session.loggedin){
        let query = "SELECT  count(*) 'total_tickets' , sum(CASE WHEN solved = 1 THEN 1 ELSE 0 END) 'solved_tickets', sum(CASE WHEN (date(convert_tz(created_at, '-00:00','-05:30'))) = CURDATE() THEN 1 ELSE 0 END) 'opened_today', sum(CASE WHEN (date(convert_tz(created_at, '-00:00','-05:30'))) = CURDATE() and solved = 1 THEN 1 ELSE 0 END) 'solved_today' FROM tickets t ;"
        db.query(query, function(err, rows, fields){
            db.query("SELECT (SELECT COUNT(*) FROM projects WHERE category='POC')'POC_Count' ,(SELECT COUNT(*) FROM survey s) 'survey_count', (SELECT COUNT(*) FROM site_survey ss) 'site_survey_count', (SELECT COUNT(*) FROM software s2) 'sites_active', (SELECT * FROM (SELECT sum(izion_count+piazza_count+smart_meter_count+wifi_hotspot_count)'device_active' FROM site_survey ss)x)'device_count' FROM dual;;", function(err,rows1,fields){
                db.query("SELECT priority, count(*) 'count' FROM tickets group by priority;", function(err, rows2, fields){
                    db.query("SELECT * FROM projects order by 1 desc limit 10", function(err,rows3,fields){
                        db.query("SELECT sum(CASE WHEN dept = 'Service' and solved = 0 THEN 1 ELSE 0 END)'service', sum(CASE WHEN dept = 'Data Analyst' and solved = 0 THEN 1 ELSE 0 END)'data', sum(CASE WHEN dept = 'Software' and solved = 0 THEN 1 ELSE 0 END)'software', sum(CASE WHEN dept = 'Project' and solved = 0 THEN 1 ELSE 0 END)'project' from tickets;", function(err,rows4,fields){
                            console.log(rows,rows1,rows2,rows3,rows4[0])
                            res.render('ticket/dashboard.ejs',{'ticket_data':rows[0],'project_data':rows1[0],'priority':rows2,'project_details':rows3,'ticket_seg':rows4[0]})
                        })
                    })
                })
            })
        })
    }
    else{
        res.redirect('/login')
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
            assignee = req.body['assignee']
            req.body['assignee'] = assignee.join()
            delete assignee
            req.body['created_at'] = null;
            var sql = 'INSERT INTO tickets SET ?';
            const formData = req.body
            console.log("URL POST : ",formData)
            db.query(sql, formData, function(err, data){
            if(err){throw err}
            else{
                console.log("User data inserted successfully")
                // generate ticket mail to concerned person
                db.query("SELECT * FROM users WHERE user_id IN ("+req.body['assignee']+")", function(err,rows,fields){
                    if(err){throw err}
                    else{
                        let user_mail = []
                        console.log(rows)
                        for(i=0;i<rows.length;i++){
                            user_mail.push(rows[i]['usermail'])
                        }
                        mailer.ticket_mail(user_mail,req.body)
                    }
                })
                // mailer.ticket_mail(formData['assignee'])
            }
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
        console.log(req.body)
        if(req.body['category']=="POC"){
            req.body['checklist_survey']='1'
            req.body['checklist_monitoring']='1'
            req.body['checklist_controlling']='1'
            req.body['checklist_inst']='0'
            console.log(req.body)
            db.query('INSERT INTO projects SET ?', req.body, function (err, rows, fields){
                if(err) {throw err}
                else{
                    db.query('SELECT project_id from projects order by 1 limit 1', function(err,rows1,fields){
                        console.log('Project Added Successfully')
                        obj = {userid: '44',
                        project_id:rows1[0]['project_id'],
                        subject: 'Site Survey',
                        project: req.body['project_name'],
                        location: req.body['location_name'],
                        city: req.body['city_name'],
                        dept: 'Project Engineer',
                        status: 'POC',
                        assignee: '40,39',
                        priority: 'High',
                        ticket_type:"project",
                        due_date: '',
                        description: 'Complete the site survey for mentioned location and upload the checklist',
                        attachments: 'na',
                        ticket_role : '1',
                        created_at : null}
                        db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                            if(err){throw err}
                            else{
                                console.log('Ticket generated !!!')
                                res.render('ticket/add_project.ejs',{"message":req.body})
                            }
                        })
                    })
                    
                        }
                    })
                }
                
        if(req.body['category']=="Live"){
            req.body['checklist_survey']='1'
            req.body['checklist_monitoring']='0'
            req.body['checklist_controlling']='0'
            req.body['checklist_inst']='1'
            db.query('INSERT INTO projects SET ?', req.body, function (err, rows, fields){
                if(err) {throw err}
                else{
                    db.query('SELECT project_id from projects order by 1 limit 1', function(err,rows1,fields){
                    console.log('Project Added Successfully')
                        obj = {userid: '44',
                        project_id:rows1[0]['project_id'],
                        subject: 'Site Survey',
                        project: req.body['project_name'],
                        location: req.body['location_name'],
                        city: req.body['city_name'],
                        dept: 'Project Engineer',
                        status: 'Live',
                        assignee: '40,39',
                        priority: 'High',
                        ticket_type:"project",
                        due_date: '',
                        description: 'Complete the site survey for mentioned location and upload the checklist',
                        attachments: 'na',
                        ticket_role : '1',
                        created_at : null}
                        db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                            if(err){throw err}
                            else{
                                console.log('Ticket generated !!!')
                                res.render('ticket/add_project.ejs',{"message":req.body})
                            }
                        })})
                        }
                    })
                }
        }
            
    if(form == 'comment'){
        if(req.files!=null){
            let file_name_list = "";
            for(i=0;i<req.files.length;i++){    
                file_name_list += req.files[i]['path']+";"
            }
            file_name_list = file_name_list.slice(0, -1)
            req.body['attachments'] = file_name_list;
            const {tkid,description,user_id,attachments} = req.body
            console.log(req.body)
            db.query('INSERT INTO ticket_followup SET ?',{tkid:tkid,description:description,user_id:user_id,attachments:attachments}, function(err ,rows, field){
                if(err){throw(err)}
                else{
                    console.log("comment added")
                    res.redirect('back');
                }
            })
        }
        else{
            const {tkid,description,user_id} = req.body
            console.log(req.body)
            db.query('INSERT INTO ticket_followup SET ?',{tkid:tkid,description:description,user_id:user_id,attachments:'na'}, function(err, rows, field){
                if(err){throw(err)}
                else{
                    console.log("comment added")
                    res.redirect("back")
                }
            })
            // res.redirect('back');
        }
        
    }
})

// fetch data from db using * and where conditions
app.get('/getdata/:table/:column/:where', function(req, res){
    let table = req.params.table;
    let column = req.params.column;
    let where = req.params.where;
    if(where == 'none' && column !='none'){
        var query = `SELECT ${column} FROM ${table}`
        db.query(query, function(err, rows, fields){
            if(err){throw(err)}
            else{
                res.send(rows)
            }
        })
    }
    else if(where=='none' && column=='none'){
        var query = `SELECT * FROM ${table}`
        db.query(query, function(err, rows, fields){
            if(err){throw(err)}
            else{
                res.send(rows)
            }
        })
    }
    else{
        db.query('SELECT * from '+table+' where '+column+' LIKE "%'+where+'%";', function(err, rows, fields){
            if(err) {throw err}
            else{
                res.send(rows)
            }
        })
    }
})

app.get('/gettable/:ass', function(req,res){
    var ass = req.params.ass
    db.query('SELECT * FROM tickets WHERE assignee LIKE "%'+ass+'%"', function(err, rows, fields){
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
    db.query('SELECT * FROM projects where project_id = '+rows[0]['project_id'], function(err, rows3, fields){
        if(err) throw err
    db.query('SELECT * FROM tickets WHERE ticket_ref = "'+id+'";', function(err, rows4, fields){
        console.log(rows)
        if(rows3[0]['project_type']=='branch' && rows[0]['status']=='POC' && rows[0]['subject']=='Site Survey'){
            db.query('SELECT * FROM site_survey where ref_id = "'+id+'";', function(err, rows5, fields){
                res.render('ticket/issuepage.ejs',{'data':rows,'followup':rows1,'users':rows2,'project':rows3,'tkt_ref':rows4, 'checklist':rows5})        
            })
        
        }
        else{
            db.query('SELECT * FROM site_survey where ref_id = "'+id+'";', function(err, rows5, fields){
                res.render('ticket/issuepage.ejs',{'data':rows,'followup':rows1,'users':rows2,'project':rows3,'tkt_ref':rows4, 'checklist':rows5})        
            })
        }
    })
    })
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
        db.query('SELECT * from projects', function(err, rows, fields){
            if(err){throw err}
            else{
                console.log(rows)
                res.render('ticket/history.ejs',{'data':rows})
            }
        })
    }
    else{
        res.render('ticket/login.ejs')
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

//update assignee entry in the ticket
app.post('/updateassignee/:tkid', urlparser, async(req,res,next) => {
    var tkid = req.params.tkid    
    db.query('SELECT * FROM tickets WHERE tkid='+tkid, function(err, rows1, fields){
        if(err){ throw err}
        else{
            console.log(req.body)
            console.log(rows1)
                obj = {userid: rows1[0]['userid'],
                    project_id:rows1[0]['project_id'],
                    subject: rows1[0]['subject'],
                    project: rows1[0]['project'],
                    location: rows1[0]['location'],
                    city: rows1[0]['city'],
                    dept: rows1[0]['dept'],
                    status: rows1[0]['status'],
                    assignee: req.body['list_assignee'],
                    priority: rows1[0]['priority'],
                    ticket_type:"project",
                    due_date: '',
                    description: req.body['description'],
                    attachments: 'na',
                    ticket_ref : rows1[0]['tkid'],
                    ticket_role : '2',
                    created_at : null}
                    sql = 'INSERT INTO tickets SET ?'
                    db.query(sql, obj, function(err, data){
                    if(err){throw err}
                    else{
                        res.redirect('back')
                }
            })
        }
    })
})

//server
app.listen(5500, function(){
    console.log('app listening to port 5500')
});