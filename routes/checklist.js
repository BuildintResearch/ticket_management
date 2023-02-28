var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlparser = bodyParser.urlencoded({ extended: true })
var db = require('./database')
const multer  = require('multer');
var FTPStorage = require('multer-ftp')
console.log(__dirname)
router.use(express.static("./views/checklist/"));

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
router.get('/survey_service', function(req, res){
   res.render('checklist/survey_service.ejs');
});

router.get('/testing', function(req,res){
    res.render('checklist/testing.ejs')
})

router.get('/back', function(req,res){
    res.redirect('back')
})

router.get('/branch_c', function(req,res){
    res.render('checklist/branch_checklist.ejs')
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
                obj = {userid: '40,39',
                subject: 'Site Installation(Monitoring)',
                project: req.body['project_name'],
                location: req.body['atmcity'],
                city : req.body['atmcity'],
                dept: 'Service',
                status: 'POC',
                assignee: '40',
                priority: 'High',
                due_date: '',
                description: 'Complete the monitoring installation and upload the checklist',
                attachments: 'none'}
                db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                    if(err){throw err}
                    else{
                        console.log('Ticket generated !!!')
                        res.redirect('back')
                    }
                })
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
                            console.log("User data inserted successfully")
                            // generate ticket to software team for dashboard creation on installation checklist upload
                            obj = {userid: '36',
                            subject: 'Dashboard Creation',
                            project: req.body['project_name'],
                            location: req.body['atmc'],
                            dept: 'Software',
                            status: 'POC',
                            assignee: '43',
                            priority: 'High',
                            due_date: '',
                            description: '',
                            attachments: 'none'}
                            db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                                if(err){throw err}
                                else{
                                    console.log('Ticket generated !!!')
                                    res.redirect('back')
                                }
                            })
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
                // generate ticket here to installation

                console.log("User data inserted successfully")
                obj = {userid: '36',
                subject: 'Site Installation',
                project: req.body['project_name'],
                location: req.body['city']+'_'+req.body['branch_code'],
                dept: 'Service',
                status: 'POC',
                assignee: '40',
                priority: 'High',
                due_date: '',
                description: '',
                attachments: 'none'}
                db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                    if(err){throw err}
                    else{
                        console.log('Ticket generated !!!')
                        res.redirect('back')
                    }
                })
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
                // generate ticket here to software team

                console.log("User data inserted successfully")
                // generate ticket to software team for dashboard creation on installation checklist upload
                obj = {userid: '36',
                subject: 'Dashboard Creation',
                project: req.body['project_name'],
                location: req.body['city']+'_'+req.body['branch_code'],
                dept: 'Software',
                status: 'POC',
                assignee: '43',
                priority: 'High',
                due_date: '',
                description: '',
                attachments: 'none'}
                db.query('INSERT INTO tickets SET ?', obj, function(err, rows, fields){
                    if(err){throw err}
                    else{
                        console.log('Ticket generated !!!')
                        res.redirect('back')
                    }
                })
            }
        })
    }
})

module.exports = router;