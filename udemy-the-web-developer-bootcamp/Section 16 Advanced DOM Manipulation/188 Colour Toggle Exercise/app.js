var button = document.querySelector("button");
var background = document.querySelector("body");

button.addEventListener("click", function(){
    background.classList.toggle("changeBackgroundColour");
});