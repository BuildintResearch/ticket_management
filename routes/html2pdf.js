var html_to_pdf = require('html-pdf-node');
const fs = require('fs');
let options = { format: 'A4' };
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

let file = { content: "<h1>Welcome to html-pdf-node</h1>" };  //html body here
html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
  console.log("PDF Buffer:-", pdfBuffer);
  fs.writeFileSync('test.pdf', pdfBuffer);
});