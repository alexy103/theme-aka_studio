const opinionSliderLeftArrows = document.querySelectorAll(
  ".content--second .slider .fa-chevron-left"
);
const opinionSliderRightArrows = document.querySelectorAll(
  ".content--second .slider .fa-chevron-right"
);

const allOpinions = document.querySelectorAll(
  ".opinions .opinion :is(img, .opinion__title, .opinion__text)"
);
let activeOpinionElements = document.querySelectorAll(
  ".about .opinions:not(.hidden) .opinion"
);

let activeOpinion = document.querySelector(".about .opinion:not(.hidden)");
let opinionSliderIndex = 0;

function showOpinion(index, direction) {
  allOpinions.forEach((e) => {
    e.classList.remove("friendlist--exit", "friendlist--enter");
  });

  // Ancien avis
  activeOpinion
    .querySelectorAll("img, .opinion__title, .opinion__text")
    .forEach((e) => {
      e.classList.remove(
        "slider--exit--right",
        "slider--exit--left",
        "slider--enter--right",
        "slider--enter--left"
      );
      e.classList.add(
        direction === "right" ? "slider--exit--left" : "slider--exit--right"
      );
    });

  setTimeout(() => {
    activeOpinionElements.forEach((friend) => {
      friend.classList.add("hidden");
    });

    // Boucle infinie
    if (index >= activeOpinionElements.length) {
      opinionSliderIndex = 0;
    } else if (index < 0) {
      opinionSliderIndex = activeOpinionElements.length - 1;
    } else {
      opinionSliderIndex = index;
    }

    activeOpinionElements[opinionSliderIndex].classList.remove("hidden");
    activeOpinion = activeOpinionElements[opinionSliderIndex];

    // Nouveau avis
    activeOpinion
      .querySelectorAll("img, .opinion__title, .opinion__text")
      .forEach((e) => {
        e.classList.remove("slider--exit--right", "slider--exit--left");
        e.classList.add(
          direction === "right" ? "slider--enter--right" : "slider--enter--left"
        );
      });
  }, 500);
}

// Flèche droite
opinionSliderRightArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    showOpinion(opinionSliderIndex + 1, "right");
  });
});

// Flèche gauche
opinionSliderLeftArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    showOpinion(opinionSliderIndex - 1, "left");
  });
});

if (window.innerWidth >= 1440) {
  const wrapper = document.querySelector(".desktopOpinions");
  const DURATION = 1000; // ms
  const EASING = "ease";
  let isAnimating = false;

  // largeur d'une colonne (=$column)
  const column = (window.innerWidth - 220) / 12;
  // gap défini en CSS: gap: calc($column + 20px)
  const gap = column + 20;
  // largeurs "normale" et "active"
  const baseWidth = column;
  const activeWidth = column * 3;

  // 👉 Dupliquer toute la liste au démarrage (une seule fois)
  (function duplicateInitialList() {
    if (wrapper.querySelector("[data-clone='1']")) return; // déjà dupliqué
    const originals = Array.from(wrapper.querySelectorAll(".opinion"));
    const clones = originals.map((el) => {
      const c = el.cloneNode(true);
      c.classList.remove("active");
      return c;
    });
    clones.forEach((c) => wrapper.appendChild(c));
  })();

  function setActiveOnly(el) {
    wrapper
      .querySelectorAll(".opinion")
      .forEach((n) => n.classList.remove("active"));
    el.classList.add("active");
  }

  wrapper.addEventListener("click", (e) => {
    if (isAnimating) return;

    const clicked = e.target.closest(".opinion");
    if (!clicked || !wrapper.contains(clicked)) return;

    const originals = Array.from(
      wrapper.querySelectorAll(".opinion:not([data-clone='1'])")
    );
    const allItems = Array.from(wrapper.querySelectorAll(".opinion")); // originaux + clones

    const idx = originals.indexOf(clicked);
    if (idx < 0) return;

    if (idx === 0) {
      setActiveOnly(clicked);
      return;
    }

    // le nouvel élément devient active, et on met .active sur ceux entre 0 et idx
    clicked.classList.add("active");

    // ✅ Shift exact basé sur la position réelle à l'écran (avant toute réorganisation)
    const firstRect = originals[0].getBoundingClientRect();
    const clickedRect = clicked.getBoundingClientRect();
    let shift = clickedRect.left - firstRect.left;

    // Slide smooth
    isAnimating = true;
    allItems.forEach((el) => {
      el.style.transition = `transform ${DURATION}ms ${EASING}`;
      el.style.transform = `translateX(${-shift}px)`;
    });

    let finished = 0;
    const total = allItems.length;

    const onEnd = (evt) => {
      if (evt.propertyName !== "transform") return;
      finished += 1;
      if (finished !== total) return;

      allItems.forEach((el) => el.removeEventListener("transitionend", onEnd));

      // Déplacer les originaux avant le cliqué à la fin (ordre conservé)
      for (let i = 0; i < idx; i++) {
        originals[i].style.transition = "none";
        wrapper.appendChild(originals[i]);
      }

      // Reset styles sur tous (originaux + clones)
      const resetItems = Array.from(wrapper.querySelectorAll(".opinion"));
      resetItems.forEach((el) => {
        el.style.transition = "none";
        el.style.transform = "";
        el.style.willChange = "";
        void el.offsetWidth;
        el.style.transition = "";
      });

      // Normaliser: seul le premier reste actif
      setActiveOnly(resetItems[0]);

      isAnimating = false;
    };

    allItems.forEach((el) => el.addEventListener("transitionend", onEnd));
  });
}
