function reset(){
    location.reload()
}

let sign_img_list = []
let site_img_list = ""
window.onload = function get_atmcode(){
    atmid_wrapper = document.getElementById('atmid_list')
    atmcity_wrapper = document.getElementById('atmname_list')
    fetch("http://192.168.0.194:3000/getlist/survey/atmcode")
    .then(response => response.json())
    .then(data => {
        for(var i=0;i<data.length;i++){
            html = '<option>'+data[i]+'</option>'
            atmid_wrapper.innerHTML += html
        }
    })
    fetch("http://192.168.0.194:3000/getlist/survey/atmcity")
    .then(response => response.json())
    .then(data => {
        for(var i=0;i<data.length;i++){
            html = '<option>'+data[i]+'</option>'
            atmcity_wrapper.innerHTML += html
        }
    })
}

function get_details(clicked){
    try{
        arg = document.getElementById(clicked).value
        ele = document.getElementById('atm_name')
        // atmid_ref.child(arg).once("value")
        // .then((data) => {
        //     ele.value = data.val()
        // })
        fetch("http://192.168.0.194:3000/getrow/survey/"+arg)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            ele.value = data['atmcity']
            document.getElementById('mgr_name').value = data['atmo_name']
            document.getElementById('mgr_con').value = data['atmo_contact']
            document.getElementById('mgr_email').value = data['atmo_mail']  
        })
        // survey_ref.child(arg).child('atm').once("value")
        // .then((data)=>{
        //     // console.log(data.val())
        //     document.getElementById('mgr_name').value = data.val()['atmoname']
        //     document.getElementById('mgr_con').value = data.val()['atmcontact']
        //     document.getElementById('mgr_email').value = data.val()['atmo_mail']            
        // })
    }
    catch(error){
        console.log('')
    }
}

function updatefunc(clicked){
    var x = document.getElementById(clicked)
    var x = x.options[x.selectedIndex].value
    if(x=='Service'){
        document.getElementById('tab2').innerText = 'SERVICE'
    }
    else{
        document.getElementById('tab2').innerText = 'INSTALLATION'
    }
}

function storedata(){
    atmcode = document.getElementById('atm_id_dropdown').value
    atmcity = document.getElementById('atm_city_dropdown').value
    currdate = document.getElementById('datetime').value
    atmaddr = document.getElementById('atm_name_dropdown').value
    atmoname = document.getElementById('atm_manager_name').value
    atmcontact = document.getElementById('atm_contact').value
    atmo_mail = document.getElementById('atm_email').value
    site_person = document.getElementById('atm_person_name').value
    site_person_contact = document.getElementById('atm_person_contact').value

    ac1_type = document.getElementById('tac1')
    ac1_type = ac1_type.options[ac1_type.selectedIndex].text
    ac1_brand = document.getElementById('mac1').value
    ac1_capacity = document.getElementById('cac1')
    ac1_capacity = ac1_capacity.options[ac1_capacity.selectedIndex].text
    ac1_comm = document.getElementById('coac1')
    ac1_comm = ac1_comm.options[ac1_comm.selectedIndex].text
    ac1_status = document.getElementById('dac1')
    ac1_status = ac1_status.options[ac1_status.selectedIndex].text

    ac2_type = document.getElementById('tac2')
    ac2_type = ac2_type.options[ac2_type.selectedIndex].text
    ac2_brand = document.getElementById('mac2').value
    ac2_capacity = document.getElementById('cac2')
    ac2_capacity = ac2_capacity.options[ac2_capacity.selectedIndex].text
    ac2_comm = document.getElementById('coac2')
    ac2_comm = ac2_comm.options[ac2_comm.selectedIndex].text
    ac2_status = document.getElementById('dac2')
    ac2_status = ac2_status.options[ac2_status.selectedIndex].text

    ups_model = document.getElementById('mups').value
    ups_capacity = document.getElementById('caups').value
    ups_batteries = document.getElementById('bups')
    ups_batteries = ups_batteries.options[ups_batteries.selectedIndex].text
    ups_avr = document.getElementById('avrups')
    ups_avr = ups_avr.options[ups_avr.selectedIndex].text
    ups_trans = document.getElementById('transups')
    ups_trans = ups_trans.options[ups_trans.selectedIndex].text
    ups_servo = document.getElementById('servosups')
    ups_servo = ups_servo.options[ups_servo.selectedIndex].text
    ups_batt_volt = document.getElementById('volsups')
    ups_batt_volt = ups_batt_volt.options[ups_batt_volt.selectedIndex].text

    esld = document.getElementById('sldelecsys').value
    npanels = document.getElementById('panelselecsys')
    npanels = npanels.options[npanels.selectedIndex].text

    lobby_light = document.getElementById('tlobby')
    lobby_light = lobby_light.options[lobby_light.selectedIndex].text
    n_light = document.getElementById('nlobby')
    n_light = n_light.options[n_light.selectedIndex].text

    signage_status = document.getElementById('dsignage')
    signage_status = signage_status.options[signage_status.selectedIndex].text
    signage_time = document.getElementById('timesignage').value

    dvr_model = document.getElementById('mdvr')
    dvr_model = dvr_model.options[dvr_model.selectedIndex].text
    dvr_cam_no = document.getElementById('cameradvr')
    dvr_cam_no = dvr_cam_no.options[dvr_cam_no.selectedIndex].text
    dvr_hdd = document.getElementById('hdddvr')
    dvr_hdd = dvr_hdd.options[dvr_hdd.selectedIndex].text

    door_status = document.getElementById('ddoor')
    door_status = door_status.options[door_status.selectedIndex].text
    door_stoppper = document.getElementById('ddoorstopper')
    door_stoppper = door_stoppper.options[door_stoppper.selectedIndex].text

    atm_count = document.getElementById('atmcount')
    atm_count = atm_count.options[atm_count.selectedIndex].text
    site_image = document.getElementById('siteimage')
    site_image = site_image.options[site_image.selectedIndex].text

    meter_eb = document.getElementById('metereb').value
    meter_type = document.getElementById('typeeb')
    meter_type = meter_type.options[meter_type.selectedIndex].text

    signage_timer_type = document.getElementById('stimertype')
    signage_timer_type = signage_timer_type.options[signage_timer_type.selectedIndex].text
    ac_timer_type = document.getElementById('actimertype')
    ac_timer_type = ac_timer_type.options[ac_timer_type.selectedIndex].text

    notes = document.getElementById('atm_note').value
    
    fetch('http://192.168.0.194:3000/form',{
        method:'POST',
        headers:{"Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"},
        // body:'{"atmcity":"'+atmcity+'","atmcode:""'+atmcode+'"}',
        body:'{"table":"survey","atmcity":"'+atmcity+'","currdate":"'+currdate+'","atmcode":"'+atmcode+'","atmaddr":"'+atmaddr+'","atmo_name":"'+atmoname+'","atmo_contact":"'+atmcontact+'","atmo_mail":"'+atmo_mail+'","site_person_name":"'+site_person+'","site_person_contact":"'+site_person_contact+'","ac1_type":"'+ac1_type+'","ac1_brand":"'+ac1_brand+'","ac1_capacity":"'+ac1_capacity+'","ac1_ir":"'+ac1_comm+'","ac1_status":"'+ac1_status+'","ac2_type":"'+ac2_type+'","ac2_brand":"'+ac2_brand+'","ac2_capacity":"'+ac2_capacity+'","ac2_ir":"'+ac2_comm+'","ac2_status":"'+ac2_status+'","ups_model":"'+ups_model+'","ups_capacity":"'+ups_capacity+'","ups_battery":"'+ups_batteries+'","ups_avr":"'+ups_avr+'","ups_trans":"'+ups_trans+'","ups_servo":"'+ups_servo+'","ups_batt_volt":"'+ups_batt_volt+'","esld":"'+esld+'","npanels":"'+npanels+'","lobby_lights":"'+lobby_light+'","n_light":"'+n_light+'","signage_status":"'+signage_status+'","signage_time":"'+signage_time+'","dvr_model":"'+dvr_model+'","dvr_cam_no":"'+dvr_cam_no+'","dvr_hdd":"'+dvr_hdd+'","door_status":"'+door_status+'","door_stopper":"'+door_stoppper+'","atm_count":"'+atm_count+'","site_img":"'+site_image+'","meter_eb":"'+meter_eb+'","meter_type":"'+meter_type+'","signage_timer_type":"'+window.btoa(signage_timer_type)+'","ac_timer_type":"'+ac_timer_type+'","notes":"'+notes+'","sign_imgs":"'+sign_img_list+'","site_img":"'+site_img_list+'"}'
        
    })
}



async function storedata1(){
    console.log('working')
    // var x = document.getElementById('option-select')
    // var x = x.options[x.selectedIndex].value

    // try{
    // // all checkboxes
    // ac1s = document.querySelector('input[name="ac1"]:checked').value  
    // ac2s = document.querySelector('input[name="ac2"]:checked').value
    // lobbys = document.querySelector('input[name="lobby"]:checked').value
    // signages = document.querySelector('input[name="signage"]:checked').value
    // dvrs = document.querySelector('input[name="dvr"]:checked').value
    // vsats = document.querySelector('input[name="vsat"]:checked').value
    // tahs = document.querySelector('input[name="tah"]:checked').value
    // occus = document.querySelector('input[name="occupancy"]:checked').value
    // doors = document.querySelector('input[name="doorsensor"]:checked').value
    // earthings = document.querySelector('input[name="earthing"]:checked').value
    // upss = document.querySelector('input[name="ups"]:checked').value
    // iatms = document.querySelector('input[name="iatm"]:checked').value
    // routers = document.querySelector('input[name="router"]:checked').value
    // batterys = document.querySelector('input[name="battery"]:checked').value
    // atmms = document.querySelector('input[name="atmmachine"]:checked').value

    // // all remarks
    // ac1r = document.getElementById('ac1r').value
    // ac2r = document.getElementById('ac2r').value
    // lobbyr = document.getElementById('lobbyr').value
    // signager = document.getElementById('signager').value
    // dvrr = document.getElementById('dvrr').value
    // vsatr = document.getElementById('vsatr').value
    // tahr = document.getElementById('tahr').value
    // or = document.getElementById('or').value
    // dsr = document.getElementById('dsr').value
    // er = document.getElementById('er').value
    // upsr = document.getElementById('upsr').value
    // iatmr = document.getElementById('iatmr').value
    // routerr = document.getElementById('routerr').value
    // br = document.getElementById('br').value
    // atmmr = document.getElementById('atmmr').value


    // // other fields
    // atmid = document.getElementById('atm_id').value
    // atmc = document.getElementById('atm_name').value
    // currdate1 = document.getElementById('datetime2').value
    // mgr_name = document.getElementById('mgr_name').value
    // mgr_con = document.getElementById('mgr_con').value
    // mgr_email = document.getElementById('mgr_email').value
    // site_prs = document.getElementById('site_prs').value
    // site_p_con = document.getElementById('site_p_con').value
    // intime = document.getElementById('intime').value
    // outtime = document.getElementById('outtime').value
    // problem = document.getElementById('problem').value
    // issue = document.getElementById('issue').value
    // maint = document.getElementById('maint').value
    // notes1 = document.getElementById('notes1').value
    // }
    // catch(error){
    //     console.log(error)
    //     alert('check all inputs again ...')
    // }
  
    // if(x=='Service'){
    //     fetch('http://192.168.0.194:3000/form',{
    //     method:'POST',
    //     headers:{"Content-Type": "application/json",
    //             "Access-Control-Allow-Origin":"*"},
    //     body:'{"table":"service","ac1s":"'+ac1s+'","ac2s":"'+ac2s+'","lobbys":"'+lobbys+'","signages":"'+signages+'","dvrs":"'+dvrs+'","vsats":"'+vsats+'","tahs":"'+tahs+'","occus":"'+occus+'","doors":"'+doors+'","earthings":"'+earthings+'","upss":"'+upss+'","iatms":"'+iatms+'","routers":"'+routers+'","batterys":"'+batterys+'","atmms":"'+atmms+'","ac1r":"'+ac1r+'","ac2r":"'+ac2r+'","lobbyr":"'+lobbyr+'","signager":"'+signager+'","dvrr":"'+dvrr+'","vsatr":"'+vsatr+'","tahr":"'+tahr+'","or":"'+or+'","dsr":"'+dsr+'","er":"'+er+'","upsr":"'+upsr+'","iatmr":"'+iatmr+'","routerr":"'+routerr+'","br":"'+br+'","atmmr":"'+atmmr+'","atmid":"'+atmid+'","atmc":"'+atmc+'","currdate":"'+currdate1+'","mgr_name":"'+mgr_name+'","mgr_con":"'+mgr_con+'","mgr_email":"'+mgr_email+'","site_prs":"'+site_prs+'","site_p_con":"'+site_p_con+'","intime":"'+intime+'","outtime":"'+outtime+'","problem":"'+problem+'","issue":"'+issue+'","maint":"'+maint+'","notes":"'+notes1+'"}'
    // })
    // }

    // if(x == 'Installation'){
    //     fetch('http://192.168.0.194:3000/form',{
    //     method:'POST',
    //     headers:{"Content-Type": "application/json",
    //             "Access-Control-Allow-Origin":"*"},
    //     body:'{"table":"service","ac1s":"'+ac1s+'","ac2s":"'+ac2s+'","lobbys":"'+lobbys+'","signages":"'+signages+'","dvrs":"'+dvrs+'","vsats":"'+vsats+'","tahs":"'+tahs+'","occus":"'+occus+'","doors":"'+doors+'","earthings":"'+earthings+'","upss":"'+upss+'","iatms":"'+iatms+'","routers":"'+routers+'","batterys":"'+batterys+'","atmms":"'+atmms+'","ac1r":"'+ac1r+'","ac2r":"'+ac2r+'","lobbyr":"'+lobbyr+'","signager":"'+signager+'","dvrr":"'+dvrr+'","vsatr":"'+vsatr+'","tahr":"'+tahr+'","ocr":"'+or+'","dsr":"'+dsr+'","er":"'+er+'","upsr":"'+upsr+'","iatmr":"'+iatmr+'","routerr":"'+routerr+'","br":"'+br+'","atmmr":"'+atmmr+'","atmid":"'+atmid+'","atmc":"'+atmc+'","currdate1":"'+currdate1+'","mgr_name":"'+mgr_name+'","mgr_con":"'+mgr_con+'","mgr_email":"'+mgr_email+'","site_prs":"'+site_prs+'","site_p_con":"'+site_p_con+'","intime":"'+intime+'","outtime":"'+outtime+'","problem":"'+problem+'","issue":"'+issue+'","maint":"'+maint+'","notes1":"'+notes1+'"}'
    //         })
    // }
}   

document.getElementById("atm_sign_file").addEventListener('change', (e)=>{
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
    var base64String = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '');
    // console.log(base64String);
    sign_img_list.push(base64String)
    console.log(sign_img_list)
    };
    reader.readAsDataURL(file);
});

document.getElementById("atm_site_file").addEventListener('change',(e) => {
    site_img_list = ""
    element = document.getElementById("atm_site_file")
    for(i=0;i<element.files.length;i++){
        img2base64(element.files[i])
   }
   console.log(site_img_list)
})

function img2base64(img){
    var file = img;
    var reader = new FileReader()
    reader.onloadend = () => {
        var base64 = reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');
        // console.log(base64+";")
        base64 = base64+"**"
        site_img_list += base64
    }
    reader.readAsDataURL(file)
}


// for(var i=0; i<site_element.files.length; i++){
//     var storage = firebase.storage().ref('site_images/'+site_element.files[i].name)
//     var upload = await storage.put(site_element.files[i]).then((snapshot) => {
//         snapshot.ref.getDownloadURL().then(
//             function(downloadURL){
//                 // get download URL
//                 console.log(downloadURL)
//                 durl = downloadURL
//                 site_img_list.push(durl)
//                 survey_ref.child(atmcode).child('site_img_'+ct).set(downloadURL)
//                 ct+=1
//             }
//         )
//     })
// }

// // function get_sign(element){
// //     var file = element.files[0];
// //     var reader = new FileReader();
// //     reader.onloadend = function() {
// //         localStorage.setItem('signimage', reader.result)    
// //     }
// //     reader.readAsDataURL(file);
// // }


// // firebase config here
// const firebaseConfig = {
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
// let atmid_ref = firebase.database().ref("ATMID")
// let service_ref = firebase.database().ref("service_report")
// let ins_ref = firebase.database().ref("inst_report")

// let atmcode = ""
// function pushdata(){
   
//     atmcode = document.getElementById('atm_id_dropdown').value
//     atmcity = document.getElementById('atm_city_dropdown').value
//     currdate = document.getElementById('datetime').value
//     atmaddr = document.getElementById('atm_name_dropdown').value
//     atmoname = document.getElementById('atm_manager_name').value
//     atmcontact = document.getElementById('atm_contact').value
//     atmo_mail = document.getElementById('atm_email').value
//     site_person = document.getElementById('atm_person_name').value
//     site_person_contact = document.getElementById('atm_person_contact').value

//     ac1_type = document.getElementById('tac1')
//     ac1_type = ac1_type.options[ac1_type.selectedIndex].text
//     ac1_brand = document.getElementById('mac1').value
//     ac1_capacity = document.getElementById('cac1')
//     ac1_capacity = ac1_capacity.options[ac1_capacity.selectedIndex].text
//     ac1_comm = document.getElementById('coac1')
//     ac1_comm = ac1_comm.options[ac1_comm.selectedIndex].text
//     ac1_status = document.getElementById('dac1')
//     ac1_status = ac1_status.options[ac1_status.selectedIndex].text

//     ac2_type = document.getElementById('tac2')
//     ac2_type = ac2_type.options[ac2_type.selectedIndex].text
//     ac2_brand = document.getElementById('mac2').value
//     ac2_capacity = document.getElementById('cac2')
//     ac2_capacity = ac2_capacity.options[ac2_capacity.selectedIndex].text
//     ac2_comm = document.getElementById('coac2')
//     ac2_comm = ac2_comm.options[ac2_comm.selectedIndex].text
//     ac2_status = document.getElementById('dac2')
//     ac2_status = ac2_status.options[ac2_status.selectedIndex].text

//     ups_model = document.getElementById('mups').value
//     ups_capacity = document.getElementById('caups').value
//     ups_batteries = document.getElementById('bups')
//     ups_batteries = ups_batteries.options[ups_batteries.selectedIndex].text
//     ups_avr = document.getElementById('avrups')
//     ups_avr = ups_avr.options[ups_avr.selectedIndex].text
//     ups_trans = document.getElementById('transups')
//     ups_trans = ups_trans.options[ups_trans.selectedIndex].text
//     ups_servo = document.getElementById('servosups')
//     ups_servo = ups_servo.options[ups_servo.selectedIndex].text
//     ups_batt_volt = document.getElementById('volsups')
//     ups_batt_volt = ups_batt_volt.options[ups_batt_volt.selectedIndex].text

//     esld = document.getElementById('sldelecsys').value
//     npanels = document.getElementById('panelselecsys')
//     npanels = npanels.options[npanels.selectedIndex].text

//     lobby_light = document.getElementById('tlobby')
//     lobby_light = lobby_light.options[lobby_light.selectedIndex].text
//     n_light = document.getElementById('nlobby')
//     n_light = n_light.options[n_light.selectedIndex].text

//     signage_status = document.getElementById('dsignage')
//     signage_status = signage_status.options[signage_status.selectedIndex].text
//     signage_time = document.getElementById('timesignage').value

//     dvr_model = document.getElementById('mdvr')
//     dvr_model = dvr_model.options[dvr_model.selectedIndex].text
//     dvr_cam_no = document.getElementById('cameradvr')
//     dvr_cam_no = dvr_cam_no.options[dvr_cam_no.selectedIndex].text
//     dvr_hdd = document.getElementById('hdddvr')
//     dvr_hdd = dvr_hdd.options[dvr_hdd.selectedIndex].text

//     door_status = document.getElementById('ddoor')
//     door_status = door_status.options[door_status.selectedIndex].text
//     door_stoppper = document.getElementById('ddoorstopper')
//     door_stoppper = door_stoppper.options[door_stoppper.selectedIndex].text

//     atm_count = document.getElementById('atmcount')
//     atm_count = atm_count.options[atm_count.selectedIndex].text
//     site_image = document.getElementById('siteimage')
//     site_image = site_image.options[site_image.selectedIndex].text

//     meter_eb = document.getElementById('metereb').value
//     meter_type = document.getElementById('typeeb')
//     meter_type = meter_type.options[meter_type.selectedIndex].text

//     signage_timer_type = document.getElementById('stimertype')
//     signage_timer_type = signage_timer_type.options[signage_timer_type.selectedIndex].text
//     ac_timer_type = document.getElementById('actimertype')
//     ac_timer_type = ac_timer_type.options[ac_timer_type.selectedIndex].text

//     notes = document.getElementById('atm_note').value

// // ###########################################################

//     localStorage.setItem('atmcode',atmcode)
//     localStorage.setItem('atmcity',atmcity)
//     localStorage.setItem('currdate',currdate)
//     localStorage.setItem('atmaddr',atmaddr) 
//     localStorage.setItem('atmoname',atmoname) 
//     localStorage.setItem('atmcontact',atmcontact) 
//     localStorage.setItem('atmo_mail',atmo_mail) 
//     localStorage.setItem('site_person',site_person) 
//     localStorage.setItem('site_person_contact',site_person_contact) 
//     localStorage.setItem('ac1_type',ac1_type) 
//     localStorage.setItem('ac1_brand',ac1_brand)
//     localStorage.setItem('ac1_capacity',ac1_capacity)
//     localStorage.setItem('ac1_capacity',ac1_capacity)
//     localStorage.setItem('ac1_comm',ac1_comm)
//     localStorage.setItem('ac1_status',ac1_status)    
//     localStorage.setItem('ac2_type',ac2_type)  
//     localStorage.setItem('ac2_brand',ac2_brand)
//     localStorage.setItem('ac2_capacity',ac2_capacity)  
//     localStorage.setItem('ac2_comm',ac2_comm) 
//     localStorage.setItem('ac2_status',ac2_status)
//     localStorage.setItem('ups_model',ups_model)
//     localStorage.setItem('ups_capacity',ups_capacity)
//     localStorage.setItem('ups_batteries',ups_batteries)
//     localStorage.setItem('ups_avr',ups_avr)
//     localStorage.setItem('ups_trans',ups_trans)
//     localStorage.setItem('ups_servo',ups_servo)
//     localStorage.setItem('ups_batt_volt',ups_batt_volt)
//     localStorage.setItem('esld',esld)
//     localStorage.setItem('npanels',npanels)
//     localStorage.setItem('lobby_light',lobby_light)
//     localStorage.setItem('n_light',n_light)
//     localStorage.setItem('signage_status',signage_status)
//     localStorage.setItem('signage_time',signage_time)
//     localStorage.setItem('dvr_model',dvr_model)
//     localStorage.setItem('dvr_cam_no',dvr_cam_no)
//     localStorage.setItem('dvr_hdd',dvr_hdd)
//     localStorage.setItem('door_status',door_status)
//     localStorage.setItem('door_stoppper',door_stoppper)
//     localStorage.setItem('atm_count',atm_count)
//     localStorage.setItem('site_image',site_image)
//     localStorage.setItem('meter_eb',meter_eb)
//     localStorage.setItem('meter_type',meter_type)
//     localStorage.setItem('signage_timer_type',signage_timer_type) 
//     localStorage.setItem('ac_timer_type',ac_timer_type) 
//     localStorage.setItem('notes',notes)

    
    
//     try{
//         atmid_ref.child(atmcode).set(atmcity)
//         survey_ref.child(atmcode).child('atm').child('datetime').set(currdate)
//         survey_ref.child(atmcode).child('atm').child('city').set(atmcity)
//         survey_ref.child(atmcode).child('atm').child('atm_address').set(atmaddr)
//         survey_ref.child(atmcode).child('atm').child('atmoname').set(atmoname)
//         survey_ref.child(atmcode).child('atm').child('atmcontact').set(atmcontact)
//         survey_ref.child(atmcode).child('atm').child('atmo_mail').set(atmo_mail)
//         survey_ref.child(atmcode).child('atm').child('site_person').set(site_person)
//         survey_ref.child(atmcode).child('atm').child('site_person_contact').set(site_person_contact)

//         survey_ref.child(atmcode).child('ac_details').child('ac1').child('type').set(ac1_type)
//         survey_ref.child(atmcode).child('ac_details').child('ac1').child('brand').set(ac1_brand)
//         survey_ref.child(atmcode).child('ac_details').child('ac1').child('capacity').set(ac1_capacity)
//         survey_ref.child(atmcode).child('ac_details').child('ac1').child('comm').set(ac1_comm)
//         survey_ref.child(atmcode).child('ac_details').child('ac1').child('status').set(ac1_status)

//         survey_ref.child(atmcode).child('ac_details').child('ac2').child('type').set(ac2_type)
//         survey_ref.child(atmcode).child('ac_details').child('ac2').child('brand').set(ac2_brand)
//         survey_ref.child(atmcode).child('ac_details').child('ac2').child('capacity').set(ac2_capacity)
//         survey_ref.child(atmcode).child('ac_details').child('ac2').child('comm').set(ac2_comm)
//         survey_ref.child(atmcode).child('ac_details').child('ac2').child('status').set(ac2_status)

//         survey_ref.child(atmcode).child('ups_details').child('model').set(ups_model)
//         survey_ref.child(atmcode).child('ups_details').child('capacity').set(ups_capacity)
//         survey_ref.child(atmcode).child('ups_details').child('batteries').set(ups_batteries)
//         survey_ref.child(atmcode).child('ups_details').child('ups_avr').set(ups_avr)
//         survey_ref.child(atmcode).child('ups_details').child('ups_trans').set(ups_trans)
//         survey_ref.child(atmcode).child('ups_details').child('ups_servo').set(ups_servo)
//         survey_ref.child(atmcode).child('ups_details').child('ups_batt_volt').set(ups_batt_volt)

//         survey_ref.child(atmcode).child('esld').child('type').set(esld)
//         survey_ref.child(atmcode).child('esld').child('npanels').set(npanels)
        
//         survey_ref.child(atmcode).child('lobby_lights').child('type').set(lobby_light)
//         survey_ref.child(atmcode).child('lobby_lights').child('n_light').set(n_light)

//         survey_ref.child(atmcode).child('signage').child('status').set(signage_status)
//         survey_ref.child(atmcode).child('signage').child('timing').set(signage_time)

//         survey_ref.child(atmcode).child('dvr_details').child('model').set(dvr_model)
//         survey_ref.child(atmcode).child('dvr_details').child('cam_no').set(dvr_cam_no)
//         survey_ref.child(atmcode).child('dvr_details').child('hdd_capacity').set(dvr_hdd)

//         survey_ref.child(atmcode).child('door').child('status').set(door_status)
//         survey_ref.child(atmcode).child('door').child('stopper').set(door_stoppper)

//         survey_ref.child(atmcode).child('atm').child('atm_count').set(atm_count)
//         survey_ref.child(atmcode).child('atm').child('site_image').set(site_image)

//         survey_ref.child(atmcode).child('meter').child('meter_eb').set(meter_eb)
//         survey_ref.child(atmcode).child('meter').child('type').set(meter_type)

//         survey_ref.child(atmcode).child('timer').child('signage_timer_type').set(signage_timer_type)
//         survey_ref.child(atmcode).child('timer').child('ac_timer_type').set(ac_timer_type)

//         survey_ref.child(atmcode).child('notes').set(notes)
//     }
//     catch(error){
//         console.log(error)
//         // alert('Please check inputs before sumbit')
//     }
// }   

// let site_img_list = []
// let sign_img_list = []

// // Upload photos to firebase storage and store url as list
// async function firebase_upload(){
//     ct = 0
//     sign_element = document.getElementById("atm_sign_file")
//     for(var i=0; i<sign_element.files.length; i++){
//         var storage = firebase.storage().ref('site_images/'+sign_element.files[i].name)
//         var upload = await storage.put(sign_element.files[i]).then((snapshot) => {
//             snapshot.ref.getDownloadURL().then(
//                 function(downloadURL){
//                     // get download URL
//                     console.log(downloadURL)
//                     durl = downloadURL
//                     sign_img_list.push(durl)
//                     survey_ref.child(atmcode).child('sign').set(downloadURL)
//                 }
//             )
//         })
//     }

//     site_element = document.getElementById("atm_site_file")
//     console.log(site_element.files.length)
//     for(var i=0; i<site_element.files.length; i++){
//         var storage = firebase.storage().ref('site_images/'+site_element.files[i].name)
//         var upload = await storage.put(site_element.files[i]).then((snapshot) => {
//             snapshot.ref.getDownloadURL().then(
//                 function(downloadURL){
//                     // get download URL
//                     console.log(downloadURL)
//                     durl = downloadURL
//                     site_img_list.push(durl)
//                     survey_ref.child(atmcode).child('site_img_'+ct).set(downloadURL)
//                     ct+=1
//                 }
//             )
//         })
//     }
// }   

// async function storedata(){
//     pushdata()
//     await firebase_upload()
//     window.location = 'atmchecklist.html'
// }

// function reset(){
//     location.reload()
// }


// window.onload = function get_atmcode(){
//     atmid_wrapper = document.getElementById('atmid_list')
//     atmcity_wrapper = document.getElementById('atmname_list')
//     atmid_ref.once('value', snapshot=>{
//         snapshot.forEach(child => {
//             // console.log(child.key);
//             // console.log(child.val())
//             html = '<option>'+child.key+'</option>'
//             atmid_wrapper.innerHTML += html
//             html = '<option>'+child.val()+'</option>'
//             atmcity_wrapper.innerHTML +=html
//         })   
//     })
// }

// function get_details(clicked){
//     try{
//         arg = document.getElementById(clicked).value
//         ele = document.getElementById('atm_name')
//         // console.log(document.getElementById(clicked).value)
//         atmid_ref.child(arg).once("value")
//         .then((data) => {
//             ele.value = data.val()
//         })
//         survey_ref.child(arg).child('atm').once("value")
//         .then((data)=>{
//             // console.log(data.val())
//             document.getElementById('mgr_name').value = data.val()['atmoname']
//             document.getElementById('mgr_con').value = data.val()['atmcontact']
//             document.getElementById('mgr_email').value = data.val()['atmo_mail']            
//         })
//     }
//     catch(error){
//         console.log('')
//     }
// }

// async function storedata1(){
//     var x = document.getElementById('option-select')
//     var x = x.options[x.selectedIndex].value

//     try{
//     // all checkboxes
//     ac1s = document.querySelector('input[name="ac1"]:checked').value  
//     ac2s = document.querySelector('input[name="ac2"]:checked').value
//     lobbys = document.querySelector('input[name="lobby"]:checked').value
//     signages = document.querySelector('input[name="signage"]:checked').value
//     dvrs = document.querySelector('input[name="dvr"]:checked').value
//     vsats = document.querySelector('input[name="vsat"]:checked').value
//     tahs = document.querySelector('input[name="tah"]:checked').value
//     occus = document.querySelector('input[name="occupancy"]:checked').value
//     doors = document.querySelector('input[name="doorsensor"]:checked').value
//     earthings = document.querySelector('input[name="earthing"]:checked').value
//     upss = document.querySelector('input[name="ups"]:checked').value
//     iatms = document.querySelector('input[name="iatm"]:checked').value
//     routers = document.querySelector('input[name="router"]:checked').value
//     batterys = document.querySelector('input[name="battery"]:checked').value
//     atmms = document.querySelector('input[name="atmmachine"]:checked').value

//     // all remarks
//     ac1r = document.getElementById('ac1r').value
//     ac2r = document.getElementById('ac2r').value
//     lobbyr = document.getElementById('lobbyr').value
//     signager = document.getElementById('signager').value
//     dvrr = document.getElementById('dvrr').value
//     vsatr = document.getElementById('vsatr').value
//     tahr = document.getElementById('tahr').value
//     or = document.getElementById('or').value
//     dsr = document.getElementById('dsr').value
//     er = document.getElementById('er').value
//     upsr = document.getElementById('upsr').value
//     iatmr = document.getElementById('iatmr').value
//     routerr = document.getElementById('routerr').value
//     br = document.getElementById('br').value
//     atmmr = document.getElementById('atmmr').value


//     // other fields
//     atmid = document.getElementById('atm_id').value
//     atmc = document.getElementById('atm_name').value
//     currdate1 = document.getElementById('datetime2').value
//     mgr_name = document.getElementById('mgr_name').value
//     mgr_con = document.getElementById('mgr_con').value
//     mgr_email = document.getElementById('mgr_email').value
//     site_prs = document.getElementById('site_prs').value
//     site_p_con = document.getElementById('site_p_con').value
//     intime = document.getElementById('intime').value
//     outtime = document.getElementById('outtime').value
//     problem = document.getElementById('problem').value
//     issue = document.getElementById('issue').value
//     maint = document.getElementById('maint').value
//     notes1 = document.getElementById('notes1').value
//     }
//     catch(error){
//         console.log(error)
//         alert('check all inputs again ...')
//     }

//     // let txt_lst = ['ac1r','ac2r','lobbyr','signager','dvrr','vsatr','tahr','or','dsr','er','upsr','iatmr','routerr','br','atmmr','problems','issueresolved','maint','notes']
//     // for(let i=0;i<txt_lst.length;i++){
//     //     e = document.getElementById(txt_lst[i])
//     //     console.log(e)
//     //     // if(e.value==""){
//     //     //     e.value=="none"
//     //     // }
//     // }
  
//     if(x=='Service'){
//     service_ref.child(atmid).child(currdate1).child('city').set(atmc)
//     service_ref.child(atmid).child(currdate1).child('ac1').child('status').set(ac1s)
//     service_ref.child(atmid).child(currdate1).child('ac2').child('status').set(ac2s)
//     service_ref.child(atmid).child(currdate1).child('lobby').child('status').set(lobbys)
//     service_ref.child(atmid).child(currdate1).child('signage').child('status').set(signages)
//     service_ref.child(atmid).child(currdate1).child('dvr').child('status').set(dvrs)
//     service_ref.child(atmid).child(currdate1).child('vsat').child('status').set(vsats)
//     service_ref.child(atmid).child(currdate1).child('tempandh').child('status').set(tahs)
//     service_ref.child(atmid).child(currdate1).child('occupancy').child('status').set(occus)
//     service_ref.child(atmid).child(currdate1).child('doorsensor').child('status').set(doors)
//     service_ref.child(atmid).child(currdate1).child('earthing').child('status').set(earthings)
//     service_ref.child(atmid).child(currdate1).child('ups').child('status').set(upss)
//     service_ref.child(atmid).child(currdate1).child('iatm').child('status').set(iatms)
//     service_ref.child(atmid).child(currdate1).child('router').child('status').set(routers)
//     service_ref.child(atmid).child(currdate1).child('battery').child('status').set(batterys)
//     service_ref.child(atmid).child(currdate1).child('atmmachine').child('status').set(atmms)
   
//     service_ref.child(atmid).child(currdate1).child('ac1').child('remark').set(ac1r)
//     service_ref.child(atmid).child(currdate1).child('ac2').child('remark').set(ac2r)
//     service_ref.child(atmid).child(currdate1).child('lobby').child('remark').set(lobbyr)
//     service_ref.child(atmid).child(currdate1).child('signage').child('remark').set(signager)
//     service_ref.child(atmid).child(currdate1).child('dvr').child('remark').set(dvrr)
//     service_ref.child(atmid).child(currdate1).child('vsat').child('remark').set(vsatr)
//     service_ref.child(atmid).child(currdate1).child('tempandh').child('remark').set(tahr)
//     service_ref.child(atmid).child(currdate1).child('occupancy').child('remark').set(or)
//     service_ref.child(atmid).child(currdate1).child('doorsensor').child('remark').set(dsr)
//     service_ref.child(atmid).child(currdate1).child('earthing').child('remark').set(er)
//     service_ref.child(atmid).child(currdate1).child('ups').child('remark').set(upsr)
//     service_ref.child(atmid).child(currdate1).child('iatm').child('remark').set(iatmr)
//     service_ref.child(atmid).child(currdate1).child('router').child('remark').set(routerr)
//     service_ref.child(atmid).child(currdate1).child('battery').child('remark').set(br)
//     service_ref.child(atmid).child(currdate1).child('atmmachine').child('remark').set(atmmr)

//     service_ref.child(atmid).child(currdate1).child('intime').set(intime)
//     service_ref.child(atmid).child(currdate1).child('outtime').set(outtime)
//     service_ref.child(atmid).child(currdate1).child('problems').set(problem)
//     service_ref.child(atmid).child(currdate1).child('issueresolved').set(issue)
//     service_ref.child(atmid).child(currdate1).child('maint').set(maint)
//     service_ref.child(atmid).child(currdate1).child('notes').set(notes1)
//     service_ref.child(atmid).child(currdate1).child('siteperson').set(site_prs)
//     service_ref.child(atmid).child(currdate1).child('sitepersoncontact').set(site_p_con)

//     // update changes to survey_report
//     survey_ref.child(atmid).child('atm').child('atmoname').set(mgr_name)
//     survey_ref.child(atmid).child('atm').child('atmcontact').set(mgr_con)
//     survey_ref.child(atmid).child('atm').child('atmo_mail').set(mgr_email)
//     }

//     if(x == 'Installation'){
//     ins_ref.child(atmid).child(currdate1).child('city').set(atmc)
//     ins_ref.child(atmid).child(currdate1).child('ac1').child('status').set(ac1s)
//     ins_ref.child(atmid).child(currdate1).child('ac2').child('status').set(ac2s)
//     ins_ref.child(atmid).child(currdate1).child('lobby').child('status').set(lobbys)
//     ins_ref.child(atmid).child(currdate1).child('signage').child('status').set(signages)
//     ins_ref.child(atmid).child(currdate1).child('dvr').child('status').set(dvrs)
//     ins_ref.child(atmid).child(currdate1).child('vsat').child('status').set(vsats)
//     ins_ref.child(atmid).child(currdate1).child('tempandh').child('status').set(tahs)
//     ins_ref.child(atmid).child(currdate1).child('occupancy').child('status').set(occus)
//     ins_ref.child(atmid).child(currdate1).child('doorsensor').child('status').set(doors)
//     ins_ref.child(atmid).child(currdate1).child('earthing').child('status').set(earthings)
//     ins_ref.child(atmid).child(currdate1).child('ups').child('status').set(upss)
//     ins_ref.child(atmid).child(currdate1).child('iatm').child('status').set(iatms)
//     ins_ref.child(atmid).child(currdate1).child('router').child('status').set(routers)
//     ins_ref.child(atmid).child(currdate1).child('battery').child('status').set(batterys)
//     ins_ref.child(atmid).child(currdate1).child('atmmachine').child('status').set(atmms)

//     ins_ref.child(atmid).child(currdate1).child('ac1').child('remark').set(ac1r)
//     ins_ref.child(atmid).child(currdate1).child('ac2').child('remark').set(ac2r)
//     ins_ref.child(atmid).child(currdate1).child('lobby').child('remark').set(lobbyr)
//     ins_ref.child(atmid).child(currdate1).child('signage').child('remark').set(signager)
//     ins_ref.child(atmid).child(currdate1).child('dvr').child('remark').set(dvrr)
//     ins_ref.child(atmid).child(currdate1).child('vsat').child('remark').set(vsatr)
//     ins_ref.child(atmid).child(currdate1).child('tempandh').child('remark').set(tahr)
//     ins_ref.child(atmid).child(currdate1).child('occupancy').child('remark').set(or)
//     ins_ref.child(atmid).child(currdate1).child('doorsensor').child('remark').set(dsr)
//     ins_ref.child(atmid).child(currdate1).child('earthing').child('remark').set(er)
//     ins_ref.child(atmid).child(currdate1).child('ups').child('remark').set(upsr)
//     ins_ref.child(atmid).child(currdate1).child('iatm').child('remark').set(iatmr)
//     ins_ref.child(atmid).child(currdate1).child('router').child('remark').set(routerr)
//     ins_ref.child(atmid).child(currdate1).child('battery').child('remark').set(br)
//     ins_ref.child(atmid).child(currdate1).child('atmmachine').child('remark').set(atmmr)

//     ins_ref.child(atmid).child(currdate1).child('intime').set(intime)
//     ins_ref.child(atmid).child(currdate1).child('outtime').set(outtime)
//     ins_ref.child(atmid).child(currdate1).child('problems').set(problem)
//     ins_ref.child(atmid).child(currdate1).child('issueresolved').set(issue)
//     ins_ref.child(atmid).child(currdate1).child('maint').set(maint)
//     ins_ref.child(atmid).child(currdate1).child('notes').set(notes1)

//     ins_ref.child(atmid).child(currdate1).child('atm').child('atmcontact').set(mgr_con)
//     ins_ref.child(atmid).child(currdate1).child('atm').child('atmoname').set(mgr_name)
//     ins_ref.child(atmid).child(currdate1).child('atm').child('atmo_mail').set(mgr_email)
    

//     }
    
    
// }   

// function updatefunc(clicked){

//     var x = document.getElementById(clicked)
//     var x = x.options[x.selectedIndex].value
//     if(x=='Service'){
//         document.getElementById('tab2').innerText = 'SERVICE'
//     }
//     else{
//         document.getElementById('tab2').innerText = 'INSTALLATION'
//     }
// }
// // function getsite_img(element){
// //     var file = element.files[0];
// //     var reader = new FileReader();
// //     reader.onloadend = function() {
        
// //     }
// //     reader.readAsDataURL(file);
// // }

// // sign
// // function get_sign(element){
// //     var file = element.files[0];
// //     var reader = new FileReader();
// //     reader.onloadend = function() {
// //         localStorage.setItem('signimage', reader.result)    
// //     }
// //     reader.readAsDataURL(file);
// // }

// // site
// // function getsite_img(element){
// //     fileArray = []
// //     for(i=0;i<element.files.length;i++){
// //         // console.log(i)
// //         var file = element.files[i];
// //         var reader = new FileReader();
// //         reader.onloadend = function() {
// //             fileArray.push(reader.result)
// //         }
// //         reader.readAsDataURL(file);
// //     }
// //     console.log(fileArray)
// //     localStorage.setItem('siteimage',fileArray)
// // }



// // if(localStorage.getItem('atm_city_dropdown')==""){
// //     localStorage.setItem('atmcode', 'null');
// // }
// // if(localStorage.getItem('atm_id_dropdown')==""){
// //     localStorage.setItem('atm_id_dropdown', 'null');
// // }
// // if(localStorage.getItem('atm_name_dropdown')==""){
// //     localStorage.setItem('atm_name_dropdown', 'null');
// // }
// // if(localStorage.getItem('atm_manager_name')==""){
// //     localStorage.setItem('atm_manager_name', 'null');
// // }
// // if(localStorage.getItem('atm_contact')==""){
// //     localStorage.setItem('atm_contact', 'null');
// // }
// // if(localStorage.getItem('atm_email')==""){
// //     localStorage.setItem('atm_email', 'null');
// // }
// // if(localStorage.getItem('atm_person_name')==""){
// //     localStorage.setItem('atm_person_name', 'null');
// // }
// // if(localStorage.getItem('atm_person_contact')==""){
// //     localStorage.setItem('atm_person_contact', 'null');
// // }

// // $('#atm-date').text(localStorage.getItem('datentime1'))
// // $('#city-name').text(localStorage.getItem('atm_city_dropdown'))
// // $('#atm-id').text(localStorage.getItem('atm_id_dropdown'))
// // $('#atm-add').text(localStorage.getItem('atm_name_dropdown'))
// // $('#atmo-name').text(localStorage.getItem('atm_manager_name'))
// // $('#atmo-number').text(localStorage.getItem('atm_contact'))
// // $('#email-id').text(localStorage.getItem('atm_email'))
// // $('#atm-person-name').text(localStorage.getItem('atm_person_name'))
// // $('#atm-person-contact').text(localStorage.getItem('atm_person_contact'))


// // $('#ac1-type').text(localStorage.getItem('tac1'))
// // $('#ac2-type').text(localStorage.getItem('tac2'))
// // $('#ac1-model').text(localStorage.getItem('mac1'))
// // $('#ac2-model').text(localStorage.getItem('mac2'))
// // $('#ac1-capacity').text(localStorage.getItem('cac1'))
// // $('#ac2-capacity').text(localStorage.getItem('cac2'))
// // $('#ac1-comm').text(localStorage.getItem('coac1'))
// // $('#ac2-comm').text(localStorage.getItem('coac2'))
// // $('#ac1-status').text(localStorage.getItem('dac1'))
// // $('#ac2-status').text(localStorage.getItem('dac2'))

// // $('#ups-model').text(localStorage.getItem('mups'))
// // $('#ups-capacity').text(localStorage.getItem('caups'))
// // $('#ups-batteries').text(localStorage.getItem('bups'))
// // $('#ups-avr').text(localStorage.getItem('avrups'))
// // $('#ups-transformer').text(localStorage.getItem('transups'))
// // $('#ups-servo').text(localStorage.getItem('servosups'))
// // $('#ups-vol').text(localStorage.getItem('volsups'))

// // $('#electric-sld').text(localStorage.getItem('sldelecsys'))
// // $('#electric-panels').text(localStorage.getItem('panelselecsys'))

// // $('#light-type').text(localStorage.getItem('tlobby'))
// // $('#light-no').text(localStorage.getItem('nlobby'))

// // $('#signage-status').text(localStorage.getItem('dsignage'))
// // $('#signage-timing').text(localStorage.getItem('timesignage'))

// // $('#dvr-model').text(localStorage.getItem('mdvr'))
// // $('#dvr-camera').text(localStorage.getItem('cameradvr'))
// // $('#dvr-hdd').text(localStorage.getItem('hdddvr'))

// // $('#atm-door').text(localStorage.getItem('ddoor'))
// // $('#door-stopper').text(localStorage.getItem('ddoorstopper'))

// // $('#atm-count').text(localStorage.getItem('atmcount'))
// // $('#site-image').text(localStorage.getItem('siteimage'))

// // $('#eb-reading').text(localStorage.getItem('metereb'))
// // $('#eb-type').text(localStorage.getItem('typeeb'))

// // $('#signage-timer').text(localStorage.getItem('stimertype'))
// // $('#ac-timer').text(localStorage.getItem('actimertype'))

// // $('#atm-note').text(localStorage.getItem('atm_note'))
// // $('#signimage').text(localStorage.getItem('atm_sign_file'))

// // var html = '<img src="' + localStorage.getItem('signimage') + '"' + 'alt="" class="img-fluid">'
// // console.log(html)
// // document.getElementById('sign-image').innerHTML = html

// // $('.btn-createpdf').css('display', 'block')
// // console.log(localStorage.getItem('signimage'))
// // function encodeImageFileAsURL(element) {
// //     var file = element.files[0];
// //     var reader = new FileReader();
// //     reader.onloadend = function() {
// //         localStorage.setItem('sign-image', reader.result)    
// //     }
// //     reader.readAsDataURL(file);
// // }


// // function encodeImageFileAsURL2(element) {
// //     var fileArray = [];
// //     for(var i = 0; i < element.files.length; i++){
// //         var file = element.files[i];
// //         var reader = new FileReader();
// //         reader.onloadend = function (){
// //             string = this.result
// //             console.log(string)
// //         }
// //         reader.readAsDataURL(file)
// //     }    
// //     // console.log(fileArray)
// // }

// // function createPDF(){
// //         $('.btn-createpdf').css('display', 'none')

// //         var element = document.getElementById('pf1');
// //         var img = document.getElementById('img')
// //         var opt = {
// //             margin:       0,
// //             filename:     localStorage.getItem('atm_id_dropdown') + ' ' + localStorage.getItem('atm_city_dropdown') + ' ' + localStorage.getItem('datentime1'),
// //             image:        { type: 'jpeg', quality: 1 },
// //             html2canvas:  {scale:5},
// //             jsPDF:        { unit: 'mm', format:[170,330], orientation: 'portrait' },
// //             pagebreak: { mode: 'avoid-all', after: 'img'}
// //             };

// //         html2pdf(element, opt).save()

// //         setTimeout(() => {
// //             // window.location = 'index.html'
// //         }, 3000);
// // }

// // function storedata(){
// //     pushdata()
// //     firebase_upload()

// //     if ($('#atm_sign_file')[0].files.length === 0) {
// //         alert("Please add Signature");
// //         return false;
// //     } else {
// //         localStorage.setItem('datentime1', $("#datetime").val())
// //         localStorage.setItem('atm_city_dropdown', $('#atm_city_dropdown').val());
// //         localStorage.setItem('atm_id_dropdown', $('#atm_id_dropdown').val());
// //         localStorage.setItem('atm_name_dropdown', $('#atm_name_dropdown').val());
// //         localStorage.setItem('atm_manager_name', $('#atm_manager_name').val());
// //         localStorage.setItem('atm_contact', $('#atm_contact').val());
// //         localStorage.setItem('atm_email', $('#atm_email').val());
// //         localStorage.setItem('atm_person_name', $('#atm_person_name').val());
// //         localStorage.setItem('atm_person_contact', $('#atm_person_contact').val());
// //         localStorage.setItem('tac1', $('#tac1').val());
// //         localStorage.setItem('tac2', $('#tac2').val());
// //         localStorage.setItem('mac1', $('#mac1').val());
// //         localStorage.setItem('mac2', $('#mac2').val());
// //         localStorage.setItem('cac1', $('#cac1').val());
// //         localStorage.setItem('cac2', $('#cac2').val());
// //         localStorage.setItem('coac1', $('#coac1').val());
// //         localStorage.setItem('coac2', $('#coac2').val());
// //         localStorage.setItem('dac1', $('#dac1').val());
// //         localStorage.setItem('dac2', $('#dac2').val());
// //         localStorage.setItem('mups', $('#mups').val());
// //         localStorage.setItem('caups', $('#caups').val());
// //         localStorage.setItem('bups', $('#bups').val());
// //         localStorage.setItem('avrups', $('#avrups').val());
// //         localStorage.setItem('transups', $('#transups').val());
// //         localStorage.setItem('servosups', $('#servosups').val());
// //         localStorage.setItem('volsups', $('#volsups').val());
// //         localStorage.setItem('sldelecsys', $('#sldelecsys').val());
// //         localStorage.setItem('panelselecsys', $('#panelselecsys').val());
// //         localStorage.setItem('tlobby', $('#tlobby').val());
// //         localStorage.setItem('nlobby', $('#nlobby').val());
// //         localStorage.setItem('dsignage', $('#dsignage').val());
// //         localStorage.setItem('timesignage', $('#timesignage').val());
// //         localStorage.setItem('mdvr', $('#mdvr').val());
// //         localStorage.setItem('cameradvr', $('#cameradvr').val());
// //         localStorage.setItem('hdddvr', $('#hdddvr').val());
// //         localStorage.setItem('ddoor', $('#ddoor').val());
// //         localStorage.setItem('ddoorstopper', $('#ddoorstopper').val());
// //         localStorage.setItem('atmcount', $('#atmcount').val());
// //         localStorage.setItem('siteimage', $('#siteimage').val());
// //         localStorage.setItem('metereb', $('#metereb').val());
// //         localStorage.setItem('typeeb', $('#typeeb').val());
// //         localStorage.setItem('stimertype', $('#stimertype').val());
// //         localStorage.setItem('actimertype', $('#actimertype').val());
// //         localStorage.setItem('atm_note', $("#atm_note").val())
        
        
// //         window.location = 'atmchecklist.html'
// //     }
// // }

// // function reset(){
// //     location.reload()
// // }