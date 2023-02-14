// overview page
let usrid = localStorage.getItem("uid")
let user_list=0;
async function index_load(){

    console.log(usrid)
    fetch("http://192.168.0.194:5500/gettable/"+usrid)
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
    fetch("http://192.168.0.194:5500/getdata/tickets/assignee/"+usrid)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      var j = 0;
      for(i=0;i<data.length;i++){
        console.log(data[i])
        if(data[i]['priority']=="High" && data[i]['solved']==0){
          html += "<tr class='table-danger'><td>"+(j+1)+"</td><td>"+data[i]['project']+"</td><td>"+data[i]['status']+"</td><td>"+data[i]['priority']+"</td><td><a style='color: inherit;' href='/issuepage/"+data[i]['tkid']+"'>"+data[i]['subject']+"</a></td><td>"+data[i]['assignee']+"</td></td><td>"+data[i]['due_date']+"</td><td>"+data[i]['created_at']+"</td><td><i class='bi bi-three-dots-vertical'></i></td></tr>"
          j+=1
        }
        if((data[i]['priority']=="Low"||data[i]['priority']=="Normal") && data[i]['solved']==0){
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
}

// clear local variables
function clear_storage(){
    localStorage.clear();
}

function myticket_load(){
    let mytkt = document.getElementById('mytickettab')
    html="" 
    console.log(mytkt)
    fetch("http://192.168.0.194:5500/getdata/tickets/userid/"+usrid)
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
  fetch("http://192.168.0.194:5500/getdata/projects/none/none")
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
  fetch("http://192.168.0.194:5500/getdata/users/none/none")
  .then(response => response.json())
  .then(data => {
    html=""
    html1=""
    console.log(data)
    let ass = document.getElementById("p_list")
    let assno = document.getElementById("")
    for(i=0;i<data.length;i++){
      console.log(data[i])
      html += "<option value="+data[i]["user_id"]+">"+data[i]['fname']+" "+data[i]['lname']+"</option>"
    }
    ass.innerHTML = html
  })
}

async function getImage(){
  let tkid = document.getElementById('tkid').innerText
  console.log(tkid)
  await fetch("/fetchimg/"+tkid)
  .then(response => response.json())
  .then(data =>
    {
      html = ""
      let img_list = data[0]['attachments']
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
    })
    .catch(error => console.log('error', error));
}

async function history_func(){
  history_ele = document.getElementById("history_table")
  fetch("http://192.168.0.194:5500/getdata/tickets/none/none")
  .then(response => response.json())
  .then(result => {
    html = ""
    console.log(result)
    for(var i=0; i<=result.length-1; i++){
      console.log(result[i]['tkid'])
      html += '<tr><td>'+i+'</td><td>'+result[i]['project']+'</td><td>'+result[i]['location']+'</td><td><a style="color: inherit;" href="/issuepage/'+result[i]['tkid']+'">'+result[i]['subject']+'</a></td><td>'+result[i]['dept']+'</td><td>'+result[i]['status']+'</td><td>'+result[i]['assignee']+'</td><td>'+result[i]['priority']+'</td><td>'+result[i]['due_date']+'</td><td>'+result[i]['description']+'</td><td>'+result[i]['created_at']+'</td><td>'+result[i]['status']+'</td></tr>'
    }
    history_ele.innerHTML += html
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