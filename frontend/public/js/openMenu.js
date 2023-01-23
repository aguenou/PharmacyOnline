function navbarToggle(){
    document.querySelector(".toggle-end").classList.toggle("header-links");
}

var toggleIcon = document.querySelector(".switch-menu");
if(toggleIcon.style.display == none){
    document.querySelector(".test").style.display = none;
}