/// open navigation
let btnMenu = document.querySelector(".btn-mobile-nav");
let linksBtn = document.querySelector(".header");

btnMenu.addEventListener("click", () => {
  linksBtn.classList.toggle("nav-open");
  console.log(linksBtn);
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
///////////////////////////////////////
// let MarkMass = 78;
// let JohnMass = 92;
// let MarkHeight = 1.69;
// let JohnHeight = 1.88;
// let markBMI = MarkMass / MarkHeight ** 2;
// let JohnBMI = JohnMass / JohnHeight ** 2;
// markBMI > JohnBMI
//   ? console.log(`Mark's BMI is higher than John's BMI`)
//   : console.log(`john's BMI is higher than Mark's BMI`);
////////////////////////////////////
// const DolphinsScore = 96 + 108 + 89;
// const KoalasScore = 88 + 91 + 110;
// let DolphinsAVG = DolphinsScore / 3;
// let KoalasAVG = KoalasScore / 3;
// DolphinsAVG > KoalasAVG
//   ? console.log("DOLPHINS WIN")
//   : DolphinsAVG < KoalasAVG
//   ? console.log("koalas WIN")
//   : console.log("DRAW");
// const day = "monday";
// switch (day) {
//   case "monday":
//     console.log("Go te coding meetup");
//     break;
//   case "tuesday":
//     console.log("playstation");
//     break;
//   case "wednesday":
//     break;
//   case "Thursday":
//     console.log("work in softylines");
//     break;
//   case "friday":
//     console.log("go to horizon");
//     break;
//   case "saturday":
//     console.log("Go to horizon again pffffffff");
//     break;
//   case "sunday":
//     console.log("Go to malaa");
//   default:
//     console.log("no day");
//     break;
// }
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
const cutFruits = function (fruits) {
  return fruits * 4;
};
function fruits(oranges, apples) {
  const applescuting = cutFruits(apples);
  const orangescuting = cutFruits(oranges);
  const fruitsParag = `so I have ${orangescuting} oranges , and ${applescuting} apples man! `;
  return fruitsParag;
}
console.log(fruits(5, 4));
