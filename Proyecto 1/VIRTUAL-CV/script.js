function scrolll() {
    var left = document.querySelector(".scrollSection");
    left.scrollBy(-350, 0)
}

function scrollr() {
var right = document.querySelector(".scrollSection");
right.scrollBy(350, 0)
}

let menu = document.querySelector("#menu");
let menuBarra = document.querySelector("#menuButton")

menuBarra.addEventListener("click", function(){
    menu.classList.toggle("menuButton");
})

let audio = document.getElementById("backgroudMusic")
audio.volume = 0.2;