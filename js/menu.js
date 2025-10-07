const menu = document.querySelector(".menu");

function openMenu() {
  // On enlève front de toutes les slides
  document
    .querySelectorAll(".slide")
    .forEach((slide) => slide.classList.remove("front"));

  // Nettoyage de la navbar
  const nav = document.querySelector(".navigation");
  nav.classList.remove(
    "front",
    "navigation--enter--right",
    "navigation--enter--left",
    "navigation--enter--up",
    "navigation--enter--down"
  );

  // Nettoyage du menu et ajout de front
  menu.classList.remove("behind", "unclickable");
  menu.classList.add("front");

  // Enter des cases et de la partie droite du menu
  menu.querySelector(".mainColumn").classList.add("mainColumn--enter");
  menu.querySelector(".menu__text").classList.add("text--enter");
  menu.querySelector(".menu__img").classList.add("logo--enter");

  // Enter des liens du menu
  menu.querySelectorAll("h2").forEach((e) => e.classList.add("link--enter"));
  menu
    .querySelectorAll(".menu__border")
    .forEach((e) => e.classList.add("menu__border--enter"));
}

function closeMenu() {
  // On cache le menu
  menu.classList.add("unclickable");

  // On attend la fin de l'animation et on nettoie les éléments dedans
  setTimeout(() => {
    document
      .querySelector(".menu .mainColumn")
      .classList.remove("mainColumn--enter");
    document
      .querySelector(".menu .thirdcol")
      .classList.remove("thircol--enter");
    document.querySelectorAll(".menu h2").forEach((e) => {
      e.classList.remove("link--enter");
    });
    document.querySelector(".menu .menu__text").classList.remove("text--enter");
    document.querySelector(".menu .menu__img").classList.remove("logo--enter");
    document.querySelectorAll(".menu .menu__border").forEach((e) => {
      e.classList.remove("menu__border--enter");
    });
  }, 1000);
}

document.querySelector(".navigation__burger").addEventListener("click", () => {
  openMenu();
});

document.querySelector(".menu__close").addEventListener("click", () => {
  closeMenu();
});

// Gestion du lien actif du menu
let activeLink = document.querySelector(".activeLink");

function updateMenuLink(slideName) {
  activeLink.classList.remove("activeLink");
  activeLink = document.querySelector(
    ".menu__" + slideName.toLowerCase().trim()
  );
  activeLink.classList.add("activeLink");
}

desktopNavbar = document.querySelector(".desktopNavigation__links");

const underline = document.getElementById("underline");
const links = desktopNavbar.querySelectorAll("li");

const setUnderline = (link) => {
  const rect = link.getBoundingClientRect();
  const menuRect = desktopNavbar.getBoundingClientRect();
  underline.style.left = `${rect.left - menuRect.left}px`;
  underline.style.width = `${rect.width}px`;
};

const activeNavbarLink = desktopNavbar.querySelector("li.active");
if (activeNavbarLink) setUnderline(activeNavbarLink);

desktopNavbar.addEventListener("mouseover", (e) => {
  const link = e.target.closest("li");
  if (link) setUnderline(link);
});

desktopNavbar.addEventListener("mouseleave", () => {
  const current = desktopNavbar.querySelector("li.active");
  if (current) setUnderline(current);
});

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    desktopNavbar.querySelector("li.active")?.classList.remove("active");
    link.classList.add("active");
    setUnderline(link);
  });
});
