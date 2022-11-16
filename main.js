/// open navigation
let btnMenu = document.querySelector(".btn-mobile-nav");
let linksBtn = document.querySelector(".header");

btnMenu.addEventListener("click", (e) => {
  linksBtn.classList.toggle("nav-open");
});
