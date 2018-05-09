
$(document).ready(function (){
  
$("#delete").click(function(){  
  console.log("I clicked delete")
  var conf = confirm("ARE YOU SURE YOU WANT TO PERMANENTLY DELETE THIS HORSE?");
  if (conf == false)
   {history.go(0);}
  else{
 $.ajax({
    url: '',
    type: 'DELETE',
    success: function(result) {
      console.log(result)
      window.location = result.redirect
    }
    });
  }
});

$(".back").click(function(){
    $(".register").addClass("active-sx");
    $(".signIn").addClass("inactive-dx");
    $(".signIn").removeClass("active-dx");
    $(".register").removeClass("inactive-sx");
});
$(".log-in").click(function(){
    $(".signIn").addClass("active-dx");
    $(".register").addClass("inactive-sx");
    $(".register").removeClass("active-sx");
    $(".signIn").removeClass("inactive-dx");
});


$("#confirm").click(function() {
   {
      history.go(-1);
   }        
   return false;
});


$('.toggle').click(function() {
    $('.log').toggle('slow');
});


$('.toggle').click(function(){
    var text = $(this).text(); 
    if (text=="Show") { /*if text inside #toggleMessage is Show...*/
      $(this).text("Hide"); /*Change button text to Hide*/
     }
     else {
      $(this).text("Show"); 
    }
});
     


  var slideIndex = 0;

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if(dots.length < 1 || slides.length < 1){
      //return;
    }
    
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides[slideIndex-1]){


      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
      setTimeout(showSlides, 5000);
    } // Change image every 3 seconds
}

function readFile() {
  
  if (this.files && this.files[0]) {
    
    var FR= new FileReader();
    
    FR.addEventListener("load", function(e) {
      document.getElementById("img").src       = e.target.result;
      //document.getElementById("b64").innerHTML = e.target.result;
    }); 
    
    FR.readAsDataURL( this.files[0] );
  }
  console.log(document.getElementById("img"))
}
  if(document.getElementById("inp")){
    document.getElementById("inp").addEventListener("change", readFile);
  }



showSlides();

 /*
      Function to carry out the actual PUT request to S3 using the signed request from the app.
    */
    function uploadFile(file, signedRequest, url){
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            document.getElementById('preview').src = url;
            document.getElementById('avatar-url').value = url("https://image.ibb.co/jyLgfm/caramiaarena.jpg");

          }
          else{
            alert('Could not upload file.');
          }
        }
      };
      xhr.send(file);
    }

    /*
      Function to get the temporary signed request from the app.
      If request successful, continue to upload the file using this signed
      request.
    */
    function getSignedRequest(file){
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
       console.log(`/sign-s3?file-name=${file.name}&file-type=${file.type}`)
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status === 200){
            const response = JSON.parse(xhr.responseText);
            uploadFile(file, response.signedRequest, response.url);
          }
          else{
            alert('Could not get signed URL.');
          }
        }
      };
      xhr.send();
    }

    
    function initUpload(){
      const files = document.getElementById('file-input').files;
      const file = files[0];
      if(file == null){
        return alert('No file selected.');
      }
      getSignedRequest(file);
    }

    
    (() => {
        document.getElementById('file-input').onchange = initUpload;
    })();

})








