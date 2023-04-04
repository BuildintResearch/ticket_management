// // change assign code for modal on issue page
// document.getElementById('change_assignee').addEventListener('click', async function (e){
//     console.log('hi')
//     fetch("/getdata/users/none/none")
//     .then(response => response.json())
//     .then(data => {
//       html=""
//       html1=""
//       console.log(data)
//       let ass = document.getElementById("p_list")
//       // html += '<select name="assignee" class="selectpicker" data-live-search="true">'
//       html = ""
//       for(i=0;i<data.length;i++){
//         console.log(data[i])
//         html += "<option value="+data[i]["user_id"]+">"+data[i]['fname']+" "+data[i]['lname']+"</option>"
//       }
//       console.log(html)
//       ass.innerHTML = html
//     })
//   })