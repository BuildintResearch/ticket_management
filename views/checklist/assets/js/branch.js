document.getElementById("ac_count_input").addEventListener('change', function(){
    var count = document.getElementById('ac_count_input')
    var ele = document.getElementById('ac_count_div')
    html = ""
    ele.innerHTML+=html
    for(i=0;i<count.value;i++){
        html += '<label>AC-'+(i+1)+'</label> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Area"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="AC Type"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Brand"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Model"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Quantity"> </div> <div class="col-4" style="margin-top: 15px;"> <input class="input" type="text" placeholder="Comms"> </div>'
    }
    ele.innerHTML+=html
    
})
