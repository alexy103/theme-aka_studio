const contactMenuLinks = document.querySelectorAll(".contactMenu__link");
let activeContactMenuLink = document.querySelector(".contact .submenu__active");

const contactContent = document.querySelectorAll(".contact .content");
let activeContactContent = document.querySelector(
  ".contact .content:not(.hidden)"
);

const contactState = {
  name: "contact",
  activeContent: contactContent[0],
  activeMenuLink: contactMenuLinks[0],
};

contactMenuLinks.forEach((link, i) => {
  link.addEventListener("click", () => {
    let active = document.querySelector(".contact .submenu__active");

    active.classList.remove("underline--enter");

    // Attendre que la classe s'enlève pour commencer l'animation
    setTimeout(() => {
      active.classList.add("underline--exit");
      link.classList.add("underline--enter");
    }, 1);

    updateContent(contactState, contactContent, contactMenuLinks, i);

    // Attendre la fin de l'animation pour enlever la classe
    setTimeout(() => {
      contactMenuLinks.forEach((link) => {
        link.classList.remove("underline--exit");
      });
    }, 1000);
  });
});
