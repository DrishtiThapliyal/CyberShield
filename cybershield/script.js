const searchInput = document.querySelector(".search");

if(searchInput){

searchInput.addEventListener("keyup", function(){

let filter = this.value.toLowerCase();

let cards = document.querySelectorAll(".card");

cards.forEach(card => {

let text = card.innerText.toLowerCase();

if(text.includes(filter)){
card.style.display = "block";
}
else{
card.style.display = "none";
}

});

});

}
const topBtn = document.getElementById("topBtn");

if(topBtn){

window.addEventListener("scroll",function(){

if(window.scrollY>10){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}
const toggle = document.getElementById("themeToggle");

if(toggle){

toggle.addEventListener("click",()=>{

document.body.classList.toggle("light-mode");

localStorage.setItem(
"theme",
document.body.classList.contains("light-mode")
? "light"
: "dark"
);

});

}

if(localStorage.getItem("theme")==="light"){

document.body.classList.add("light-mode");

}

