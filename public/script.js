

$(document).ready(function (){
  
$("#delete").click(function(){  
  console.log("I clicked delete")
  $.ajax({
    url: '',
    type: 'DELETE',
    success: function(result) {
      console.log(result)
      window.location = result.redirect
        // Do something with the result
    }
});

});

$("button").click(function(){
    if($(this).hasClass("confirm")){
        $(this).addClass("done");
        $("span").text("Deleted");
    } else {
        $(this).addClass("confirm");
        $("span").text("Are you sure?");
    }
});

// Reset
$("button").on('mouseout', function(){
    if($(this).hasClass("confirm") || $(this).hasClass("done")){
        setTimeout(function(){
            $("button").removeClass("confirm").removeClass("done");
            $("span").text("Delete");
        }, 3000);
    }
});


$(".log-in").click(function(){
    $(".signIn").addClass("active-dx");
    $(".register").addClass("inactive-sx");
    $(".register").removeClass("active-sx");
    $(".signIn").removeClass("inactive-dx");
});

$(".back").click(function(){
    $(".register").addClass("active-sx");
    $(".signIn").addClass("inactive-dx");
    $(".signIn").removeClass("active-dx");
    $(".register").removeClass("inactive-sx");
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
      setTimeout(showSlides, 3000);
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

})






