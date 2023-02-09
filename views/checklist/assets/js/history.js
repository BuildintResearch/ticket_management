// let firebaseConfig = {
//     apiKey: "AIzaSyCtFlIgLHOvliDQpsVW0YnZJZ7xVANICpk",
//     authDomain: "checklist-379ea.firebaseapp.com",
//     databaseURL: "https://checklist-379ea-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "checklist-379ea",
//     storageBucket: "checklist-379ea.appspot.com",
//     messagingSenderId: "248915298508",
//     appId: "1:248915298508:web:4424f89a61e04ba9e75a69",
//     measurementId: "G-YR85WETH2H"
//   };
// firebase.initializeApp(firebaseConfig);
// let survey_ref = firebase.database().ref("survey_report")
// let inst_ref = firebase.database().ref("inst_report")
// let service_ref = firebase.database().ref("service_report")
// let op_json = ""

// const { response } = require("express");

// document.getElementById('history-select').addEventListener('change', function (){
//     history_select = document.getElementById('history-select')
//     var val = history_select.options[history_select.selectedIndex].value;
    
//     if(val == 'ATM'){
//         // console.log('atm')
//     }
//     if(val == 'BRANCH'){
//         // console.log('branch')
//     }
// })
let table = ""
let where = ""
document.getElementById('history-select_id').addEventListener('change',function (){
    history_type = document.getElementById('history-select_id')
    let val = history_type.options[history_type.selectedIndex].value;
    
    if(val == 'SURVEY'){
        table = 'survey'
        where = 'atmcode'
        console.log('survey')
        html=""
        img = ""
        datalist_wrapper = document.getElementById('did_list_survey')
        datalist_wrapper.innerHTML = ''
        fetch("http://192.168.0.194:3000/getlist/survey/atmcode")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                for(var i=0; i<data.length;i++){
                    html+="<option>"+data[i]+"</option>"
                }
                datalist_wrapper.innerHTML+=html
            })
    }
    if(val == 'SERVICE'){
        table = 'service'
        where = 'atmid'
        console.log('service')
        html=""
        datalist_wrapper = document.getElementById('did_list_survey')
        datalist_wrapper.innerHTML = ''
        fetch("http://192.168.0.194:3000/getlist/service/atmid")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                for(var i=0; i<data.length;i++){
                    html+="<option>"+data[i]+"</option>"
                }
                datalist_wrapper.innerHTML+=html
            })
        }
    if(val == 'INSTALLATION'){
        table = 'inst'
        where = 'atm_code'
    html=""
    datalist_wrapper = document.getElementById('did_list_survey')
    datalist_wrapper.innerHTML = ''
    fetch("http://192.168.0.194:3000/getlist/inst/atm_code")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(var i=0; i<data.length;i++){
                html+="<option>"+data[i]+"</option>"
            }
            datalist_wrapper.innerHTML+=html
        })
}
    if(val == 'TESTHW'){
        table = 'test_hw'
        where = 'mbsn'
        html=""
        datalist_wrapper = document.getElementById('did_list_survey')
        datalist_wrapper.innerHTML = ''
        fetch("http://192.168.0.194:3000/getlist/test_hw/mbsn")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                for(var i=0; i<data.length;i++){
                    html+="<option>"+data[i]+"</option>"
                }
                datalist_wrapper.innerHTML+=html
            })
    }
    if(val == 'TESTDATA'){
        table = 'test_sw'
        where = 'mbsn'
        html=""
        datalist_wrapper = document.getElementById('did_list_survey')
        datalist_wrapper.innerHTML = ''
        fetch("http://192.168.0.194:3000/getlist/test_sw/mbsn")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                for(var i=0; i<data.length;i++){
                    html+="<option>"+data[i]+"</option>"
                }
                datalist_wrapper.innerHTML+=html
            })
    }
})

document.getElementById('did_list').addEventListener('change', async function (){
    let cols = []
    let vals = []
    console.log(table)
    search_val = document.getElementById('did_list').value
    fetch("http://192.168.0.194:3000/getrow/"+table+"/"+where+"/"+search_val)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        img = data['sign_imgs']['data']
        console.log(img.toString('utf-8'))
        for (var key in data) {
            cols.push(key)
            vals.push(data[key])
        }
        html = ''
        html += '<table><tr>'
        for(var i=0;i<cols.length;i++){
            html+='<th>'+cols[i]+'</th>'
        }
        html+='</tr>'
        html+='<tr>'
        for(var i=0;i<vals.length;i++){
            html+='<td>'+vals[i]+'</td>'
        }
        html+='</tr><table>'
        html+='<br><button id="get_img_link" onclick="get_imgs()">View Images</button>'
        document.getElementById('history-table').innerHTML = html
    }) 
})


function get_imgs(){
    fetch("http://192.168.0.194:3000/getimgl/"+table+"/"+where+"/"+search_val)
    .then(response => response.text())
    .then(data => {
        img_list_data = data.split("**")
        for(i=0;i<img_list_data.length;i++){
            if(img_list_data[i].length>0){
                console.log(img_list_data[i])
                img_html = '<br><img src="data:image/jpeg;base64,'+img_list_data[i]+'">'
                document.getElementById('history-table').innerHTML += img_html
            }
        }
    })
    fetch("http://192.168.0.194:3000/getimg/"+table+"/"+where+"/"+search_val)
    .then(response => response.text())
    .then(data => {
        img_base64 = data
        console.log(img_base64)
        img_html = '<br><img src="data:image/jpeg;base64,'+img_base64+'">'
        document.getElementById('history-table').innerHTML += img_html
    })
}

// document.getElementById('get_img_link').addEventListener('click', function (){
//     console.log('hii')
//     fetch("http://192.168.0.194:3000/getimg/"+table+"/"+where+"/"+search_val)
//     .then(response => response.json())
//     .then(data => {
//         img_base64 = data
//         console.log(img_base64)
//     })
// })
// document.getElementById('did_list').addEventListener('change', async function (){
//     console.log('did')
//     search_val = document.getElementById('did_list').value
//     var data_ref = document.getElementById('history-select_id')
//     var data_ref = data_ref.options[data_ref.selectedIndex].value;
    
//     if(data_ref == 'SURVEY'){

//         await survey_ref.child(search_val)
//         .once('value')
//         .then(function (snapshot) {
//             op_json = snapshot.val()    
//             console.log(op_json)
//             html = ''
//             document.getElementById('history-table').innerHTML = html
//             // document.getElementById('history-table').innerHTML = html
//             html = '<table>'
//             html += '<tr><th>Datetime</th><th>City</th><th>Code</th><th>Address</th><th>ATMO</th><th>ATMO No.</th><th>Mail ID</th><th>SitePerson</th><th>SitePerson No.</th><th>ATM Count</th><th>SiteImage</th></tr>'
//             html += '<tr><td>'+ op_json['atm']['datetime'] +'</td><td>'+op_json['atm']['atm_city']+'</td><td>'+search_val+'</td><td>'+op_json['atm']['atm_address']+'</td><td>'+op_json['atm']['atmoname']+'</td><td>'+op_json['atm']['atmcontact']+'</td><td>'+op_json['atm']['atmo_mail']+'</td><td>'+op_json['atm']['site_person']+'</td><td>'+op_json['atm']['site_person_contact']+'</td><td>'+op_json['atm']['atm_count']+'</td><td>'+op_json['atm']['site_image']+'</td></tr>'
//             html += '</table>'
            

//             html += '<table>'
//             html += '<tr><th colspan="5">AC1</th><th colspan="5">AC2</th><tr>'
//             html += '<tr><td>Brand</td><td>Capacity</td><td>Communication</td><td>Status</td><td>Type</td><td>Brand</td><td>Capacity</td><td>Communication</td><td>Status</td><td>Type</td></tr>'
//             html += '<tr><td>'+op_json['ac_details']['ac1']['brand']+'</td><td>'+op_json['ac_details']['ac1']['capacity']+'</td><td>'+op_json['ac_details']['ac1']['comm']+'</td><td>'+op_json['ac_details']['ac1']['status']+'</td><td>'+op_json['ac_details']['ac2']['type']+'</td><td>'+op_json['ac_details']['ac2']['brand']+'</td><td>'+op_json['ac_details']['ac2']['capacity']+'</td><td>'+op_json['ac_details']['ac2']['comm']+'</td><td>'+op_json['ac_details']['ac2']['status']+'</td><td>'+op_json['ac_details']['ac2']['type']+'</td></tr>'
//             html += '</table>'

//             html += '<table>'
//             html += '<tr><th colspan=2>Door</th><th colspan=3>DVR Details</th><th colspan=2>SLD</th><th colspan=2>LobbyLights</th><th colspan=2>Meter</th><th colspan=2>Signage</th><th colspan=2>Timer</th></tr>'
//             html += '<tr><td>Status</td><td>Stopper</td><td>Camera count</td><td>HDD Capacity</td><td>Model</td><td>PanelCount</td><td>Type</td><td>No. of Light</td><td>Type</td><td>Meter EB</td><td>Type</td><td>Status</td><td>Timing</td><td>AC Timer Type</td><td>Signage Timer Type</td></tr>'
//             html += '<tr><td>'+op_json['door']['status']+'</td><td>'+op_json['door']['stopper']+'</td>'
//             html += '<td>'+op_json['dvr_details']['cam_no']+'</td><td>'+op_json['dvr_details']['hdd_capacity']+'</td><td>'+op_json['dvr_details']['model']+'</td>'
//             html += '<td>'+op_json['esld']['npanels']+'</td><td>'+op_json['esld']['type']+'</td>'
//             html += '<td>'+op_json['lobby_lights']['n_light']+'</td><td>'+op_json['lobby_lights']['type']+'</td>'
//             html += '<td>'+op_json['meter']['meter_eb']+'</td><td>'+op_json['meter']['type']+'</td>'
//             html += '<td>'+op_json['signage']['status']+'</td><td>'+op_json['signage']['timing']+'</td>'
//             html += '<td>'+op_json['timer']['ac_timer_type']+'</td><td>'+op_json['signage_timer_type']+'</td></tr>'
//             html += '</table>'

//             html += '<table>'
//             html += '<tr><th colspan=7>UPS Details</th></tr>'
//             html += '<tr><th>Battery Count</th><th>Capacity</th><th>Model</th><th>AVR</th><th>Battery Voltage</th><th>Servo</th><th>Trans</th></tr>'
//             html += '<tr><td>'+op_json['ups_details']['batteries']+'</td><td>'+op_json['ups_details']['capacity']+'</td><td>'+op_json['ups_details']['model']+'</td><td>'+op_json['ups_details']['ups_avr']+'</td><td>'+op_json['ups_details']['ups_batt_volt']+'</td><td>'+op_json['ups_details']['ups_servo']+'</td><td>'+op_json['ups_details']['ups_trans']+'</td></tr>'
//             html += '</table>'

//             html += '<table style="table-layout: fixed ; width: 100%;">'
//             html += '<tr><th>Notes</th></tr>'
//             html += '<tr><td>'+op_json['notes']+'</td></tr>'
//             html += '</table>'

//             html += '<table>'
//             html += '<tr><th>Sign</th></tr><tr>'+op_json['sign']+'</tr>'
//             html += '</table>'

//             html += '<table>'
//             html += '<tr><th>Image Links</th></tr>'
            
//             for(let i=0; i<100; i++){
//                 try{
//                     img_link = op_json['site_img_'+i]
                   
//                     if(typeof img_link != 'undefined'){
//                         html += '<tr><td>'+img_link+'</td></tr>'
//                     }
//                 }
//                 catch(error){
//                     console.log()
//                 }
//             }
//             html += '</table>'
//             document.getElementById('history-table').innerHTML += html
//         })
        
//     }

//     if(data_ref == 'SERVICE'){
//         let key_lst = []
//         let op_json = ""
//         await service_ref.child(search_val)
//         .once('value')
//         .then(function (snapshot){
//             op_json = snapshot.val()  
//             snapshot.forEach(child => {
//                 k = child.key
//                 console.log(op_json[k])
//                 html = '' 
//                 html = '<table>'
//                 html += '<tr><th>Datetime</th><th>ATM NAME</th><th>SitePerson</th><th>SitePerson Contact</th></tr>'
//                 html += '<tr><td>'+k+'</td><td>'+op_json[k]["city"]+'</td><td>'+op_json['siteperson']+'</td><td>'+op_json['sitepersoncontact']+'</td></tr>'
//                 html += '<tr><th>Parameters</th><th>Status</th><th colspan=2>Remarks</th></tr>'
//                 html += '<tr><td>AC1</td><td>'+op_json[k]["ac1"]["status"]+'</td><td colspan=2>'+op_json[k]["ac1"]["remark"]+'</td></tr>'
//                 html += '<tr><td>AC2</td><td>'+op_json[k]["ac2"]["status"]+'</td><td colspan=2>'+op_json[k]["ac2"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Lobby</td><td>'+op_json[k]["lobby"]["status"]+'</td><td colspan=2>'+op_json[k]["lobby"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Signage</td><td>'+op_json[k]["signage"]["status"]+'</td><td colspan=2>'+op_json[k]["signage"]["remark"]+'</td></tr>'
//                 html += '<tr><td>DVR</td><td>'+op_json[k]["dvr"]["status"]+'</td><td colspan=2>'+op_json[k]["ac1"]["dvr"]+'</td></tr>'
//                 html += '<tr><td>VSAT</td><td>'+op_json[k]["vsat"]["status"]+'</td><td colspan=2>'+op_json[k]["vsat"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Temp & Humidity</td><td>'+op_json[k]["tempandh"]["status"]+'</td><td colspan=2>'+op_json[k]["tempandh"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Occupancy</td><td>'+op_json[k]["occupancy"]["status"]+'</td><td colspan=2>'+op_json[k]["occupancy"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Door Sensor</td><td>'+op_json[k]["doorsensor"]["status"]+'</td><td colspan=2>'+op_json[k]["doorsensor"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Earthing</td><td>'+op_json[k]["earthing"]["status"]+'</td><td colspan=2>'+op_json[k]["earthing"]["remark"]+'</td></tr>'
//                 html += '<tr><td>UPS</td><td>'+op_json[k]["ups"]["status"]+'</td><td colspan=2>'+op_json[k]["ups"]["remark"]+'</td></tr>'
//                 html += '<tr><td>iATM</td><td>'+op_json[k]["iatm"]["status"]+'</td><td colspan=2>'+op_json[k]["iatm"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Router</td><td>'+op_json[k]["router"]["status"]+'</td><td colspan=2>'+op_json[k]["router"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Battery</td><td>'+op_json[k]["battery"]["status"]+'</td><td colspan=2>'+op_json[k]["battery"]["remark"]+'</td></tr>'
//                 html += '<tr><td>ATM Machine</td><td>'+op_json[k]["atmmachine"]["status"]+'</td><td colspan=2>'+op_json[k]["atmmachine"]["remark"]+'</td></tr>'
//                 html += '<tr><th colspan=2>In Time</th><th colspan=2>Out Time</th></tr>'
//                 html += '<tr><td colspan=2>'+op_json[k]["intime"]+'</td><td colspan=2>'+op_json[k]['outtime']+'</td></tr>'
//                 html += '<tr><td colspan=2>Problem</td><td colspan=2>'+op_json[k]["problem"]+'</td></tr>'
//                 html += '<tr><td colspan=2>Issue</td><td colspan=2>'+op_json[k]["issue"]+'</td></tr>'
//                 html += '<tr><td colspan=2>Maintanence</td><td colspan=2>'+op_json[k]["maint"]+'</td></tr>'
//                 html += '<tr><td colspan=2>Notes</td><td colspan=2>'+op_json[k]["notes"]+'</td></tr>'
//                 html += '</table>'

//                 document.getElementById('history-table').innerHTML += html
//             })  
//         })
//     }

//     if(data_ref == 'INSTALLATION'){
//         let key_lst = []
//         let op_json = ""
//         await inst_ref.child(search_val)
//         .once('value')
//         .then(function (snapshot){
//             op_json = snapshot.val()  
//             snapshot.forEach(child => {
//                 k = child.key
//                 console.log(op_json[k])
//                 html = '' 
//                 html = '<table>'
//                 html += '<tr><th>Datetime</th><th>ATM NAME</th><th>SitePerson</th><th>SitePerson Contact</th></tr>'
//                 html += '<tr><td>'+k+'</td><td>'+op_json[k]["city"]+'</td><td>'+op_json['siteperson']+'</td><td>'+op_json['sitepersoncontact']+'</td></tr>'
//                 html += '<tr><th>Parameters</th><th>Status</th><th colspan=2>Remarks</th></tr>'
//                 html += '<tr><td>AC1</td><td>'+op_json[k]["ac1"]["status"]+'</td><td colspan=2>'+op_json[k]["ac1"]["remark"]+'</td></tr>'
//                 html += '<tr><td>AC2</td><td>'+op_json[k]["ac2"]["status"]+'</td><td colspan=2>'+op_json[k]["ac2"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Lobby</td><td>'+op_json[k]["lobby"]["status"]+'</td><td colspan=2>'+op_json[k]["lobby"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Signage</td><td>'+op_json[k]["signage"]["status"]+'</td><td colspan=2>'+op_json[k]["signage"]["remark"]+'</td></tr>'
//                 html += '<tr><td>DVR</td><td>'+op_json[k]["dvr"]["status"]+'</td><td colspan=2>'+op_json[k]["ac1"]["dvr"]+'</td></tr>'
//                 html += '<tr><td>VSAT</td><td>'+op_json[k]["vsat"]["status"]+'</td><td colspan=2>'+op_json[k]["vsat"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Temp & Humidity</td><td>'+op_json[k]["tempandh"]["status"]+'</td><td colspan=2>'+op_json[k]["tempandh"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Occupancy</td><td>'+op_json[k]["occupancy"]["status"]+'</td><td colspan=2>'+op_json[k]["occupancy"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Door Sensor</td><td>'+op_json[k]["doorsensor"]["status"]+'</td><td colspan=2>'+op_json[k]["doorsensor"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Earthing</td><td>'+op_json[k]["earthing"]["status"]+'</td><td colspan=2>'+op_json[k]["earthing"]["remark"]+'</td></tr>'
//                 html += '<tr><td>UPS</td><td>'+op_json[k]["ups"]["status"]+'</td><td colspan=2>'+op_json[k]["ups"]["remark"]+'</td></tr>'
//                 html += '<tr><td>iATM</td><td>'+op_json[k]["iatm"]["status"]+'</td><td colspan=2>'+op_json[k]["iatm"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Router</td><td>'+op_json[k]["router"]["status"]+'</td><td colspan=2>'+op_json[k]["router"]["remark"]+'</td></tr>'
//                 html += '<tr><td>Battery</td><td>'+op_json[k]["battery"]["status"]+'</td><td colspan=2>'+op_json[k]["battery"]["remark"]+'</td></tr>'
//                 html += '<tr><td>ATM Machine</td><td>'+op_json[k]["atmmachine"]["status"]+'</td><td colspan=2>'+op_json[k]["atmmachine"]["remark"]+'</td></tr>'
//                 html += '<tr><th colspan=2>In Time</th><th colspan=2>Out Time</th></tr>'
//                 html += '<tr><td colspan=2>'+op_json[k]["intime"]+'</td><td colspan=2>'+op_json[k]['outtime']+'</td></tr>'
//                 html += '<tr><td colspan=2>Problem</td><td colspan=2>'+op_json[k]["problem"]+'</td></tr>'
//                 html += '<tr><td colspan=2>Issue</td><td colspan=2>'+op_json[k]["issue"]+'</td></tr>'
//                 html += '<tr><td colspan=2>Maintanence</td><td colspan=2>'+op_json[k]["maint"]+'</td></tr>'
//                 html += '<tr><td colspan=2>Notes</td><td colspan=2>'+op_json[k]["notes"]+'</td></tr>'
//                 html += '</table>'

//                 document.getElementById('history-table').innerHTML += html
//             })  
//         })
//     }
// })


// async function init(){

//     datalist_wrapper = document.getElementById('did_list_survey')
//     console.log(datalist_wrapper)
//     survey_ref.once('value', snapshot=>{
//         snapshot.forEach(child => {
//             console.log(child.key);
//             html=''
//             html='<option>'+child.key+'</option>'
//             datalist_wrapper.innerHTML+=html
//         })   
//     })
// }
// setTimeout(() => {
//     init()
// }, 500);


// firebase.analytics();
// var database = firebase.database();
// refATM = database.ref("ATM")
// refBRANCH = database.ref("BRANCH")

// var historyType = $("select[class=history-select]");
// var historyCode = $(".history_code_dropdown");
// var historyName = $(".history_name_dropdown");

// historyType.on("change", function(e){
//     checkType()
// })

// function checkType(){
//     var value = $('#history-select').val()
//     ref = database.ref(value)

//     ref.on('value', function (snapshot){
//         var did = snapshot.val()
//         var didObj = Object.keys(did)
//         var didObjLength = didObj.length
//         var didObjarray = []
//         var html = '<div class=\"history_code_dropdown\">'
//         html+='<select style=\"width:100%;\" id=\"history_code\" class=\"history-code-select\">'
//         for(let i=0; i<didObjLength; i++){
//             didObjValue = snapshot.child(didObj[i]).val()
//             didObjarray.push(Object.keys(didObjValue))
//             html+= '<option>'+didObj[i]+'</option>'
//         }
//         html+='</select>'
//         html+='</div>'
//         document.getElementById('history_code_dropdown').innerHTML = html
    
//         // // dropdown2
//         var didObjarrayLenght = didObjarray.length
//         var html2 = '<div class=\"history_name_dropdown\">'
//         html2+='<select style=\"width:100%;\" id=\"history_name\" class=\"history-code-select\">'
//         for(let i=0; i<didObjarrayLenght; i++){
//             html2+= '<option>'+didObjarray[i]+'</option>'
//         }
//         html2+='</select>'
//         html2+='</div>'
//         document.getElementById('history_name_dropdown').innerHTML = html2
//     })
// }

// historyCode.on("change", function(e){
//     var codeValue = $('#history_code').val()
//     var typeValue = $('#history-select').val()
//     var ref = database.ref(typeValue + '/' + codeValue)
//     ref.on('value', function(snapshot){
//         var snap = snapshot.val()
//         var key = Object.keys(snap)
//         document.getElementById('history_name').value = key
//     })
//     setTimeout(() => {
//         createTable()
//     }, 2500);
// })

// historyName.on("change", function(e){
//     var nameValue = $("#history_name").val()
//     var typeValue = $("#history-select").val()
//     var ref = database.ref(typeValue)
//     ref.on('value', function(snapshot){
//         var snap = snapshot.val()
//         var keys = Object.keys(snap)
//         var keysLength = keys.length
//         for(let i = 0; i < keysLength; i++){
//             var keysData = database.ref(typeValue).child(keys[i])
//             keysData.on('value', function(snapshot){
//                 var snap2 = snapshot.val()
//                 var KeysValue = Object.keys(snap2)
//                 if(KeysValue == nameValue){
//                     document.getElementById('history_code').value = keys[i]
//                 }
//             })

//         }
//     })
//     setTimeout(() => {
//         createTable()
//     }, 2500);
// })

// function createTable(){
//     var typeValue = $("#history-select").val()
//     var codeValue = $('#history_code').val()
//     var nameValue = $("#history_name").val()
//     var ref = database.ref(typeValue).child(codeValue).child(nameValue)
//     ref.on('value', function(snapshot){
        
//         var snap = snapshot.val()
//         var keys = Object.keys(snap)
//         var keysLength = keys.length
//         var html = '<tbody>';
//         for(let i = 0; i < keysLength; i++){
//             var child = snapshot.child(keys[i]).val()
//             var childKeys = Object.keys(child)
//             var childKeysLength = childKeys.length
//             j = i+1
//             html+= '<tr>'
// html+= '<th scope=\'row\'>' + j + '</th>'
//             html+= '<td style="width: 9%">' + keys[i] + '</td>'
//             for( let z = 0; z < childKeysLength; z++){
//                 var childKeysValue = snapshot.child(keys[i]).child(childKeys[z]).val()
//                 var myJson = JSON.stringify(childKeysValue)
//                 html+= '<td>' + '<p> <b class="font-weight-bold">' + childKeys[z] + '</b> </p>' + myJson + '</td>'
//             }
//             html+= '</tr>'
//         }
//         html+='</tbody>'
//         document.getElementById('history-table').innerHTML = html
//     })
// }
// checkType()
// setTimeout(() => {
//     createTable()
// }, 2500);