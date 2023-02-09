var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlparser = bodyParser.urlencoded({ extended: true })
var db = require('./database')

router.use(express.static("views/checklist/"));
router.get('/survey_service', function(req, res){
   res.render('checklist/survey_service.ejs');
});

router.get('/testing', function(req,res){
    res.render('checklist/testing.ejs')
})

router.post('/postdata/:param', urlparser, function (req, res){
    var param = req.params.param
    console.log(req.body)
    if(param == 'survey'){
        var sql = 'INSERT INTO survey SET ?';
        const formData = req.body
        console.log('URL POST : ',formData)
        db.query(sql, formData, function(err, data){
            if(err) {throw err}
            else{
                console.log("User data inserted successfully")
                // generate ticket to service team for installation on survey checklist upload
                obj = {userid: '36',
                subject: 'Site Installation',
                project: req.body['project_name'],
                location: req.body['atmcity'],
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
                        res.render('checklist/survey_service.ejs',{"message":req.body})
                    }
                })
            }
        })
    }
    
    if(param == 'service'){
        if(req.body['option'] == "Installation"){
            delete req.body['option']
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
                                    res.render('checklist/survey_service.ejs',{"message":req.body})
                                }
                            })
                        }
                    })
                }
            })
        }

        if(req.body['option'] == "Service"){
            delete req.body['option']
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
    console.log(req.body)
})



module.exports = router;