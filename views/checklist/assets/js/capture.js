// let camera_button = document.querySelector("#start-camera");
// let video = document.querySelector("#video");
// let click_button = document.querySelector("#click-photo");
// let canvas = document.querySelector("#canvas");

// camera_button.addEventListener('click', async function() {
//    	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
// 	video.srcObject = stream;
// });

// click_button.addEventListener('click', function() {
//    	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
//    	let image_data_url = canvas.toDataURL('image/jpeg');

//    	// data url of the image
//    	console.log(image_data_url);
// });




// const vid = document.querySelector('video');
// navigator.mediaDevices.getUserMedia({video: true}) // request cam
// .then(stream => {
//   vid.srcObject = stream; // don't use createObjectURL(MediaStream)
//   return vid.play(); // returns a Promise
// })
// .then(()=>{ // enable the button
//   const btn = document.querySelector('button');
//   btn.disabled = false;
//   btn.onclick = e => {
//     takeASnap()
//     .then(download);
//   };
// })
// .catch(e=>console.log('please use the fiddle instead'));

// function takeASnap(){
//   const canvas = document.createElement('canvas'); // create a canvas
//   const ctx = canvas.getContext('2d'); // get its context
//   canvas.width = vid.videoWidth; // set its size to the one of the video
//   canvas.height = vid.videoHeight;
//   ctx.drawImage(vid, 0,0); // the video
//   return new Promise((res, rej)=>{
//     canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
//   });
// }
// function download(blob){
//   // uses the <a download> to download a Blob
//   let a = document.createElement('a'); 
//   a.href = URL.createObjectURL(blob);
//   a.download = 'screenshot.jpg';
//   document.body.appendChild(a);
//   a.click();
// }



var video = document.querySelector("#video");  
  
// Basic settings for the video to get from Webcam

const constraints = {  
    audio: false,  
    video: {  
        width: 275, height: 275
    }  
};  
// , facingMode: { exact: "environment" }

// This condition will ask permission to user for Webcam access  
if (navigator.mediaDevices.getUserMedia) {  
    navigator.mediaDevices.getUserMedia(constraints)  
        .then(function (stream) {  
            video.srcObject = stream;  
        })  
        .catch(function (err0r) {  
            console.log("Something went wrong!");  
        });  
}  

function stop(e) {  
    var stream = video.srcObject;  
    var tracks = stream.getTracks();  

    for (var i = 0; i < tracks.length; i++) {  
        var track = tracks[i];  
        track.stop();  
    }  
    video.srcObject = null;  
}


// Below code to capture image from Video tag (Webcam streaming)  
$("#btnCapture").click(function () {  
    var canvas = document.getElementById('canvas');  
    var context = canvas.getContext('2d');  

    // Capture the image into canvas from Webcam streaming Video element  
    context.drawImage(video, 0, 0);  
});  

// Upload image to server - ajax call - with the help of base64 data as a parameter  
$("#btnSave").click(function () {  

    // Below new canvas to generate flip/mirron image from existing canvas  
    var destinationCanvas = document.createElement("canvas");  
    var destCtx = destinationCanvas.getContext('2d');  
    destinationCanvas.height = videoHeight;  
    destinationCanvas.width = videoHeight;  
    destCtx.translate(video.videoWidth, 0);  
    destCtx.scale(-1, 1);  
    destCtx.drawImage(document.getElementById("canvas"), 0, 0);  
    // Get base64 data to send to server for upload  
    var imagebase64data = destinationCanvas.toDataURL("image/png");  
    imagebase64data = imagebase64data.replace('data:image/png;base64,', ''); 
    return new Promise((res, rej)=>{
        destinationCanvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
    });
    // $.ajax({  
    //     type: 'POST',  
    //     url: '/Home/UploadWebCamImage',  
    //     data: '{ "imageData" : "' + imagebase64data + '" }',  
    //     contentType: 'application/json; charset=utf-8',  
    //     dataType: 'text',  
    //     success: function (out) {
    //         alert('Image uploaded successfully..');  
    //     }  
    // });  
})

function download(blob){
//   uses the <a download> to download a Blob
  let a = document.createElement('a'); 
  a.href = URL.createObjectURL(blob);
  a.download = 'screenshot.jpg';
  document.body.appendChild(a);
  a.click();
}