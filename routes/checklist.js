var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlparser = bodyParser.urlencoded({ extended: true })
var db = require('./database')
const multer  = require('multer');
var FTPStorage = require('multer-ftp')
router.use(express.static("./views/checklist/"));
var mail = require('./mail')
var pdf = require('./pdf')

let upload = multer({
    storage: new FTPStorage({
        ftp:{
            host:'85.25.130.56',
            user:'buildint_master',
            password: 'buildint@2021',
        }
    })
})
router.use(express.static("views/checklist/"));

// router.get('/test', function(req,res){
//     db.query('SELECT * FROM site_survey WHERE site_survey_id = "41"', function(err,rows,fields){
//         if(err){throw err}
//         else{
//             pdf.generate_pdf(rows[0])
//             res.sendStatus(200)
//         }
//     })
    
// })

router.get('/branchcontrol/:ref/:pid/:pstatus', function(req,res){
    var ref = req.params.ref
    var pid = req.params.pid
    var pstatus = req.params.pstatus
    res.render('checklist/branchcontrol.ejs', {"refid":ref,"pid":pid,"p_status":pstatus})
})

router.get('/test/:refid', function(req,res){
    var refid = req.params.refid
    db.query('SELECT * FROM site_survey WHERE ref_id = "'+refid+'";', function(err, rows1, fields){
        if(err){throw err}
        else{
            console.log(rows1[0])
            // shoot mail for inventory here
            // mail.testmail('research@buildint.co',rows1)
            res.render('checklist/branch_survey_iems_pdf.ejs',{'data':rows1[0]})
        }
    })
})

router.get('/test2', function(req,res){
    db.query("SELECT * FROM site_inst WHERE site_inst_id = '7'", function(err,rows,fields){
        if(err){throw err}
        else{
            res.render('checklist/branch_inst_iems_pdf.ejs',{'data':rows[0]})
        }
    }) 
})

router.get('/survey_service/:ref/:pid/:pstatus', function(req, res){
    var ref = req.params.ref
    var pid = req.params.pid
    var pstatus = req.params.pstatus
   res.render('checklist/survey_service.ejs', {"refid":ref,"pid":pid,"p_status":pstatus});
});

router.get('/testing', function(req,res){
    res.render('checklist/testing.ejs')
})

router.get('/back', function(req,res){
    res.redirect('back')
})

router.get('/branch_c/:ref/:pid/:pstatus', function(req,res){
    var ref = req.params.ref
    var pid = req.params.pid
    var pstatus = req.params.pstatus
    res.render('checklist/branch_checklist.ejs', {"refid":ref,"pid":pid,"p_status":pstatus})
})

router.get('/software_c/:ref/:pid/:pstatus', function(req,res){
    var ref = req.params.ref
    var pid = req.params.pid
    var pstatus = req.params.pstatus
    res.render('checklist/software_checklist.ejs', {"refid":ref,"pid":pid,"p_status":pstatus})
})

router.post('/postdata/:param', urlparser, upload.any(), function (req, res){
    var param = req.params.param
    if(param == 'survey'){
        console.log("files list : ",req.files)
        if(req.files!=null){
            let sign_img = "";
            let site_img = "";
            for(i=0;i<req.files.length;i++){
                if(req.files[i]['fieldname']=='sign_imgs'){
                    sign_img += req.files[i]['path']+";"
                }
                if(req.files[i]['fieldname']=='site_img'){
                    site_img += req.files[i]['path']+";"
                }
            }
            sign_img = sign_img.slice(0, -1)
            site_img = site_img.slice(0, -1)
            req.body['sign_imgs'] = sign_img;
            req.body['site_img'] = site_img;
        }
        var sql = 'INSERT INTO survey SET ?';
        const formData = req.body
        console.log('URL POST : ',formData)
        db.query(sql, formData, function(err, data){
            if(err) {throw err}
            else{
                // send email to concerned departments after survey checklist upload
                // email async function here
                console.log("User data inserted successfully")
                // generate ticket to service team for installation on survey checklist upload
                if(req.body['project_type']=="POC"){
                    obj = {userid: '44',
                    subject: 'Site Installation',
                    project: req.body['project_name'],
                    location: req.body['atmaddr'],
                    city : req.body['atmcity'],
                    dept: 'Service',
                    ticket_type:'project',
                    status: 'POC',
                    assignee: '39,40',
                    priority: 'High',
                    due_date: '',
                    description: 'Complete the monitoring installation and upload the checklist',
                    attachments: 'na',
                    ticket_type:'project',
                    project_id:req.body['project_id'],
                    ticket_role : '1',
                    created_at: null}
                    db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                        if(err){throw err}
                        else{
                            console.log(obj)
                            console.log('Ticket generated !!!')
                            res.redirect('back')
                        }
                    })
                }

                if(req.body['project_type']=="Live"){
                    obj = {userid: '44',
                    subject: 'Site Installation',
                    project: req.body['project_name'],
                    location: req.body['atmaddr'],
                    city : req.body['atmcity'],
                    dept: 'Service',
                    ticket_type:'project',
                    status: 'Live',
                    assignee: '39,40',
                    priority: 'High',
                    due_date: '',
                    description: 'Complete the installation and upload the checklist',
                    attachments: 'na',
                    project_id:req.body['project_id'],
                    ticket_role : '1',
                    created_at: null}
                    db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                        if(err){throw err}
                        else{
                            console.log('Ticket generated !!!')
                            res.redirect('back')
                        }
                    })
                }
            }
        })
    }
    
    if(param == 'service'){
        if(req.body['option'] == "Installation"){
            delete req.body['option']
            if(req.files!=null){
                let sign_img = "";
                let site_img = "";
                for(i=0;i<req.files.length;i++){
                    if(req.files[i]['fieldname']=='sign_imgs'){
                        sign_img += req.files[i]['path']+";"
                    }
                    if(req.files[i]['fieldname']=='site_img'){
                        site_img += req.files[i]['path']+";"
                    }
                }
                sign_img = sign_img.slice(0, -1)
                site_img = site_img.slice(0, -1)
                req.body['sign_imgs'] = sign_img;
                req.body['site_img'] = site_img;
            }
            var sql = 'INSERT INTO inst SET ?';
            const formData = req.body
            console.log('URL POST : ',formData)
            db.query(sql, formData, function(err, data){
                if(err) {throw err}
                else{
                    console.log("User data inserted successfully")
                    db.query(sql, formData, function(err, data){
                        if(err) {throw err}
                        else{
                            // generate ticket to software team for dashboard creation on installation checklist upload
                            if(req.body['project_type']=="POC"){
                                obj = {userid: '44',
                                subject: 'Dashboard Creation',
                                project: req.body['project_name'],
                                location: req.body['atmc'],
                                dept: 'Software',
                                status: 'POC',
                                assignee: '42',
                                city:req.body['atmc'],
                                priority: 'High',
                                due_date: '',
                                description: 'Create Dashboard, verify checklists.',
                                attachments: 'na',
                                ticket_type:'project',
                                project_id:req.body['project_id'],
                                ticket_role : '1',
                                created_at : null}
                                db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                                    if(err){throw err}
                                    else{
                                        console.log('Ticket generated !!!')
                                        res.redirect('back')
                                    }
                                })
                            }
                            if(req.body['project_type']=="Live"){
                                obj = {userid: '44',
                                subject: 'Dashboard Creation',
                                project: req.body['project_name'],
                                location: req.body['atmc'],
                                dept: 'Software',
                                status: 'Live',
                                assignee: '42',
                                city:req.body['atmc'],
                                priority: 'High',
                                due_date: '',
                                description: 'Create Dashboard, verify checklists.',
                                attachments: 'na',
                                ticket_type:'project',
                                project_id:req.body['project_id'],
                                ticket_role : '1',
                                created_at : null}
                                console.log(obj)
                                db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                                    if(err){throw err}
                                    else{
                                        console.log('Ticket generated !!!')
                                        res.redirect('back')
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }

        if(req.body['option'] == "Service"){
            delete req.body['option']
            if(req.files!=null){
                let sign_img = "";
                let site_img = "";
                for(i=0;i<req.files.length;i++){
                    if(req.files[i]['fieldname']=='sign_imgs'){
                        sign_img += req.files[i]['path']+";"
                    }
                    if(req.files[i]['fieldname']=='site_img'){
                        site_img += req.files[i]['path']+";"
                    }
                }
                sign_img = sign_img.slice(0, -1)
                site_img = site_img.slice(0, -1)
                req.body['sign_imgs'] = sign_img;
                req.body['site_img'] = site_img;
            }
            var sql = 'INSERT INTO service SET ?';
            const formData = req.body
            console.log('URL POST : ',formData)
            db.query(sql, formData, function(err, data){
                if(err) {throw err}
                else{
                    console.log("User data inserted successfully")
                    res.redirect('back')
                }
            })
        }
    }
    if(param == 'hwtest'){
        var sql = 'INSERT INTO test_hw SET ?';
        const formData = req.body
        console.log("URL POST : ",formData)
        db.query(sql, formData, function(err, data){
        if(err) {throw err}
        else{
            console.log("User data inserted successfully")
            res.redirect('back');
        }
    })
    }
    if(param == 'datatest'){
        var sql = 'INSERT INTO test_sw SET ?';
        const formData = req.body
        console.log("URL POST : ",formData)
        db.query(sql, formData, function(err, data){
        if(err) {throw err}
        else{
            console.log("User data inserted successfully")
            res.redirect('back');
        }
    })
    }
    if(param == 'site_survey'){
        if(req.files!=null){
            let sign_img = "";
            let site_img = "";
            for(i=0;i<req.files.length;i++){
                if(req.files[i]['fieldname']=='sign_imgs'){
                    sign_img += req.files[i]['path']+";"
                }
                if(req.files[i]['fieldname']=='site_img'){
                    site_img += req.files[i]['path']+";"
                }
            }
            console.log(sign_img, site_img)
            sign_img = sign_img.slice(0, -1)
            site_img = site_img.slice(0, -1)
            req.body['sign_imgs'] = sign_img;
            req.body['site_img'] = site_img;
        }
        var sql = 'INSERT INTO site_survey SET ?';
        const formData = req.body
        let hvac_details = {}
        console.log("URL POST : ",formData)
        console.log('Printing HVAC details ...')
        for (const [key, value] of Object.entries(formData)) {
            if(key.includes("AC-")){
                hvac_details[key] = value
                console.log(`${key}: ${value}`);
                delete req.body[key]
            }
          }
          req.body['hvac_details'] = JSON.stringify(hvac_details)
          console.log(req.body)
          db.query(sql, req.body, function(err, data){
            if(err) {throw err}
            else{
                if(req.body['project_type']=='POC'){
                    // generate ticket here to installation
                    console.log("User data inserted successfully")
                    obj = {userid: '44',
                    subject: 'Site Installation(Monitoring)',
                    project: req.body['project_name'],
                    location: req.body['city']+'_'+req.body['branch_code'],
                    dept: 'Service',
                    city : req.body['city'],
                    assignee: '40,39',
                    priority: 'High',
                    status:'POC',
                    due_date: '',
                    description: 'Complete Site Installation, upload the checklist',
                    attachments: 'na',
                    ticket_role : '1',
                    ticket_type:'project',
                    project_id : req.body['project_id'],
                    created_at:null}
                    db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                        if(err){throw err}
                        else{
                            db.query('SELECT * FROM site_survey order by 1 desc limit 1', function(err, rows1, fields){
                                if(err){throw err}
                                else{
                                    console.log(rows1[0])
                                    // shoot mail for inventory here
                                    // mail.testmail('research@buildint.co',rows1)
                                    res.render('checklist/branch_survey_iems_pdf.ejs',{'data':rows1[0]})
                                }
                            })
                            console.log('Ticket generated !!!')
                            // res.redirect('back')
                        }
                    })
                }

            }
        })
    }

    if(param == 'site_inst'){
        if(req.files!=null){
            let sign_img = "";
            let site_img = "";
            for(i=0;i<req.files.length;i++){
                if(req.files[i]['fieldname']=='sign_imgs'){
                    sign_img += req.files[i]['path']+";"
                }
                if(req.files[i]['fieldname']=='site_img'){
                    site_img += req.files[i]['path']+";"
                }
            }
            console.log(sign_img, site_img)
            sign_img = sign_img.slice(0, -1)
            site_img = site_img.slice(0, -1)
            req.body['sign_imgs'] = sign_img;
            req.body['site_img'] = site_img;
        }
        var sql = 'INSERT INTO site_inst SET ?';
        const formData = req.body
        let meter_details = {}
        console.log("URL POST : ",formData)
        console.log(formData)
        console.log('Printing meter details ...')
        for (const [key, value] of Object.entries(formData)) {
            if(key.includes("piazza")){
                meter_details[key]=value
                console.log(`${key}: ${value}`);
                delete req.body[key]
            }
            if(key.includes("meter-")){
                meter_details[key] = value
                console.log(`${key}: ${value}`);
                delete req.body[key]
            }
          }
          req.body['meter_details'] = JSON.stringify(meter_details)
          console.log(req.body)
          db.query(sql, req.body, function(err, data){
            if(err) {throw err}
            else{
                console.log("User data inserted successfully")
                // generate ticket here to software team
                if(req.body['project_type']=="POC"){
                    // generate ticket to software team for dashboard creation on installation checklist upload
                    obj = {userid: '44',
                    subject: 'Controlling Installation',
                    project: req.body['project_name'],
                    location: req.body['city']+'_'+req.body['branch_code'],
                    dept: 'Software',
                    city: req.body['city'],
                    status: 'POC',
                    assignee: '39,40',
                    priority: 'High',
                    due_date: '',
                    description: 'Perform Controlling Installation and upload the checklist.',
                    attachments: 'na',
                    project_id: req.body['project_id'],
                    ticket_type: 'project',
                    ticket_role: '1',
                    created_at : null}
                    db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                        if(err){throw err}
                        else{
                            console.log('Ticket generated !!!')
                            // res.redirect('back')
                            db.query('SELECT * FROM site_inst order by 1 desc limit 1', function(err,rows,fields){
                                res.render('checklist/branch_inst_iems_pdf.ejs',{'data':rows[0]})
                            })
                        }
                    })
                }
                
            }
        })
    }

    if(param == 'branchcontrol'){
        if(req.files!=null){
            let sign_img = "";
            let site_img = "";
            for(i=0;i<req.files.length;i++){
                if(req.files[i]['fieldname']=='sign_imgs'){
                    sign_img += req.files[i]['path']+";"
                }
                if(req.files[i]['fieldname']=='site_img'){
                    site_img += req.files[i]['path']+";"
                }
            }
            console.log(sign_img, site_img)
            sign_img = sign_img.slice(0, -1)
            site_img = site_img.slice(0, -1)
            req.body['sign_imgs'] = sign_img;
            req.body['site_img'] = site_img;
        }
        var sql = 'INSERT INTO site_control SET ?';
        const formData = req.body
        let meter_details = {}
        console.log("URL POST : ",formData)
        console.log(formData)
        console.log('Printing meter details ...')
        for (const [key, value] of Object.entries(formData)) {
            if(key.includes("izion")){
                meter_details[key]=value
                console.log(`${key}: ${value}`);
                delete req.body[key]
            }
          }
          req.body['izion_details'] = JSON.stringify(meter_details)
          console.log(req.body)
          db.query(sql, req.body, function(err, data){
            if(err) {throw err}
            else{
                console.log("User data inserted successfully")
                // generate ticket here to software team
                if(req.body['project_type']=="POC"){
                    // generate ticket to software team for dashboard creation on installation checklist upload
                    obj = {userid: '44',
                    subject: 'Dashboard Creation',
                    project: req.body['project_name'],
                    location: req.body['city']+'_'+req.body['branch_code'],
                    dept: 'Software',
                    city: req.body['city'],
                    status: 'POC',
                    assignee: '42',
                    priority: 'High',
                    due_date: '',
                    description: 'Ensure everything is working fine and create dashboard',
                    attachments: 'na',
                    project_id: req.body['project_id'],
                    ticket_type: 'project',
                    ticket_role: '1',
                    created_at : null}
                    db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                        if(err){throw err}
                        else{
                            console.log('Ticket generated !!!')
                            res.redirect('back')
                            // db.query('SELECT * FROM site_control order by 1 desc limit 1', function(err,rows,fields){
                            //     res.render('checklist/branch_inst_iems_pdf.ejs',{'data':rows[0]})
                            // })
                        }
                    })
                }
                
            }
        })
    }

    if(param=='software'){
        var sql = 'INSERT INTO software SET ?';
        db.query(sql, req.body, function(err,data){
            if(err) throw err;
            else{
                console.log('Checklist Submitted for Software!!!')
                res.redirect('back')
            }
        })
    }
})

module.exports = router;