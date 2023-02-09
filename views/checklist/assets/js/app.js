// var firebaseConfig = {
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
// firebase.analytics();
// var database = firebase.database();
// ref = database.ref("ATMID")
// ref2 = database.ref("ATM")
// ref3 = database.ref("BRANCHID")
// ref4 = database.ref("BRANCH")

// var checkboxes = $("input[type=checkbox]");
// var statusDropdowns = $("select[class=form-select]");
// var idDropdown = $(".atm_id_dropdown");
// var branchidDropdown = $(".branch_id_dropdown");
// var nameDropdown = $('.atm_name_dropdown');
// var branchnameDropdown = $('.branch_name_dropdown');

// var d = [];
// var r = [];

// idDropdown.on("change", function(e){
//     var value = $("#code").val()
//     ref.on("value", function (snapshot){
//         var did = snapshot.child(value).val()
//         document.getElementById('code_name').value = did
//     })

//     ref2.on('value', function (snapshot){
//         var atmname = $("#code_name").val()
//         var mangerName = snapshot.child(value).child(atmname).child("Manager Details").child("Manager Name").val()
//         var mangerContact = snapshot.child(value).child(atmname).child("Manager Details").child("Manager Contact").val()
//         var mangerEmail = snapshot.child(value).child(atmname).child("Manager Details").child("Manager Email").val()

//         document.getElementById('manager_name').value = mangerName
//         document.getElementById('contact').value = mangerContact
//         document.getElementById('email').value = mangerEmail
        
//     })
// })

// nameDropdown.on("change", function(e){
//     var atmname = $("#code_name").val()
//     ref.on("value", function (snapshot){
//         var did = snapshot.val()
//         var didObj = Object.keys(did).find(key => did[key] ===atmname)
//         document.getElementById('code').value = didObj
//     })

//     ref2.on('value', function (snapshot){
//         var value = $("#code").val()
//         var mangerName = snapshot.child(value).child(atmname).child("Manager Details").child("Manager Name").val()
//         var mangerContact = snapshot.child(value).child(atmname).child("Manager Details").child("Manager Contact").val()
//         var mangerEmail = snapshot.child(value).child(atmname).child("Manager Details").child("Manager Email").val()
//         document.getElementById('manager_name').value = mangerName
//         document.getElementById('contact').value = mangerContact
//         document.getElementById('email').value = mangerEmail
        
//     })
// })

// branchidDropdown.on("change", function(e){
//     var value = $("#branch_code").val()
//     console.log(value)
//     ref3.on("value", function (snapshot){
//         var bid = snapshot.child(value).val()
//         document.getElementById('branch_code_name').value = bid
//         console.log(bid)
//     })

//     ref4.on('value', function (snapshot){
//         var branchname = $("#branch_code_name").val()
//         var mangerName = snapshot.child(value).child(branchname).child("Manager Details").child("Manager Name").val()
//         var mangerContact = snapshot.child(value).child(branchname).child("Manager Details").child("Manager Contact").val()
//         var mangerEmail = snapshot.child(value).child(branchname).child("Manager Details").child("Manager Email").val()

//         document.getElementById('branch_manager_name').value = mangerName
//         document.getElementById('branch_contact').value = mangerContact
//         document.getElementById('branch_email').value = mangerEmail
        
//     })
// })

// branchnameDropdown.on("change", function(e){
//     var branchname = $("#branch_code_name").val()
//     ref3.on("value", function (snapshot){
//         var did = snapshot.val()
//         var didObj = Object.keys(did).find(key => did[key] === branchname)
//         document.getElementById('branch_code').value = didObj
//     })

//     ref4.on('value', function (snapshot){
//         var value = $("#branch_code").val()
//         var mangerName = snapshot.child(value).child(branchname).child("Manager Details").child("Manager Name").val()
//         var mangerContact = snapshot.child(value).child(branchname).child("Manager Details").child("Manager Contact").val()
//         var mangerEmail = snapshot.child(value).child(branchname).child("Manager Details").child("Manager Email").val()
//         document.getElementById('branch_manager_name').value = mangerName
//         document.getElementById('branch_contact').value = mangerContact
//         document.getElementById('branch_email').value = mangerEmail
        
//     })
// })

// function submitform2(){
//     $('.atm_tab').css('display', 'none')
//     $(".atm-form").css('display', 'none')
//     var element = document.getElementById("header");
//     element.classList.remove("d-flex");
//     var element = document.getElementById("back-to-top");
//     element.classList.remove("d-flex");
//     $(".img-logo-snip").css('display', 'block')
//     $(".button").css('display', 'none')
//     $('.section').css('padding', 0)
//     $('.checklist-box').css('max-width', '70%')
//     $(".back-to-top").css('display', 'none') 
//     $("#header").css('display', 'none')

//     var branchCode = $('#branch_code').val()
//     var branchName = $('#branch_code_name').val()
//     var subDateTime = $("#datetime2").val()
//     var managerName = $("#branch_manager_name").val()
//     var managerEmail = $("#branch_email").val()
//     var managerContact = $("#branch_contact").val()
//     var personName = $("#branch_person_name").val()
//     var personContact = $("#branch_person_contact").val()

//     if(managerName !== "") {
//         database.ref("BRANCH/").child(branchCode).child(branchName).child("Manager Details").child("Manager Name").set(managerName)
//     }

//     if(managerEmail !== "") {
//         database.ref("BRANCH/").child(branchCode).child(branchName).child("Manager Details").child("Manager Email").set(managerEmail)
//     }

//     if(managerContact !== "") {
//         database.ref("BRANCH/").child(branchCode).child(branchName).child("Manager Details").child("Manager Contact").set(managerContact)
//     }
//     if(personContact !== ''){
//         database.ref("BRANCH/").child(branchCode).child(branchName).child(subDateTime).child("Site person details").child(personName).set(personContact)
//     }

//     var idarray = $.map($('input[name="branch_check"]:checked'), function(c){return c.id; })
//     var idarrayLength = idarray.length; 
//     for(let i = 0; i <idarrayLength; i++){
//         var checkValue = $('#' + idarray[i]).val()
//         var statusDropdownValue = $('#d' + idarray[i]).val()
//         if(statusDropdownValue == 'Not Working') {
//             var daysData = $('#days_d' + idarray[i]).val()
//             var reasonData = $('#reason_d' + idarray[i]).val()
//             if(daysData === "" && reasonData === ""){
//                 database.ref("BRANCH/").child(branchCode).child(branchName).child(subDateTime).child(checkValue).set(statusDropdownValue)
//                 $('#days_d' + idarray[i]).css("display", "none")
//                 $('#reason_d' + idarray[i]).css("display", "none")
//             }
//             else if(daysData === "" && reasonData !== "") {
//                 database.ref("BRANCH/").child(branchCode).child(branchName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("Reason").set(reasonData)
//                 $('#days_d' + idarray[i]).css("display", "none")
//             }
//             else if(daysData !== "" && reasonData === ""){
//                 database.ref("BRANCH/").child(branchCode).child(branchName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("No of Days").set(daysData)
//                 $('#reason_d' + idarray[i]).css("display", "none")
//             }
//             else if(daysData !== "" && reasonData !== ""){
//                 database.ref("BRANCH/").child(branchCode).child(branchName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("No of Days").set(daysData)
//                 database.ref("BRANCH/").child(branchCode).child(branchName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("Reason").set(reasonData)
//             }

//         } else {
//             database.ref("BRANCH/").child(branchCode).child(branchName).child(subDateTime).child(checkValue).set(statusDropdownValue)
//         }
//     }

//     var element = document.body;
//     var opt = {
//         margin:       1,
//         filename:     $('#branch_code').val() + " " + $('#branch_code_name').val() + " " + $("#datetime2").val(),
//         image:        { type: 'jpeg', quality: 1 },
//         html2canvas:  { scale: 2 },
//         jsPDF:        { unit: 'mm', format: 'a2', orientation: 'portrait' }
//       };

//     html2pdf(element, opt)
//     setTimeout(() => {
//         location.reload()
//     }, 3000);

// }

// function submitform(){
//     $('.branch_tab').css('display', 'none')
//     $(".branch-form").css('display', 'none')
//     var element = document.getElementById("header");
//     element.classList.remove("d-flex");
//     var element = document.getElementById("back-to-top");
//     element.classList.remove("d-flex");
//     $(".img-logo-snip").css('display', 'block')
//     $(".button").css('display', 'none')
//     $('.section').css('padding', 0)
//     $('.checklist-box').css('max-width', '70%')
//     $(".back-to-top").css('display', 'none') 
//     $("#header").css('display', 'none')

//     var idarray = $.map($('input[name="atm_check"]:checked'), function(c){return c.id; })
//     var idarrayLength = idarray.length;

//     var atmCode = $('#code').val()
//     var atmName = $('#code_name').val()
//     var subDateTime = $("#datetime").val()
//     var managerName = $("#manager_name").val()
//     var managerEmail = $("#email").val()
//     var managerContact = $("#contact").val()
//     var personName = $("#person_name").val()
//     var personContact = $("#person_contact").val()

//     if(managerName !== "") {
//         database.ref("ATM/").child(atmCode).child(atmName).child("Manager Details").child("Manager Name").set(managerName)
//     }

//     if(managerEmail !== "") {
//         database.ref("ATM/").child(atmCode).child(atmName).child("Manager Details").child("Manager Email").set(managerEmail)
//     }

//     if(managerContact !== "") {
//         database.ref("ATM/").child(atmCode).child(atmName).child("Manager Details").child("Manager Contact").set(managerContact)
//     }
//     if(personContact !== ''){
//         database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child("Site person details").child(personName).set(personContact)
//     }

//     for(let i = 0; i <idarrayLength; i++){
//         var checkValue = $('#' + idarray[i]).val()
//         var statusDropdownValue = $('#d' + idarray[i]).val()
//         if(statusDropdownValue == 'Not Working') {
//             var daysData = $('#days_d' + idarray[i]).val()
//             var reasonData = $('#reason_d' + idarray[i]).val()
//             if(daysData === "" && reasonData === ""){
//                 database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).set(statusDropdownValue)
//                 $('#days_d' + idarray[i]).css("display", "none")
//                 $('#reason_d' + idarray[i]).css("display", "none")
//             }
//             else if(daysData === "" && reasonData !== "") {
//                 database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("Reason").set(reasonData)
//                 $('#days_d' + idarray[i]).css("display", "none")
//             }
//             else if(daysData !== "" && reasonData === ""){
//                 database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("No of Days").set(daysData)
//                 $('#reason_d' + idarray[i]).css("display", "none")
//             }
//             else if(daysData !== "" && reasonData !== ""){
//                 database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("No of Days").set(daysData)
//                 database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).child(statusDropdownValue).child("Reason").set(reasonData)
//             }

//         } else {
//             database.ref("ATM/").child(atmCode).child(atmName).child(subDateTime).child(checkValue).set(statusDropdownValue)
//         }
//     }


//     var element = document.body;
//     var opt = {
//         margin:       1,
//         filename:     $('#code').val() + " " + $('#code_name').val() + " " + $("#datetime").val(),
//         image:        { type: 'jpeg', quality: 1 },
//         html2canvas:  { scale: 2 },
//         jsPDF:        { unit: 'mm', format: 'a2', orientation: 'portrait' }
//       };

//     html2pdf(element, opt)
//     setTimeout(() => {
//         location.reload()
//     }, 3000);
// }

// function reset(){
//     location.reload()
// }

// function submitform3(){
//     var siteType = $('#add-select').val()
//     var siteID = $('#site_id').val()
//     var siteName = $('#site_name').val()
//     database.ref(siteType).child(siteID).set(siteName)
//     setTimeout(() => {
//         location.reload()
//     }, 1000);
// }