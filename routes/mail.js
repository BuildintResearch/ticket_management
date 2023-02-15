mailer = require('nodemailer');
async function testmail(mail_list){

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
        subject: "CheckList - Location",
        // text: "",
        html: 'PFA Checklist',
    }
    
    transporter.sendMail(mailoption, function(err, response){
        if(err) {
            console.log(err);
        } 
        else{
            console.log('Message Sent');
            transporter.close();
        }
    });
}
testmail("research@buildint.co")