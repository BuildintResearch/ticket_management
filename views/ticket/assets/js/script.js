// overview page
let usrid = localStorage.getItem("uid")
let user_list=0;
async function index_load(){
    console.log(usrid)
    fetch("/gettable/"+usrid)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      var open=0;
      var closed=0;
      var pr = ['Normal','Low','High']
      var pro = ['Normal', 'Low', 'High']
      var arr = [0,0,0]
      var arro = [0,0,0]
      let tt = document.getElementById('tracker_table')
      html=""
      for(i=0;i<data.length;i++){
          if(data[i]['priority']=="High"){
            if(data[i]['solved']==0){
              arr[2] += 1
            }
            if(data[i]['solved']==1){
              arro[2] += 1
            }
          }
          if(data[i]['priority']=="Normal"){
            if(data[i]['solved']==0){
              arr[0] += 1
            }
            if(data[i]['solved']==1){
              arro[0] += 1
            }
          }
          if(data[i]['priority']=="Low"){
            if(data[i]['solved']==0){
              arr[1] += 1
            }
            if(data[i]['solved']==1){
              arro[1] += 1
            }
          }
      }
      for(i=0;i<arr.length;i++){
        html += "<tr><th>"+pr[i]+"</th><td>"+arr[i]+"</td><td>"+arro[i]+"</td><td>"+(parseInt(arr[i])+parseInt(arro[i]))+"</td></tr>"
      }
      tt.innerHTML=html
    })
  }


// issues page
async function issue_load(){
    let iss = document.getElementById('issuetab')
    html="" 
    console.log(iss)
    fetch("/getdata/tickets/assignee/"+usrid)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      var j = 0;
      for(i=0;i<data.length;i++){
        console.log(data[i])
        if((data[i]['priority']=="High" && data[i]['solved']==0) && (data[i]['status']!='POC' && data[i]['status']!='Live')){
          html += "<tr class='table-danger'><td>"+(j+1)+"</td><td>"+data[i]['project']+"</td><td>"+data[i]['status']+"</td><td>"+data[i]['priority']+"</td><td><a style='color: inherit;' href='/issuepage/"+data[i]['tkid']+"'>"+data[i]['subject']+"</a></td><td>"+data[i]['assignee']+"</td></td><td>"+data[i]['due_date']+"</td><td>"+data[i]['created_at']+"</td><td><i class='bi bi-three-dots-vertical'></i></td></tr>"
          j+=1
        }
        if(((data[i]['status']=='POC' || data[i]['status']=='Live')) && data[i]['solved']==0){
          html += "<tr class='table-info'><td>"+(j+1)+"</td><td>"+data[i]['project']+"</td><td>"+data[i]['status']+"</td><td>"+data[i]['priority']+"</td><td><a style='color: inherit;' href='/issuepage/"+data[i]['tkid']+"'>"+data[i]['subject']+"</a></td><td>"+data[i]['assignee']+"</td></td><td>"+data[i]['due_date']+"</td><td>"+data[i]['created_at']+"</td><td><i class='bi bi-three-dots-vertical'></i></td></tr>"
          j+=1
        }
        if((data[i]['priority']=="Low" || data[i]['priority']=="Normal") && data[i]['solved']==0){
          html += "<tr><td>"+(j+1)+"</td><td>"+data[i]['project']+"</td><td>"+data[i]['status']+"</td><td>"+data[i]['priority']+"</td><td><a style='color: inherit;' href='/issuepage/"+data[i]['tkid']+"'>"+data[i]['subject']+"</a></td><td>"+data[i]['assignee']+"</td><td>"+data[i]['due_date']+"</td><td>"+data[i]['created_at']+"</td><td><i class='bi bi-three-dots-vertical'></i></td></tr>"
          j+=1
        }
      }
      iss.innerHTML = html
    })
}

async function issue_page(){
    var cont = document.getElementById('issue-comment-div') 
    html = "<input name='user_id' type='text' value='"+usrid+"'hidden>"
    cont.innerHTML +=html 
    load_assignee()
    load_assignee1()
}

// clear local variables
function clear_storage(){
    localStorage.clear();
}

function myticket_load(){
    let mytkt = document.getElementById('mytickettab')
    html="" 
    console.log(mytkt)
    fetch("/getdata/tickets/userid/"+usrid)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      for(i=0;i<data.length;i++){
        // html += "<tr></tr>"
        console.log(data[i])
          solved = data[i]['solved']==1 ? 'solved':'open';
          html += "<tr><td>"+(i+1)+"</td><td>"+data[i]['project']+"</td><td>"+data[i]['status']+"</td><td>"+data[i]['priority']+"</td><td><a style='color: inherit;' href='/issuepage/"+data[i]['tkid']+"'>"+data[i]['subject']+"</a></td><td>"+solved+"</td><td>"+data[i]['due_date']+"</td><td>"+data[i]['created_at']+"</td><td><div class='dropdown'><i class='bi bi-three-dots-vertical'></i><div class='dropdown-content'><a href='/update/"+data[i]['tkid']+"/del'>Delete</a></div></div></td></tr>"
      }
      mytkt.innerHTML = html
    }
)}

function tkgen(){
  document.getElementById('user_id').value = usrid
  fetch("/getdata/projects/none/none")
  .then(response => response.json())
  .then(data => {
    html=""
    console.log(data)
    let proj = document.getElementById("project_list")
    for(i=0;i<data.length;i++){
      console.log(data[i])
      html += "<option value="+data[i]['project_name']+">"+data[i]['project_name']+"</option>"
    }
    proj.innerHTML = html
  })
      
  console.log(usrid)
  fetch("/getdata/users/none/none")
  .then(response => response.json())
  .then(data => {
    html=""
    html1=""
    console.log(data)
    let ass = document.getElementById("p_list")
    // html += '<select name="assignee" class="selectpicker" data-live-search="true">'
    html = ""
    for(i=0;i<data.length;i++){
      console.log(data[i])
      html += "<option value="+data[i]["user_id"]+">"+data[i]['fname']+" "+data[i]['lname']+"</option>"
      // html += "<option value="+i+">"+i+"</option>"
    }
    // html += '</select>'
    console.log(html)
    ass.innerHTML = html
  })
}

// document.addEventListener('DOMContentLoaded', function() {
//   getImage()
// }, false);

async function getImage(){
  let tkid = document.getElementById('tkid').innerText
  console.log(tkid)
  await fetch("/fetchimg/"+tkid)
  .then(response => response.json())
  .then(data =>
    {
      html = ""
      let img_list = data[0]['attachments']
      if(img_list != 'none'){
        img_list = img_list.split(';')
        for(var i=0; i<=img_list.length-1; i++){
          console.log(img_list[i])
          fetch("/getimage?path="+img_list[i])
          .then(response => response.text())
          .then(result => {
            console.log(result)
            html = '<img style="width: 200px; margin-left:10px;" src="data:image/png;base64,'+result+'" alt="img"+'+i+' />'
            document.getElementById('img-container').innerHTML += html
        })
        .catch(error => console.log('error', error));
      }
      }
    })
    .catch(error => console.log('error', error));
  
    // get followup comment images
    let follow_elements = document.querySelectorAll('[id^="followup_img_"]')
    console.log(follow_elements)
    for(let i=0;i<follow_elements.length;i++){
      // console.log(follow_elements[i].getAttribute('id'))
      // console.log(document.getElementById(follow_elements[i].getAttribute('id')).innerHTML)
      // let img_str = "abcd"
      let img_str = document.getElementById(follow_elements[i].getAttribute('id')).innerHTML
      // console.log("***********",img_str)
      if(img_str.includes(";")){
        let html = ''
        let img_split = img_str.split(";") 
        img_split.forEach(function (item, index) {
        // console.log(item, index);
        fetch("/getimage?path="+item)
        .then(response => response.text())
        .then(result => {
          html +=  '<img style="width: 200px; margin-left:10px;" src="data:image/png;base64,'+result+'" alt="img" />'
          document.getElementById(follow_elements[i].getAttribute('id')).innerHTML = html
        })  
        });
      }
      else{
        let html = ''
        img_name = follow_elements[i].innerText
        fetch("/getimage?path="+img_name)
          .then(response => response.text())
          .then(result => {
            // console.log(result)
            html = ''
            html = '<img style="width: 200px; margin-left:10px;" src="data:image/png;base64,'+result+'" alt="img" />'
            document.getElementById(follow_elements[i].getAttribute('id')).innerHTML = html
            // console.log(html)
        })
        .catch(error => console.log('error', error));
      }
}
}
// main history load 
async function history_func(){
  history_ele = document.getElementById("history_table")
  fetch("/getdata/tickets/none/none")
  .then(response => response.json())
  .then(result => {
    html = ""
    console.log(result)
    for(var i=0; i<=result.length-1; i++){
      console.log(result[i]['tkid'])
      html += '<tr><td>'+(i+1)+'</td><td>'+result[i]['project']+'</td><td>'+result[i]['location']+'</td><td><a style="color: inherit;" href="/issuepage/'+result[i]['tkid']+'">'+result[i]['subject']+'</a></td><td>'+result[i]['dept']+'</td><td>'+result[i]['status']+'</td><td>'+result[i]['assignee']+'</td><td>'+result[i]['priority']+'</td><td>'+result[i]['due_date']+'</td><td>'+result[i]['description']+'</td><td>'+result[i]['created_at']+'</td></tr>'
    }
    history_ele.innerHTML += html
  })
}

// project filter
document.getElementById('project_filter').addEventListener('change', async function (e){
  ele = document.getElementById('project_filter').value
  console.log(ele)
  fetch("/getdata/tickets/project/"+ele)
  .then(response => response.json())
  .then(result => {
    html = ""
    history_ele.innerHTML = html
    console.log(result)
    for(var i=0; i<=result.length-1; i++){
      console.log(result[i]['tkid'])
      html += '<tr><td>'+(i+1)+'</td><td>'+result[i]['project']+'</td><td>'+result[i]['location']+'</td><td><a style="color: inherit;" href="/issuepage/'+result[i]['tkid']+'">'+result[i]['subject']+'</a></td><td>'+result[i]['dept']+'</td><td>'+result[i]['status']+'</td><td>'+result[i]['assignee']+'</td><td>'+result[i]['priority']+'</td><td>'+result[i]['due_date']+'</td><td>'+result[i]['description']+'</td><td>'+result[i]['created_at']+'</td></tr>'
    }
    history_ele.innerHTML += html
  })
})

// dept filter
document.getElementById('dept_filter').addEventListener('change', async function (e){
  ele = document.getElementById('dept_filter').value
  console.log(ele)
  fetch("/getdata/tickets/dept/"+ele)
  .then(response => response.json())
  .then(result => {
    html = ""
    history_ele.innerHTML = html
    console.log(result)
    for(var i=0; i<=result.length-1; i++){
      console.log(result[i]['tkid'])
      html += '<tr><td>'+(i+1)+'</td><td>'+result[i]['project']+'</td><td>'+result[i]['location']+'</td><td><a style="color: inherit;" href="/issuepage/'+result[i]['tkid']+'">'+result[i]['subject']+'</a></td><td>'+result[i]['dept']+'</td><td>'+result[i]['status']+'</td><td>'+result[i]['assignee']+'</td><td>'+result[i]['priority']+'</td><td>'+result[i]['due_date']+'</td><td>'+result[i]['description']+'</td><td>'+result[i]['created_at']+'</td></tr>'
    }
    history_ele.innerHTML += html
  })
})

// priority filter
document.getElementById('pr_filter').addEventListener('change', async function (e){
  ele = document.getElementById('pr_filter').value
  console.log(ele)
  fetch("/getdata/tickets/priority/"+ele)
  .then(response => response.json())
  .then(result => {
    html = ""
    history_ele.innerHTML = html
    console.log(result)
    for(var i=0; i<=result.length-1; i++){
      console.log(result[i]['tkid'])
      html += '<tr><td>'+(i+1)+'</td><td>'+result[i]['project']+'</td><td>'+result[i]['location']+'</td><td><a style="color: inherit;" href="/issuepage/'+result[i]['tkid']+'">'+result[i]['subject']+'</a></td><td>'+result[i]['dept']+'</td><td>'+result[i]['status']+'</td><td>'+result[i]['assignee']+'</td><td>'+result[i]['priority']+'</td><td>'+result[i]['due_date']+'</td><td>'+result[i]['description']+'</td><td>'+result[i]['created_at']+'</td></tr>'
    }
    history_ele.innerHTML += html
  })
})

// assign sub-ticket code for modal on issue page
async function load_assignee(){
  document.getElementById('subticket_assignee').addEventListener('click', async function (e){
    console.log('hi')
    fetch("/getdata/users/none/none")
    .then(response => response.json())
    .then(data => {
      html=""
      html1=""
      console.log(data)
      let ass = document.getElementById("p_list")
      // html += '<select name="assignee" class="selectpicker" data-live-search="true">'
      html = ""
      for(i=0;i<data.length;i++){
        console.log(data[i])
        html += "<option value="+data[i]["user_id"]+">"+data[i]['fname']+" "+data[i]['lname']+"</option>"
      }
      console.log(html)
      ass.innerHTML = html
    })
  })
}

// change main ticket assignee
async function load_assignee1(){
  document.getElementById('change_assignee').addEventListener('click', async function (e){
    console.log('hi')
    fetch("/getdata/users/none/none")
    .then(response => response.json())
    .then(data => {
      html=""
      html1=""
      console.log(data)
      let ass = document.getElementById("p_list1")
      // html += '<select name="assignee" class="selectpicker" data-live-search="true">'
      html = ""
      for(i=0;i<data.length;i++){
        console.log(data[i])
        html += "<option value="+data[i]["user_id"]+">"+data[i]['fname']+" "+data[i]['lname']+"</option>"
      }
      console.log(html)
      ass.innerHTML = html
    })
  })
}


// document.getElementById("upload_file_btn").addEventListener('click', async function (e) {
//   const file_list = document.getElementById("file_input")
//   // const files = e.target.uploadedImages.files;
//   console.log(file_list.files)
//   console.log(file_list.files.length)
//   let data = []
//   if (file_list.length != 0) {
//       for (i=0;i<file_list.files.length;i++) {
//           data.push(file_list.files[i])
//       }
//       console.log(data)
//       await fetch('/files', {
//         method: 'POST',
//         body: data})
//   }
 
// });

// async function uploadtkt(){
//   // await document.forms["file_input"].submit()
//   // // await document.forms["ticket_data"].submit()
//   document.getElementById("ticket_form").submit()
//   document.getElementById("ticket_images").submit()
// }