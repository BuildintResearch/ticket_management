mailer = require('nodemailer');

// mail for inventory
async function testmail(mail_list,data){
    let body = ""
    if( Object.keys(data[0])[0]=='site_survey_id'){
        body = '<h4>Dear Pawan,</h4> <p>Below is the List of Materials Required for Installation at location - '+data[0]['branch_code']+'</p> <p>iZion : '+data[0]['izion_count']+'<br>Piazza : '+data[0]['piazza_count']+'<br>Smart Meter : '+data[0]['smart_meter_count']+'<br>WiFi Switch : '+data[0]['wifi_hotspot_count']+'<br>SIM count : '+data[0]['sim_number_count']+'</p>'
    }
    // smtp config
    var smtpConfig = {
        host: 'smtp.rediffmailpro.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'research@buildint.co',
            pass: 'Buildint@123'
        }
    };
    var transporter = mailer.createTransport(smtpConfig);

    // mail config
    var mailoption = {
        from: "research@buildint.co",
        to: mail_list,
        subject: "Material List - "+data[0]['project_name']+" - "+data[0]['city']+" - "+data[0]['branch_code'],
        // text: "",
        html:body
    }
    
    transporter.sendMail(mailoption, function(err, response){
        console.log('sending email ...')
        if(err) {
            console.log(err);
        } 
        else{
            console.log('Message Sent');
            transporter.close();
        }
    });
}

// mail on ticket generation
async function ticket_mail(mail_list,mailbody){
    let body = mailbody
    
    // smtp config
    var smtpConfig = {
        host: 'smtp.rediffmailpro.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'research@buildint.co',
            pass: 'Buildint@123'
        }
    };
    var transporter = mailer.createTransport(smtpConfig);

    // mail config
    var mailoption = {
        from: "research@buildint.co",
        to: mail_list,
        subject: "Ticket Generated",
        // text: "",
        html:body
    }
    
    transporter.sendMail(mailoption, function(err, response){
        console.log('sending email ...')
        if(err) {
            console.log(err);
        } 
        else{
            console.log('Message Sent');
            transporter.close();
        }
    });
}


module.exports = {testmail,ticket_mail}