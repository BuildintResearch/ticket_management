const pdfGenerator = require('pdfkit')
const pdfTable = require('voilab-pdf-table')
const fs = require('fs')
const width = 595.28
const height = 841.89

let doc = new pdfGenerator({
    bufferPages:true,
    size: [width,height],
    margins : { // by default, all are 72
        top: 50,
       bottom:50,
        left: 50,
      right: 50
    }
})

let table = new pdfTable(doc)

function generateRow(label,data){
    doc.text(label+" : "+data)
}
function generateHeader(doc){
    doc.image(__dirname+'\\logo.png',50,40, {fit:[100,100]})
    .fontSize(16)
    doc.text('CHECKLIST FOR BANK BRANCH iEMS IoT SOLUTION',50,65)
}
// site survey checklist
async function generate_pdf(data){
    doc.pipe(fs.createWriteStream('test.pdf'))
    generateHeader(doc)
    doc.text()
    .fontSize(12)
    doc.moveDown();
    doc.text("Branch Name :   "+data['project_name']+" - "+data['city'], {lineGap : 10})
    doc.text("Branch Code :   "+data['branch_code'],{lineGap : 10})
    doc.text("Address :   "+data['address'],{lineGap : 10})
    doc.text("Manager Name :   "+data['manager_name'],{lineGap : 10})
    doc.text("Manager Contact :   "+data['manager_contact'],{lineGap : 10})
    doc.text("Manager E-mail :   "+data['manager_mail'],{lineGap : 10})
    doc.text("Site Electrician Name :   "+data['electrician_name'],{lineGap : 10})
    doc.text("Site Electrician Contact :   "+data['electrician_contact'],{lineGap : 10})
    doc.text("Security Guard Name :   "+data['security_guard_name'],{lineGap : 10})
    doc.text("Security Guard Contact :   "+data['security_guard_contact'],{lineGap : 40})
       
    doc.text("Sr. No.", 50, 400, {lineBreak:false})
    .text("Item", 145, 400, {lineBreak:false})
    .text("Description", 280, 400,{lineBreak:false})
    .text("Remark", 420, 400,{lineBreak:false})

    doc.text("1", 63, 425, {lineBreak:false})
    .text("Electrical System", 110, 425, {lineBreak:false})
    .text("Electrical SLD", 220, 425,{lineBreak:false})
    doc.text(data['electrical_sld'], 425, 425)
    .text("Total Numbers of EB Meter", 220, 445,{lineBreak:false})
    doc.text(data['total_eb_meter'], 425, 445)
    .text("Total Number of Panels", 220, 465, {lineBreak:false})
    doc.text(data['total_eb_meter'], 425, 465)
    .text("Others", 220, 485, {lineBreak:false})
    doc.text(data['electrical_others'], 425, 485)


    doc.text("2", 63, 510, {lineBreak:false})
    .text("DG", 110, 510, {lineBreak:false})
    .text("Make", 220, 510)
    doc.text(data['dg_make'], 425, 510)
    .text("Model", 220, 530)
    doc.text(data['dg_model'], 425, 530)

    doc.text("3", 63, 555)
    .text("Count", 110, 555)
    .text("iZion", 220, 555)
    doc.text(data['izion_count'], 425, 555)
    .text("Smart Meter", 220, 575)
    doc.text(data['smart_meter_count'], 425, 575)
    .text("Wifi/Hotspot", 220, 595)
    doc.text(data['wifi_hotspot_count'], 425, 595)
    .text("Sim Number", 220, 615)
    doc.text(data['sim_number_count'], 425, 615)

    doc.addPage()
    doc.text("HVAC Details")
    doc.moveDown()
    doc.text()
    table
            // add some plugins (here, a 'fit-to-width' for a column)
            .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'area'
            }))
            .addPlugin(new (require('voilab-pdf-table/plugins/rowshader'))({
                shade1:"",
                shade2:"#F0F8FF",
                width:450,
            }))
            // set defaults to your columns
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'right'
            })
            // add table columns
            .addColumns([
                {
                    id: 'area',
                    header: 'Area',
                    align: 'left',
                },
                {
                    id: 'actype',
                    header: 'AC Type',
                    width:60,
                    height:20
                },
                {
                    id: 'makemodel',
                    header: 'Make & Model',
                    width:100
                },
                {
                    id: 'qty',
                    header: 'Qty',
                    width:50
                },
                {
                    id: 'capacity',
                    header: 'Capacity',
                    width:60
                },
                {
                    id: 'comm',
                    header: 'Communication',
                    width:100
                }
            ])
            
    // table.addBody([
    //     {area: 'Micro Room', actype: "Duct", makemodel: "hitachi", qty: "4", capacity:"1Ton", comm:"Switch"},
    // ]);
    // doc.addPage()
    
    // doc.text(data['hvac_details'])
    hvac = JSON.parse(data['hvac_details'])
    // hvac[Object.keys(hvac)[Object.keys(hvac).length - 1]]
    hvac_count = parseInt(Object.keys(hvac)[Object.keys(hvac).length - 1].split('_')[0].split('-')[1])
    let hvac_list = []
    for(i=0;i<=hvac_count;i++){
        dict = {area:hvac['AC-'+i+'_area'],actype:hvac['AC-'+i+'_type'],makemodel:hvac['AC-'+i+'_brand']+hvac['AC-'+i+'_model'],qty:hvac['AC-'+i+'_quantity'],capacity:hvac['AC-'+i+'_capacity'],comm:hvac['AC-'+i+'_comms']}
        hvac_list.push(dict)
    }
    
    table.addBody(
        hvac_list
    );
    
    doc.addPage()
    
    doc.end()
    
    console.log('PDF Generated')
}   

module.exports = {generate_pdf}