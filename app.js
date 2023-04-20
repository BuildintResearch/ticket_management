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
        db.query('SELECT * FROM projects',function(err,rows,fields){
            console.log(rows)
            res.render('ticket/add_project.ejs',{"project_list":rows,"message":""})
        })
    }
    else{
        res.render('ticket/login.ejs')
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
        db.query('SELECT * FROM projects', function(err,rows,fields){
            if(err){console.log(err)}
            else{
                db.query('SELECT * FROM locations', function(err,rows1,fields){
                    res.render('ticket/ticket_gen.ejs', {'projects':rows,'locations':rows1})
                })
            }
        })
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
        console.log(user_type)
        if(err){console.log(err)}
        else if(rows.length <= 0){
            console.log('username/pass not found',rows)
            req.flash('error','Please enter correct email and password')
            res.redirect('/login')
        }
        else{
            user_type = rows[0]['user_type']
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
            // assignee = req.body['assignee']
            // if(assignee.length>1 && typeof(assignee)=='object'){
            //     req.body['assignee'] = assignee.join()
            // }
            if(typeof(req.body['assignee'])=='object'){
                req.body['assignee'] = req.body['assignee'].join()
            }
            req.body['created_at'] = null;
            var sql = 'INSERT INTO tickets SET ?';
            req.body['ticket_type'] = 'issue'
            req.body['ticket_role'] = 1
           
            db.query('SELECT * FROM locations WHERE loc_id = '+req.body['location_id'], function(err,rows,fields){
                if(err){console.log(err)}
                else{
                    data_=rows[0]
                    console.log('>>>>>>>>>>>>>>>>>>>>>>',rows)
                    req.body['branch_atm_id'] = data_['branch_atm_id']     
                    req.body['location'] = data_['loc_name']
                    req.body['city'] = data_['city']
                    console.log("URL POST : ",formData)
                    db.query(sql, formData, function(err, data){
                    if(err){throw err}
                    else{
                        console.log("User data inserted successfully")
                        // generate ticket mail to concerned person
                        // db.query("SELECT * FROM users WHERE user_id IN ("+req.body['assignee']+")", function(err,rows,fields){
                        //     if(err){throw err}
                        //     else{
                        //         let user_mail = []
                        //         console.log(rows)
                        //         for(i=0;i<rows.length;i++){
                        //             user_mail.push(rows[i]['usermail'])
                        //         }
                        //         // mailer.ticket_mail(user_mail,req.body)
                        //     }
                        // })
                        // mailer.ticket_mail(formData['assignee'])
                    }
                    })  
                    res.redirect('/create_ticket')
                }
            })       
            
            const formData = req.body
            
        }

    if(form == 'adduser'){
        const {fname,lname,usermail, pass, dept,user_type, mobileno} = req.body
        console.log(req.body)
        db.query('INSERT INTO users SET ?',{fname:fname,lname:lname,usermail:usermail,pass:pass,dept:dept,user_type:user_type,mobileno:mobileno})
        res.redirect('/adduser')
    } 

    if(form == 'addproject'){
        req.body['created_at']=null
        db.query('INSERT INTO projects SET ?', req.body, function(err,rows,fields){
            if(err){throw(err)}
            else{
                res.redirect('back')
            }
        })
    }

    if(form == 'addlocation'){
        req.body['created_at']=null
        if(req.body['status']=='poc'){
            db.query('INSERT INTO locations SET ?', req.body, function(err, rows, fields){
                if(err){throw err}
                else{
                    db.query('SELECT * FROM locations ORDER BY 1 DESC LIMIT 1;', function(err,rows1,fields){
                        obj = { userid: '44', // generated from admin user
                            project_id:req.body['project_id'],
                            location_id : rows1[0]['loc_id'],
                            subject: 'Site Survey',
                            location: req.body['loc_name'],
                            branch_atm_id:req.body['branch_atm_id'],
                            city: req.body['city'],
                            dept: 'Project Engineer',
                            status: 'poc',
                            assignee: '39',
                            priority: 'High',
                            ticket_type:"project",
                            due_date: '',
                            description: 'complete the site survey',
                            attachments: 'na',
                            ticket_role : '1',
                            ticket_phase:'pd-assign',
                            created_at : null
                        }
                        db.query('INSERT INTO tickets SET ?', obj, function(err,rows,fields){
                            if(err){throw err}
                            else{
                                res.redirect('back')
                            }
                    })
                    })
                }
            })
        }
        if(req.body['status']=='live'){
            db.query('INSERT INTO locations SET ?', req.body, function(err, rows, fields){
                if(err){throw err}
                else{
                    db.query('SELECT * FROM locations ORDER BY 1 LIMIT 1;', function(err,rows1,fields){
                        obj = { userid: '44', // generated from admin user
                            project_id:req.body['project_id'],
                            location_id : rows1[0]['loc_id'],
                            subject: 'Site Survey',
                            location: req.body['loc_name'],
                            branch_atm_id:req.body['branch_atm_id'],
                            city: req.body['city'],
                            dept: 'Project Engineer',
                            status: 'live',
                            assignee: '39',
                            priority: 'High',
                            ticket_type:"project",
                            due_date: '',
                            description: 'complete the installation',
                            attachments: 'na',
                            ticket_role : '1',
                            ticket_phase:'pd-assign',
                            created_at : null
                        }
                        db.query('INSERT INTO tickets SET ?', obj, function(err,rows,fields){
                            if(err){throw err}
                            else{
                                res.redirect('back')
                            }
                    })
                    })
                }
            })
        }
        if(req.body['status']=='none'){
            db.query('INSERT INTO locations SET ?', req.body, function(err, rows, fields){
                if(err){throw err}
                else{
                    console.log('location added')
                    res.redirect('back')
                }
            })
        }
        
    }

    // if(form == 'addproject'){
    //     console.log(req.body)
    //     if(req.body['category']=="POC"){
    //         req.body['checklist_survey']='1'
    //         req.body['checklist_monitoring']='1'
    //         req.body['checklist_controlling']='1'
    //         req.body['checklist_inst']='0'
    //         console.log(req.body)
    //         db.query('INSERT INTO projects SET ?', req.body, function (err, rows, fields){
    //             if(err) {throw err}
    //             else{
    //                 db.query('SELECT project_id from projects order by 1 limit 1', function(err,rows1,fields){
    //                     console.log('Project Added Successfully')
    //                     obj = {userid: '44',
    //                     project_id:rows1[0]['project_id'],
    //                     subject: 'Site Survey',
    //                     project: req.body['project_name'],
    //                     location: req.body['location_name'],
    //                     city: req.body['city_name'],
    //                     dept: 'Project Engineer',
    //                     status: 'POC',
    //                     assignee: '40,39',
    //                     priority: 'High',
    //                     ticket_type:"project",
    //                     due_date: '',
    //                     description: 'Complete the site survey for mentioned location and upload the checklist',
    //                     attachments: 'na',
    //                     ticket_role : '1',
    //                     created_at : null}
    //                     db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
    //                         if(err){throw err}
    //                         else{
    //                             console.log('Ticket generated !!!')
    //                             res.render('ticket/add_project.ejs',{"message":req.body})
    //                         }
    //                     })
    //                 })
                    
    //                     }
    //                 })
    //             }
                
        // if(req.body['category']=="Live"){
        //     req.body['checklist_survey']='1'
        //     req.body['checklist_monitoring']='0'
        //     req.body['checklist_controlling']='0'
        //     req.body['checklist_inst']='1'
        //     db.query('INSERT INTO projects SET ?', req.body, function (err, rows, fields){
        //         if(err) {throw err}
        //         else{
        //             db.query('SELECT project_id from projects order by 1 limit 1', function(err,rows1,fields){
        //             console.log('Project Added Successfully')
        //                 obj = {userid: '44',
        //                 project_id:rows1[0]['project_id'],
        //                 subject: 'Site Survey',
        //                 project: req.body['project_name'],
        //                 location: req.body['location_name'],
        //                 city: req.body['city_name'],
        //                 dept: 'Project Engineer',
        //                 status: 'Live',
        //                 assignee: '40,39',
        //                 priority: 'High',
        //                 ticket_type:"project",
        //                 due_date: '',
        //                 description: 'Complete the site survey for mentioned location and upload the checklist',
        //                 attachments: 'na',
        //                 ticket_role : '1',
        //                 created_at : null}
        //                 db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
        //                     if(err){throw err}
        //                     else{
        //                         console.log('Ticket generated !!!')
        //                         res.render('ticket/add_project.ejs',{"message":req.body})
        //                     }
        //                 })})
        //                 }
        //             })
        //         }
        // }
            
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
                // console.log(rows)
                res.send(rows)
            }
        })
    }
    else if(where=='none' && column=='none'){
        var query = `SELECT * FROM ${table}`
        db.query(query, function(err, rows, fields){
            if(err){throw(err)}
            else{
                // console.log(rows)
                res.send(rows)
            }
        })
    }
    else{
        db.query('SELECT * from '+table+' where '+column+' LIKE "%'+where+'%";', function(err, rows, fields){
            if(err) {throw err}
            else{
                // console.log(rows)
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
    db.query('SELECT * FROM tickets WHERE tkid = '+id, function(err,rows1,fields){
        if(err){console.log(err)}
        else{
            console.log(rows1)
            db.query('SELECT * FROM locations WHERE project_id = '+rows1[0]['project_id']+' AND loc_id ='+rows1[0]['location_id']+';', function(err,rows2,fields){
                if(err){console.log(err)}
                else{
                    db.query('SELECT * FROM projects WHERE project_id='+rows1[0]['project_id'], function(err,rows3,fields){
                        if(err){console.log(err)}
                        else{
                            db.query('SELECT * FROM users;',function(err,rows4,fields){
                                if(err){console.log(err)}
                                else{
                                    db.query('SELECT * FROM ticket_followup WHERE tkid='+id, function(err,rows5,fields){
                                        if(err){console.log(err)}
                                        else{
                                            db.query('SELECT * FROM tickets WHERE ticket_ref='+id, function(err,rows6,fields){
                                                if(err){console.log(err)}
                                                else{
                                                    res.render('ticket/issuepage.ejs',{'ticket':rows1,'location':rows2,'project':rows3,'users':rows4,'followup':rows5,'subtkt':rows6})
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    // db.query('SELECT * FROM tickets WHERE tkid = '+id, function(err, rows, fields){
    //     if(err){console.log(err)}
    // db.query('SELECT * FROM projects where project_id = '+rows[0]['project_id'], function(err, rows3, fields){
    //     if(err){console.log(err)}
    // db.query('SELECT * from ticket_followup WHERE tkid = '+id, function(err, rows1, fields){
    //     if(err){console.log(err)}
    //     else{}
    // db.query('SELECT * from users', function(err, rows2, fields){
    //     if(err){console.log(err)}
    //     else{}
    // db.query('SELECT * FROM tickets WHERE ticket_ref = "'+id+'";', function(err, rows4, fields){
    //     if(err){console.log(err)}
    //     else{}
    //     if(rows3[0]['project_type']=='branch' && rows[0]['status']=='POC' && rows[0]['subject']=='Site Survey'){
    //         db.query('SELECT * FROM site_survey where ref_id = "'+id+'";', function(err, rows5, fields){
    //             if(err){console.log(err)}
    //             else{
    //             res.render('ticket/issuepage.ejs',{'data':rows,'followup':rows1,'users':rows2,'project':rows3,'tkt_ref':rows4, 'checklist':rows5})        
    //             }
    //         })
    //     }
    //     else{
    //         db.query('SELECT * FROM site_survey where ref_id = "'+id+'";', function(err, rows5, fields){
    //             res.render('ticket/issuepage.ejs',{'data':rows,'followup':rows1,'users':rows2,'project':rows3,'tkt_ref':rows4, 'checklist':rows5})        
    //         })
    //     }
    
    // })
    // })
    // })
    // })
    // })
})

app.get('/update/:id/:action', function(req, res){
    var id = req.params.id
    var action = req.params.action

    if(action=='forward'){
        console.log(req.body)
    }
    if(action == 'solved'){
        db.query('UPDATE tickets SET solved = 1 where tkid = '+id)
        console.log(id, " closed")
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

app.get("/historyload/:pid", urlparser, function(req,res){
    var pid = req.params.pid
        db.query("SELECT * FROM tickets WHERE project_id="+pid, function(err,rows,fields){
            res.send(rows)
        })
})

app.get("/fetchproject/:pid", urlparser, function(req,res){
    var pid = req.params.pid
    db.query("SELECT * FROM projects WHERE project_id="+pid, function(err,rows,fields){
        res.send(rows)
    })
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

//update assignee entry in the ticket and create sub ticket
app.post('/updateassignee/:tkid/:check/:userid/:assignee/:project_id/:location_id/:desc/:ttype', urlparser, async(req,res,next) => {
    var tkid = req.params.tkid   
    var check = req.params.check
    var userid = req.params.userid
    var assignee = req.params.assignee
    var project_id = req.params.project_id
    var location_id = req.params.location_id
    var desc = req.params.desc
    var ttype = req.params.ttype
    if(check=='sub'){
        if(typeof(req.body['list_assignee'])=='object'){
            req.body['list_assignee'] = req.body['list_assignee'].join()
        }
        db.query('SELECT * FROM tickets WHERE tkid='+tkid, function(err, rows1, fields){
            if(err){ throw err}
            else{
                // console.log(req.body)
                // console.log(rows1)
                    obj = {userid: rows1[0]['userid'],
                        project_id:rows1[0]['project_id'],
                        location_id : rows1[0]['location_id'],
                        subject: rows1[0]['subject'],
                        location: rows1[0]['location'],
                        city: rows1[0]['city'],
                        branch_atm_id : rows1[0]['branch_atm_id'],
                        dept: rows1[0]['dept'],
                        status: rows1[0]['status'],
                        assignee: req.body['list_assignee'],
                        priority: rows1[0]['priority'],
                        ticket_type:ttype,
                        due_date: '',
                        description: req.body['description'],
                        attachments: 'na',
                        ticket_ref : rows1[0]['tkid'],
                        ticket_role : '2',
                        ticket_phase:rows1[0]['ticket_phase'],
                        created_at : null}
                        sql = 'INSERT INTO tickets SET ?'
                        db.query(sql, obj, function(err, data){
                        if(err){throw err}
                        else{
                            tk_history = {
                                tkid : tkid,
                                from : userid,
                                to : req.body['list_assignee'],
                                project_id : project_id,
                                location_id : location_id,
                                description : desc, 
                                type : ttype
                            }
                            db.query('INSERT INTO ticket_history SET ?', tk_history, function(err,rows,fields){
                                if(err){console.log(err)}
                                else{
                                    res.redirect('back')
                                }
                            })
                    }
                })
            }
        })
    }
    if(check=='forward'){
        if(typeof(req.body['list_assignee1'])=='object'){
            req.body['list_assignee1'] = req.body['list_assignee1'].join()
        }
        // console.log('list_assingeeasdsa:',req.body['list_assignee1'])
        // query = 'UPDATE tickets SET assignee = '+req.body['list_assignee1']+', description= '+req.body['description']+'where'
        // db.query('UPDATE tickets SET assignee ="'+req.body['list_assignee1']+'", description="'+req.body['description']+'" where tkid = '+tkid,';', function(err,rows,fields){
            db.query('UPDATE tickets SET assignee ="'+req.body['list_assignee1']+'" where tkid = '+tkid,';', function(err,rows,fields){
            if(err){console.log(err)}
            else{
                // ticket history body
                tk_history = {
                    tkid : tkid,
                    from : userid,
                    to : req.body['list_assignee1'],
                    project_id : project_id,
                    location_id : location_id,
                    description : desc, 
                    type : ttype
                }
                db.query('INSERT INTO ticket_history SET ?', tk_history, function(err,rows,fields){
                    if(err){console.log(err)}
                    else{
                        res.redirect('/issues')
                    }
                })
            }
        })
    }
})

// custom file upload download
app.post('/customfile', urlparser, upload.any() ,async (req, res,next) => {
// if(req.files!=null){
//     let file_name_list = "";
//     for(i=0;i<req.files.length;i++){    
//         file_name_list += req.files[i]['path']+";"
//     }
//     file_name_list = file_name_list.slice(0, -1)
    // req.body['attachments'] = file_name_list;
    // const {tkid,description,user_id,attachments} = req.body
    console.log('running')
    console.log(req.files)
    // db.query('INSERT INTO ticket_followup SET ?',{tkid:tkid,description:description,user_id:user_id,attachments:attachments}, function(err ,rows, field){
    //     if(err){throw(err)}
    //     else{
    //         console.log("comment added")
    //         res.redirect('back');
    //     }
    // })
// }
})

//server
app.listen(5500, function(){
    console.log('app listening to port 5500')
});