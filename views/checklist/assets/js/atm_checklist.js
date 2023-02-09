// firebase config here
const firebaseConfig = {
    apiKey: "AIzaSyCtFlIgLHOvliDQpsVW0YnZJZ7xVANICpk",
    authDomain: "checklist-379ea.firebaseapp.com",
    databaseURL: "https://checklist-379ea-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "checklist-379ea",
    storageBucket: "checklist-379ea.appspot.com",
    messagingSenderId: "248915298508",
    appId: "1:248915298508:web:4424f89a61e04ba9e75a69",
    measurementId: "G-YR85WETH2H"
  };
firebase.initializeApp(firebaseConfig);
let survey_ref = firebase.database().ref("survey_report")

window.onload = async function(){
    const element_list = ['atm-date','city-name','atm-id','atm-add','atmo-name',
    'atmo-number','email-id','atm-person-name','atm-person-contact','ac1-type','ac1-model','ac1-capacity','ac1-comm','ac1-status',
    'ac2-type','ac2-model','ac2-capacity','ac2-comm','ac2-status','ups-model','ups-capacity','ups-batteries','ups-avr','ups-transformer','ups-servo',
    'ups-vol','electric-sld','electric-panels','light-type','light-no','signage-status','signage-timing','dvr-model','dvr-camera','dvr-hdd','atm-door',
    'door-stopper','atm-count','site-image','eb-reading','eb-type','signage-timer','ac-timer','atm-note']

    const reference = ['currdate','atmcity','atmcode','atmaddr','atmoname','atmcontact',
    'atmo_mail','site_person','site_person_contact','ac1_type','ac1_model','ac1_capacity','ac1_comm','ac1_status',
    'ac2_type','ac2_model','ac2_capacity','ac2_comm','ac2_status','ups_model','ups_capacity','ups_batteries','ups_avr','ups_trans','ups_servo',
    'ups_batt_volt','esld','npanels','lobby_light','n_light','signage_status','signage_time','dvr_model','dvr_cam_no',
    'dvr_hdd','door_status','door_stoppper','atm_count','site_image','meter_eb','meter_type','signage_timer_type','ac_timer_type','notes']

    for(i=0;i<element_list.length;i++){
        if(localStorage.getItem(reference[i]=="")){
            localStorage.setItem(reference[i],'null')
            document.getElementById(element_list[i]).innerText = ""
        }
        else{
            document.getElementById(element_list[i]).innerText = localStorage.getItem(reference[i])
        }
    }


    // sign image
    atmref = localStorage.getItem('atmcode')
    console.log(atmref)
    sign_wrapper = document.getElementById('sign-image')
    sign_img_url = await survey_ref.child(atmref).child('sign').once('value')
    .then((resp) => resp.val())
    html = '<img src="'+sign_img_url+'" alt="sign" class="img-fluid" style="display:block";>'
    sign_wrapper.innerHTML = html


    // site image
    // html=""
    // site_img_wrapper = document.getElementById('site-image-list')
    // for(let i=0;i<100;i++){
    //     test = await survey_ref.child(atmref).child('site_img_'+i).once('value')
    //     .then((resp) => resp.val())
    //     if(test!=null){
    //             if(document.getElementById('pf').clientHeight > 130){
    //                 html ='<p style="page-break-after: always;">&nbsp;</p>'
    //                 site_img_wrapper.innerHTML += html
    //                 console.log(document.getElementById('pf').clientHeight)
    //             }
    //         html = '<div class="col-12"><img id="siteimgcss" src="'+test+'" class="img-fluid alt="site_img" style="display:block";><br></div>'
    //         site_img_wrapper.innerHTML += html
    //         console.log(test) 
            
    //     }
        
    // }

    site_img_wrapper = document.getElementById("img-container")
    count = 2
    
    for(let i=0;i<100;i++){
        test = await survey_ref.child(atmref).child('site_img_'+i).once('value')
        .then((resp) => resp.val())
        if(test!=null){
            html=''
            html='<div id="pf'+count+'" class="pf w0 p0" data-page-no="'+count+'">'
            html+='<div style="margin-left: 70px; font-size:0.65rem; margin-bottom: 20px;">'
            html+='<p style="margin: 0;"><b>Site Images:</b></p>'
            html+='<div class="row">'
            html+='<div class="col-12"><img id="siteimgcss" src="'+test+'" class="img-fluid alt="site_img" style="display:block";><br></div>'
            html+='</div></div></div>'
            site_img_wrapper.innerHTML += html
            


            // html+='<div class="col-12"><img id="siteimgcss" src="'+test+'" class="img-fluid alt="site_img" style="display:block";><br></div>'
            // site_img_wrapper.innerHTML += html
            // html=''
            // if(document.getElementById('pf'+count).clientHeight > 0){
            //     console.log(document.getElementById('pf'+count))
            //     console.log(document.getElementById('pf'+count).clientHeight)
            //     html+='</div></div></div>'
            //     site_img_wrapper.innerHTML += html
            //     count+=1
            //     html='<div id="pf'+count+'" class="pf w0 p0" data-page-no="'+count+'">'
            //     html+='<div style="margin-left: 70px; font-size:0.65rem; margin-bottom: 20px;">'
            //     html+='<p style="margin: 0;"><b>Site Images:</b></p>'
            //     html+='<div class="row">'
            // }
        }
    }
    html+='</div></div></div>'
    site_img_wrapper.innerHTML += html
}


useCORS: true
function createPDF(){
    $('.btn-createpdf').css('display', 'none')
            var element = document.getElementById('page-container').innerHTML;
            var opt = {
                margin:       0,
                filename:     localStorage.getItem('atmcode') + ' ' + localStorage.getItem('atmcity') + ' ' + localStorage.getItem('currdate'),
                image:        { type: 'jpeg', quality: 1},
                html2canvas:  {scale:5, useCORS: true},
                jsPDF:        { unit: 'mm', format:[170,330], orientation: 'portrait' },
                pagebreak:    { mode: ['css'] }  , 
                // pagebreak: { mode: 'avoid', after: '#siteimgcss' }         
                };
            html2pdf(element, opt)
}


// function createPDF1(){
//     $('.btn-createpdf').css('display', 'none')
//             var element = document.getElementById('pf2').innerHTML;
//             var opt = {
//                 margin:       0,
//                 filename:     localStorage.getItem('atmcode') + ' ' + localStorage.getItem('atmcity') + ' ' + localStorage.getItem('currdate'),
//                 image:        { type: 'jpeg', quality: 1},
//                 html2canvas:  {scale:5, useCORS: true},
//                 jsPDF:        { unit: 'mm', format:[170,330], orientation: 'portrait' },
//                 pagebreak:    { mode: ['avoid-all','css', 'legacy'] }            
//                 };
//             html2pdf(element, opt)
// }


// function createPDF(){
//         $('.btn-createpdf').css('display', 'none')
//         var element = document.getElementById('pf2');
//         var opt = {
//             margin:       0,
//             filename:     localStorage.getItem('atmcode') + ' ' + localStorage.getItem('atmcity') + ' ' + localStorage.getItem('currdate'),
//             image:        { type: 'jpeg', quality: 1 },
//             html2canvas:  {scale:5},
//             jsPDF:        { unit: 'mm', format:[170,330], orientation: 'portrait' },
//             pagebreak:    { mode: ['css', 'legacy'] }            
//             };
//         html2pdf(element, opt).save()
// }

