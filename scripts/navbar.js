const menuToggle = document.querySelector('.toggle');
const navBar = document.querySelector('.ul_nav');

menuToggle.onclick = function(){
    menuToggle.classList.toggle('active');
    navBar.classList.toggle('active');
}