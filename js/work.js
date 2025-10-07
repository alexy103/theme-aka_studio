const workMenuLinks = document.querySelectorAll(".workMenu__link");

let activeWorkMenuLink = document.querySelector(".work .submenu__active");

const workContent = document.querySelectorAll(".work .projects");

const workTitles = document.querySelectorAll(".work .category");
let activeWorkTitle = document.querySelector(".work .category:not(.hidden)");

const workTitlesSpan = document.querySelectorAll(".work .category span");

const workState = {
  name: "work",
  activeContent: workContent[0],
  activeMenuLink: workMenuLinks[0],
  activeTitle: activeWorkTitle,
  titles: workTitles,
};

// Gestion de l'enter et l'exit de l'underline du submenu de WORK
workMenuLinks.forEach((link, i) => {
  link.addEventListener("click", () => {
    let active = document.querySelector(".work .submenu__active");
    workTitlesSpan.forEach((e) => {
      e.classList.remove("category--enter");
    });
    active.classList.remove("underline--enter");

    // On attend que la classe s'enlève pour commencer l'animation
    setTimeout(() => {
      active.classList.add("underline--exit");
      link.classList.add("underline--enter");
      workTitlesSpan.forEach((e) => {
        e.classList.add("category--exit");
      });
    }, 1);

    updateContent(workState, workContent, workMenuLinks, i);

    // On nettoie la classe une fois que l'enter est fini
    setTimeout(() => {
      workMenuLinks.forEach((link) => {
        link.classList.remove("underline--exit");
      });
      workTitlesSpan.forEach((e) => {
        e.classList.add("category--enter");
        e.classList.remove("category--exit");
      });
    }, 1000);
  });
});

const black = document.querySelector(".black");
const thumbnails = document.querySelectorAll(".thumbnail");

// Attributs de chaque projet
const title = black.querySelector(".title");
const iframe = black.querySelector("iframe");
const description = black.querySelector(".video__description");
const client = black.querySelectorAll(".info__text")[0];
const date = black.querySelectorAll(".info__text")[1];
const fonction = black.querySelectorAll(".info__text")[2];

// Actualiser les attributs du popup qui va s'afficher
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    title.textContent = thumbnail.dataset.title;
    iframe.src = thumbnail.dataset.src;
    iframe.title = thumbnail.dataset.title;
    description.textContent = thumbnail.dataset.description;
    client.textContent = thumbnail.dataset.client;
    date.textContent = thumbnail.dataset.date;

    // Faire un retour à la ligne après chaque virgule
    fonction.innerHTML = thumbnail.dataset.fonction
      .split(",")
      .map((item) => item.trim())
      .join(",<br>");

    // Afficher le popup
    black.classList.remove("unclickable");
  });
});

// Fermer le popup et nettoyer les attributs
const closeBlack = black.querySelector(".black__close");
closeBlack.addEventListener("click", () => {
  black.classList.add("unclickable");
  iframe.src = "";
});
