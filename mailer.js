mailer = require('nodemailer');

// mail on ticket generation
async function ticket_mail(mail_list,data){
    let body = ""
    body = data
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
        subject: "Ticket Raised - "+data['project']+" - "+data['location']+" - "+data['subject'],
        // text: "",
        html: "Ticket Description : "+data['description']
    }
    
    transporter.sendMail(mailoption, function(err, response){
        console.log('Sending email ...')
        if(err){
            console.log(err);
        }
        else{
            console.log('Mail Sent');
            transporter.close();
        }
    });
}


module.exports = {ticket_mail}