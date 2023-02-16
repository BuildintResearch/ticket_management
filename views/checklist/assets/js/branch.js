// document.getElementById("ac_count_input").addEventListener('change', function(){
//     var count = document.getElementById('ac_count_input')
//     var ele = document.getElementById('ac_count_div')
//     html = ""
//     ele.innerHTML = ""
//     for(i=0;i<count.value;i++){
//         html += '<label style="margin-top:20px">AC-'+(i+1)+'</label> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Area"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="AC Type"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Brand"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Model"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Quantity"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Comms"> </div>'
//     }
//     ele.innerHTML+=html
    
// })
function load_check(clicked){

    var x = document.getElementById(clicked)
    // var x = x.options[x.selectedIndex].value
    console.log('hiii')

}
document.getElementById("meter_count").addEventListener('change', function (){
    var count = document.getElementById('meter_count').value
    var ele = document.getElementById('meter_count_div')
    html = ""
    ele.innerHTML = ""
    for(i=0;i<count;i++){
        
        // html += '<div class="row" id="meter_count_div"> <div class="col-4"> <div class="group"> <label for="test">Meter - 1</label> </div> </div> <div class="row" id="meter_count_div"> <div class="col-4"> <div class="group"> <select type="text"  class="input"> <option value=1>Single Phase</option> <option value=3>Three Phase</option> <option value="" selected hidden></option> </select> </div> </div> <div class="col-4"> <div class="group"> <select type="text" class="input"> <option value=1>Single Phase</option> <option value=3>Three Phase</option> <option value="" selected hidden></option> </select> </div> </div> <div class="col-4"> <div class="group"> <select type="text" class="input"> <option value=1>Single Phase</option> <option value=3>Three Phase</option> <option value="" selected hidden></option> </select> </div> </div> </div> </div>'

        html += '<div class="row" id="meter_count_div"> <div class="col-4"> <div class="group"> <label for="test">Meter - '+(i+1)+'</label> </div> </div> <div class="row" id="meter_count_div"> <div class="row"> <div class="col-3"> <div class="group"> <select id="meter-'+(i+1)+'_ch1" onchange="load_check(this.id)" type="text"  class="input"> <option value=1>1-Phase</option> <option value=3>3-Phase</option> <option value="" selected hidden></option> </select> </div> </div> <div class="col-9"> <div class="row"> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch1_ct1" type="text" placeholder="R" class="input"></div></div> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch1_ct2" type="text" placeholder="Y" class="input"></div></div> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch1_ct3" type="text" placeholder="B" class="input"></div></div> </div> </div> </div> <div class="row"> <div class="col-3"> <div class="group"> <select id="meter-'+(i+1)+'_ch2" onchange="load_check(this.id)" type="text" class="input"> <option value=1>1-Phase</option> <option value=3>3-Phase</option> <option value="" selected hidden></option> </select> </div> </div> <div class="col-9"> <div class="row"> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch2_ct1" type="text" placeholder="R" class="input"></div></div> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch2_ct2" type="text" placeholder="Y" class="input"></div></div> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch2_ct3" type="text" placeholder="B" class="input"></div></div> </div> </div> </div> <div class="row"> <div class="col-3"> <div class="group"> <select id="meter-'+(i+1)+'_ch3" onchange="load_check(this.id)" type="text" class="input"> <option value=1>1-Phase</option> <option value=3>3-Phase</option> <option value="" selected hidden></option> </select> </div> </div> <div class="col-9"> <div class="row"> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch3_ct1" type="text" placeholder="R" class="input"></div></div> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch3_ct2"type="text" placeholder="Y" class="input"></div></div> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch3_ct3" type="text" placeholder="B" class="input"></div></div> </div> </div> </div> <div class="row"> <div class="col-3"> <div class="group"> <select id="meter-'+(i+1)+'_ch4" onchange="load_check(this.id)"type="text" class="input"> <option value=1>1-Phase</option> <option value=3>3-Phase</option> <option value="" selected hidden></option> </select> </div> </div> <div class="col-9"> <div class="row"> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch4_ct1" type="text" placeholder="R" class="input"></div></div> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch4_ct2" type="text" placeholder="Y" class="input"></div></div> <div class="col-4"><div class="group"><input id="meter-'+(i+1)+'_ch4_ct3" type="text" placeholder="B" class="input"></div></div> </div> </div> </div> </div> </div>'

    }

    ele.innerHTML+=html
})

function load_check(clicked){

    var ele = document.getElementById(clicked)
    var x = ele.options[ele.selectedIndex].value
    if(x == 1){
        x1 = document.getElementById(ele.id+'_ct2')
        x2 = document.getElementById(ele.id+'_ct3')
        x1.style.display = 'block'
        x2.style.display = 'block'
        x1.disabled = false
        x2.disbaled = false
    }
    if(x == 3){
        x1 = document.getElementById(ele.id+'_ct2')
        x2 = document.getElementById(ele.id+'_ct3')
        x1.style.display = 'none'
        x2.style.display = 'none'
        x1.disabled = true
        x2.disbaled = true
    }

}


// function load_check(clicked){
//     var x = document.getElementById(clicked)
//     var x = x.options[x.selectedIndex].value
//     ele = document.getElementById('meter_count_div')
// }
//     html = ""
//     ele.innerHTML = html
//     if(x==1){
//         console.log('single phase')
//         html = '<div class="col-3"> <div class="group"> <input type="text" placeholder="CT-1" class="input"> </div> </div> <div class="col-3"> <div class="group"> <input type="text" placeholder="CT-2" class="input"> </div> </div> <div class="col-3"> <div class="group"> <input type="text" placeholder="CT-3" class="input"> </div> </div>'
//     }
//     if(x==3){
//         console.log('three phase')
//         html = '<div class="col-3"> <div class="group"> <input type="text" placeholder="CT-1" class="input"> </div> </div>'
//     }
//     ele.innerHTML += html
// }