/// open navigation
let btnMenu = document.querySelector(".btn-mobile-nav");
let linksBtn = document.querySelector(".header");

btnMenu.addEventListener("click", () => {
  linksBtn.classList.toggle("nav-open");
});
//make the links smooth
let links = document.querySelectorAll("a:link");
links.forEach((link) =>
  link.addEventListener("click", (e) => {
    //to stop propagation
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#") {
      scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (link.classList.contains("main-nav-link")) {
      console.log(true);
      linksBtn.classList.toggle("nav-open");

      window.location.replace(link.getAttribute("href"));
    }
  })
);
