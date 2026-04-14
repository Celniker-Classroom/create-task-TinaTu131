// add javascript here
document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded successfully");
    const body=document.querySelector("body");
    body.addEventListener("click", function (){
        console.log ("Body clicked");
    });
});