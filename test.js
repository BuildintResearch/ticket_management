const ftp = require("basic-ftp") 

async function downloadFileFromFTP(localFile, remotePath) {
    const client = new ftp.Client()
    
    try {
        await client.access({
            host: "85.25.130.56",
            user: "buildint_master",
            password: "buildint@2021",
            secure: false
        })
        
        // download the remote file located to remotePath
        // and store it to localFile
        await client.downloadTo(localFile, remotePath)
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}

async function uploadFileToFTP(localFile, remotePath) {
    const client = new ftp.Client()
    
    try {
        await client.access({
            host: "85.25.130.56",
            user: "buildint_master",
            password: "buildint@2021",
            secure: false
        })
        
        // upload the local file located in localFile
        // to remotePath
        await client.uploadFrom(localFile, remotePath)
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}

// download the remote file "reports/CSV/data.csv"
// and store it to the local file "data.csv"
// downloadFileFromFTP("test.docx", "checklist/testchecklist.docx")

// upload the local file "report.xlxs" to
// the remote path "reports/report.xlsx"
uploadFileToFTP("test.docx", "checklist/testchecklist1.docx")