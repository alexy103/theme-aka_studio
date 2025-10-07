// HANDLE FUNCTIONS ----------------------------------------------
function handleHomeAkas(
  nextSlide,
  clickedAka,
  otherAka,
  direction,
  otherDirection,
  about
) {
  // Pas de timeout si on va vers ABOUT
  if (about) {
    setTimeout(() => {
      clickedAka.classList.add("aka--" + direction);
      otherAka.classList.add("aka--" + otherDirection);
      clickedAka.classList.add("hidden");
      otherAka.classList.add("hidden");
    }, 3000);
    updateSlide(nextSlide);
    return;
  }

  // On lance l'animation
  clickedAka.classList.add("aka--" + direction);

  // On cache le aka cliqué après son animation (1s)
  setTimeout(() => {
    clickedAka.classList.add("hidden");
  }, 1000);

  // On cache l'autre aka après les animations (3s)
  setTimeout(() => {
    otherAka.classList.add("hidden");
    otherAka.classList.add("aka--" + otherDirection);
  }, 3000);

  updateSlide(nextSlide);
}

function handleAkasDelayed(clickedAka, direction, otherAka) {
  workSlide.classList.remove("front");
  contactSlide.classList.remove("front");

  // On lance l'exit des akas
  clickedAka.classList.add("aka--" + direction);
  setTimeout(() => {
    otherAka.classList.add("aka--" + direction);
  }, 200);

  // On cache les akas après leur exit
  setTimeout(() => {
    clickedAka.classList.add("hidden");
    otherAka.classList.add("hidden");
  }, 1000);

  // On remet les aka dès que l'animation est terminée
  setTimeout(() => {
    [clickedAka, otherAka].forEach((aka) => {
      aka.classList.remove("aka--" + direction);
      aka.classList.remove("hidden");
    });
  }, 4000);
}

function handleAkas(akas, direction) {
  workSlide.classList.remove("front");
  contactSlide.classList.remove("front");

  // On lance l'exit des akas
  akas.forEach((aka) => {
    aka.classList.add("aka--" + direction);
  });

  // On cache les akas après leur exit
  setTimeout(() => {
    akas.forEach((aka) => {
      aka.classList.add("hidden");
    });
  }, 1000);

  // On remet les aka dès que l'animation est terminée
  setTimeout(() => {
    akas.forEach((aka) => {
      aka.classList.remove("aka--" + direction);
      aka.classList.remove("hidden");
    });
  }, 4000);
}

// MENU ----------------------------------------------------------
const menuLinks = document.querySelectorAll(".menu .menu__link");
const navbar = document.querySelector(".navigation");
const navigationLogo = document.querySelector(".navigation__logo");
const navigationLogoDesktop = document.querySelector(".desktopNavigation__img");
let desktopNavbar = document.querySelector(".desktopNavigation__links");
let desktopNavbarLinks = document.querySelectorAll(
  ".desktopNavigation__links .desktopNavigation__link"
);

// Mettre à jour la slide en cliquant sur un lien du menu
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // On nettoie les classes pour la double navigation
    contactSlide.classList.remove("contact--inside");
    contactSlide.classList.remove("work--inside");
    contactSlide.classList.remove("about--inside");

    let nextSlideName = link.textContent.toLowerCase().trim();

    menu.classList.remove("front");
    menu.classList.add("behind");
    document.querySelector("." + nextSlideName).classList.add("front");
    updateSlideFromMenu(nextSlideName);

    // On cache les akas de HOME
    document.querySelectorAll(".home .aka--wrapper").forEach((aka) => {
      aka.classList.add("hidden");
    });

    setTimeout(() => {
      closeMenu();
    }, 2000);
  });
});

function updateNavbarLink(slideName) {
  desktopNavbarLinks.forEach((link) => {
    link.classList.remove("submenu__active", "active");
  });

  let newActiveLink = document.querySelector(
    ".desktopNavigation__link--" + slideName.toLowerCase().trim()
  );
  newActiveLink.classList.add("submenu__active", "active");
  setUnderline(newActiveLink);
}

desktopNavbarLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    // On nettoie les classes pour la double navigation
    menu.classList.remove("front");
    menu.classList.add("behind");

    let nextSlideName = link.textContent.toLowerCase().trim();
    if (nextSlideName !== "contact" && nextSlideName !== "about") {
      setTimeout(() => {
        document.querySelector("." + nextSlideName).classList.add("front");
      }, 1000);
    }
    console.log("next: " + nextSlideName);
    console.log("actual: " + displayedSlideName);
    document.querySelector("." + displayedSlideName).classList.remove("front");

    switch (displayedSlideName) {
      case "home":
        let homeAkas = document.querySelectorAll(".home .aka--wrapper");
        if(nextSlideName === "work") {
          handleHomeAkas(nextSlideName, homeAkaRed, homeAkaCream, "right", "left");
        } else if (nextSlideName === "contact") {
          handleHomeAkas(nextSlideName, homeAkaCream, homeAkaRed, "left", "right");
        }
        break;
      case "work":
        updateSlide(nextSlideName);
        handleAkas(workAkas, "left");
        setTimeout(() => {
          workSlide.classList.remove("work--inside");
        }, 2500);

        break;
      case "contact":
        if (nextSlideName === "about") {
          aboutSlide.classList.add("front");
        }
        updateSlide(nextSlideName);
        handleAkas(contactAkas, "right");
        setTimeout(() => {
          contactSlide.classList.remove("contact--inside");
        }, 2500);

        break;
      case "about":
        document.querySelector(".home").classList.remove("right");
        document.querySelector(".home").classList.remove("left");
        document.querySelector(".home").classList.add("down");
        updateSlide(nextSlideName);
        handleAkas(aboutAkas, "down");
        setTimeout(() => {
          aboutSlide.classList.remove("about--inside");
        }, 2500);

        break;

      default:
        break;
    }
    updateNavbarLink(nextSlideName);

    // On cache les akas de HOME
    // document.querySelectorAll(".home .aka--wrapper").forEach((aka) => {
    //   aka.classList.add("hidden");
    // });
  });
});

// Afficher HOME en cliquant sur le logo de la navbar
navigationLogo.addEventListener("click", () => {
  if (displayedSlideName != "home") {
    navbar.classList.add("front");
    navbar.classList.remove(
      "navigation--enter--right",
      "navigation--enter--left",
      "navigation--enter--down",
      "navigation--enter--up"
    );
    handleAkas(workAkas, "left");
    handleAkas(contactAkas, "right");
    handleAkas(aboutAkas, "down");
    updateSlide("home");
  }
});

// Afficher HOME en cliquant sur le logo de la navbar
navigationLogoDesktop.addEventListener("click", () => {
  if (displayedSlideName != "home") {
    navbar.classList.add("front");
    navbar.classList.remove(
      "navigation--enter--right",
      "navigation--enter--left",
      "navigation--enter--down",
      "navigation--enter--up"
    );
    handleAkas(workAkas, "left");
    handleAkas(contactAkas, "right");
    handleAkas(aboutAkas, "down");
    updateSlide("home");
  }
});

// HOME ----------------------------------------------------------
const homeSlide = document.querySelector(".home");

const mainLogo = document.querySelector(".identity__logo");
const homeAkaRed = document.querySelector(".home .aka__red--wrapper");
const homeAkaCream = document.querySelector(".home .aka__cream--wrapper");
const homeAkas = document.querySelectorAll(".home .aka--wrapper");
// Afficher ABOUT en cliquant sur le logo de home
mainLogo.addEventListener("click", () => {
  handleHomeAkas("about", homeAkaRed, homeAkaCream, "right", "left", true);
});

homeAkaRed.addEventListener("click", () => {
  handleHomeAkas("work", homeAkaRed, homeAkaCream, "right", "left");
});

// Afficher CONTACT en cliquant sur le aka de droite
homeAkaCream.addEventListener("click", () => {
  handleHomeAkas("contact", homeAkaCream, homeAkaRed, "left", "right");
});

// ABOUT ----------------------------------------------------------
const aboutSlide = document.querySelector(".about");

const aboutAkaRed = document.querySelector(".about .aka__red");
const aboutAkaCream = document.querySelector(".about .aka__cream");
const aboutAkas = document.querySelectorAll(".about .aka");

aboutAkaRed.addEventListener("click", () => {
  handleAkasDelayed(aboutAkaRed, "down", aboutAkaCream);
  updateSlide("work", true);

  setTimeout(() => {
    aboutSlide.classList.remove("about--inside");
    homeSlide.classList.remove("down");
  }, 2900);
});
aboutAkaCream.addEventListener("click", () => {
  handleAkasDelayed(aboutAkaCream, "down", aboutAkaRed);
  updateSlide("contact", true);
  aboutSlide.classList.remove("front");

  setTimeout(() => {
    aboutSlide.classList.remove("about--inside");
    homeSlide.classList.remove("down");
  }, 2900);
});

// WORK ----------------------------------------------------------
const workSlide = document.querySelector(".work");

const workAkaRed = document.querySelector(".work .aka__red");
const workAkaCream = document.querySelector(".work .aka__cream");
const workAkas = document.querySelectorAll(".work .aka");

workAkaRed.addEventListener("click", () => {
  handleAkasDelayed(workAkaRed, "left", workAkaCream);
  updateSlide("home");
});

workAkaCream.addEventListener("click", () => {
  handleAkasDelayed(workAkaCream, "left", workAkaRed);
  contactSlide.classList.add("front");
  updateSlide("contact");
  setTimeout(() => {
    workSlide.classList.remove("work--inside");
    homeSlide.classList.remove("left");
  }, 3500);
});

// CONTACT ----------------------------------------------------------
const contactSlide = document.querySelector(".contact");

const contactAkaRed = document.querySelector(".contact .aka__red");
const contactAkaCream = document.querySelector(".contact .aka__cream");
const contactAkas = document.querySelectorAll(".contact .aka");

contactAkaRed.addEventListener("click", () => {
  handleAkasDelayed(contactAkaRed, "right", contactAkaCream);
  workSlide.classList.add("front");
  updateSlide("work");
  setTimeout(() => {
    contactSlide.classList.remove("contact--inside");
  }, 3500);
});

contactAkaCream.addEventListener("click", () => {
  handleAkasDelayed(contactAkaCream, "right", contactAkaRed);
  updateSlide("home");
  setTimeout(() => {
    contactSlide.classList.remove("contact--inside");
  }, 3500);
});

// SLIDES ----------------------------------------------------------
const slides = document.querySelectorAll(".slide");
let displayedSlideName = "home";

// Ajouter exit à la slide affichée
function exitDisplayedSlide() {
  let displayedSlide = document.querySelector("." + displayedSlideName);
  displayedSlide.classList.add(displayedSlideName + "--exit");

  // On attend 2s pour que l'animation de sortie se termine puis on nettoie les classes
  setTimeout(() => {
    displayedSlide.classList.remove(displayedSlideName + "--inside");
    displayedSlide.classList.remove(displayedSlideName + "--enter");
    displayedSlide.classList.remove(displayedSlideName + "--exit");

    displayedSlideName = "home";
  }, 2000);
}

function updateSlideFromMenu(slideName) {
  updateMenuLink(slideName);
  updateNavbarLink(slideName);

  switch (slideName) {
    case "home":
      // On fait l'enter de HOME
      if (displayedSlideName === "work") {
        navbar.classList.add("front", "navigation--enter--left");
      } else if (displayedSlideName === "contact") {
        navbar.classList.add("front", "navigation--enter--right");
      } else if (displayedSlideName === "about") {
        navbar.classList.add("front", "navigation--enter--down");
      }
      homeSlide.classList.add("front");
      homeSlide.classList.remove("left");
      homeSlide.classList.remove("right");
      homeSlide.classList.remove("down");
      console.log(displayedSlideName);

      exitDisplayedSlide();

      // On enlève hidden des akas de HOME
      setTimeout(() => {
        homeAkas.forEach((aka) => {
          aka.classList.remove("hidden");
        });
      }, 1000);

      // On fait le enter des akas de HOME après l'animation de l'ancienne slide
      setTimeout(() => {
        homeAkaRed.classList.remove("aka--right");
        homeAkaCream.classList.remove("aka--left");
      }, 1500);

      break;

    case "work":
      displayedSlideName = "work";

      // On nettoie la classe et on cache les akas pour préparer l'animation d'enter
      workSlide.classList.remove("work--exit");
      workAkas.forEach((aka) => {
        aka.classList.remove("hidden");
      });

      navbar.classList.add("front", "navigation--enter--right");
      workSlide.classList.add("work--enter");

      // On prépare HOME pour son enter
      homeAkaRed.classList.add("aka--right");
      homeAkaCream.classList.add("aka--left");
      homeSlide.classList.add("left");

      // On attend la fin de l'enter puis on prépare les classes pour les animations de submenu dans WORK
      setTimeout(() => {
        workSlide.classList.remove("work--enter");
        workSlide.classList.remove("front");
        workSlide.classList.add("work--inside");

        homeSlide.classList.remove("right");
        homeSlide.classList.remove("down");
      }, 3000);
      cleanOtherClasses(displayedSlideName);
      break;

    case "about":
      displayedSlideName = "about";

      // On nettoie la classe et on cache les akas pour préparer l'animation d'enter
      aboutAkas.forEach((aka) => {
        aka.classList.remove("hidden");
      });

      navbar.classList.add("front", "navigation--enter--up");
      aboutSlide.classList.add("about--enter");

      // On prépare HOME pour son enter
      homeAkaRed.classList.add("aka--right");
      homeAkaCream.classList.add("aka--left");
      homeSlide.classList.add("down");

      // On attend la fin de l'enter puis on prépare les classes pour les animations de submenu dans WORK
      setTimeout(() => {
        aboutSlide.classList.remove("about--enter");
        aboutSlide.classList.remove("front");
        aboutSlide.classList.add("about--inside");

        // On nettoie toutes les autres classes pour la double navigation
        homeSlide.classList.remove("left");
        homeSlide.classList.remove("right");
      }, 2900);
      cleanOtherClasses(displayedSlideName);
      break;

    case "contact":
      displayedSlideName = "contact";

      // On nettoie la classe et on cache les akas pour préparer l'animation d'enter
      contactSlide.classList.remove("contact--exit");
      contactAkas.forEach((aka) => {
        aka.classList.remove("hidden");
      });

      navbar.classList.add("front", "navigation--enter--left");
      contactSlide.classList.add("contact--enter");

      homeAkaRed.classList.add("aka--right");
      homeAkaCream.classList.add("aka--left");
      homeSlide.classList.add("right");

      // On attend la fin de l'enter puis on prépare les classes pour les animations de submenu dans CONTACT
      setTimeout(() => {
        contactSlide.classList.remove("contact--enter");
        contactSlide.classList.remove("front");
        contactSlide.classList.add("contact--inside");

        homeSlide.classList.remove("left");
        homeSlide.classList.remove("down");
      }, 3000);
      cleanOtherClasses(displayedSlideName);
      break;

    default:
      break;
  }
}

// Nettoyer toutes les autres classes
function cleanOtherClasses(slideName) {
  // On récupère toutes les slides
  document.querySelectorAll(".slide").forEach((slide) => {
    // Si cette slide n'est pas celle en paramètre
    if (!slide.classList.contains(slideName)) {
      // On enlève toutes les classes d'animation
      slide.classList.forEach((className) => {
        if (className.includes("--")) {
          slide.classList.remove(className);
        }
      });
    }
  });
}

function updateSlide(slideName, doubleNavigation) {
  updateMenuLink(slideName);
  updateNavbarLink(slideName);
  setTimeout(() => {
    contactSlide.classList.remove("contact--inside");
    workSlide.classList.remove("work--inside");
  }, 3000);

  switch (slideName) {
    // Afficher HOME
    case "home":
      displayedSlideName = "work";
      aboutSlide.classList.remove("front");
      desktopNavbar.classList.remove("reduceNavbar--enter");
      // On attend 1s pour que le aka de l'ancienne slide disparaisse puis on centre HOME
      setTimeout(() => {
        homeSlide.classList.add("front");
        homeSlide.classList.remove("left");
        homeSlide.classList.remove("right");
        homeSlide.classList.remove("down");
        exitDisplayedSlide();
        desktopNavbar.classList.add("reduceNavbar--exit");
      }, 1000);

      // On enlève hidden des akas de HOME
      setTimeout(() => {
        homeAkas.forEach((aka) => {
          aka.classList.remove("hidden");
        });
      }, 2900);

      // On fait le enter des akas de HOME après l'animation de l'ancienne slide
      setTimeout(() => {
        homeAkaRed.classList.remove("aka--right");
        homeAkaCream.classList.remove("aka--left");
        desktopNavbar.classList.remove("reducedNavbar");
        desktopNavbar.classList.remove("reduceNavbar--exit");
      }, 3000);
      break;

    // Afficher WORK
    case "work":
      displayedSlideName = "work";

      if (doubleNavigation) {
        workSlide.classList.add("front");
      }

      homeSlide.classList.remove("front");
      homeSlide.classList.remove("left");
      homeSlide.classList.remove("down");

      // On nettoie la classe et on cache les akas pour préparer l'animation d'enter
      workSlide.classList.remove("work--exit");
      workAkas.forEach((aka) => {
        aka.classList.remove("hidden");
      });

      // On attend 1s pour que le aka disparaisse puis on lance l'animation d'enter
      setTimeout(() => {
        workSlide.classList.add("work--enter");
        desktopNavbar.classList.add("reduceNavbar--enter");
      }, 1000);

      // On fait slide HOME après l'enter pour préparer l'animation d'exit
      setTimeout(() => {
        homeSlide.classList.add("left");
        homeSlide.classList.remove("right");
      }, 2900);

      // On attend la fin de l'enter puis on prépare les classes pour les animations de submenu dans WORK
      setTimeout(() => {
        workSlide.classList.remove("work--enter");
        desktopNavbar.classList.add("reducedNavbar");
        workSlide.classList.add("work--inside");
      }, 4000);
      break;
    case "about":
      displayedSlideName = "about";
      homeSlide.classList.remove("front");
      homeSlide.classList.remove("right");
      homeSlide.classList.remove("left");

      // On nettoie la classe et on cache les akas pour préparer l'animation d'enter
      aboutAkas.forEach((aka) => {
        aka.classList.remove("hidden");
      });

      // On attend 1s pour que le aka disparaisse puis on lance l'animation d'enter
      navbar.classList.add("front", "navigation--enter--up");
      aboutSlide.classList.add("about--enter");
      desktopNavbar.classList.add("reduceNavbar--enter");

      // On fait slide HOME après l'enter pour préparer l'animation d'exit
      setTimeout(() => {
        homeSlide.classList.add("down");
      }, 2900);

      // On attend la fin de l'enter puis on prépare les classes pour les animations de submenu dans WORK
      setTimeout(() => {
        aboutSlide.classList.remove("about--enter");
        desktopNavbar.classList.add("reducedNavbar");
        aboutSlide.classList.add("about--inside");
      }, 2200);
      break;

    // Afficher CONTACT
    case "contact":
      displayedSlideName = "contact";
      homeSlide.classList.remove("front");
      homeSlide.classList.remove("down");
      homeSlide.classList.remove("left");

      // On nettoie la classe et on cache les akas pour préparer l'animation d'enter
      contactSlide.classList.remove("contact--exit");
      contactAkas.forEach((aka) => {
        aka.classList.remove("hidden");
      });
      // On attend 1s pour que le aka disparaisse puis on lance l'animation d'enter
      setTimeout(() => {
        contactSlide.classList.add("contact--enter");
        desktopNavbar.classList.add("reduceNavbar--enter");
      }, 1000);

      // On fait slide HOME après l'enter pour préparer l'animation d'exit
      setTimeout(() => {
        homeSlide.classList.add("right");
        homeSlide.classList.remove("left");
      }, 2900);

      // On attend la fin de l'enter puis on prépare les classes pour les animations de submenu dans CONTACT
      setTimeout(() => {
        contactSlide.classList.remove("contact--enter");
        desktopNavbar.classList.add("reducedNavbar");
        contactSlide.classList.add("contact--inside");
      }, 4000);
      break;
    default:
      break;
  }
}
