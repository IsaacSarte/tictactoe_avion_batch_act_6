const menuToggle = document.querySelector('.toggle');
const navigation = document.querySelector('.ul_nav');

menuToggle.onclick = function(){
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}