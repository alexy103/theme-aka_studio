const aboutMenuLinks = document.querySelectorAll(".aboutMenu__link");
const aboutContent = document.querySelectorAll(".about .content");

const aboutState = {
  name: "about",
  activeContent: aboutContent[0],
  activeMenuLink: aboutMenuLinks[0],
};

// Gestion du submenu
aboutMenuLinks.forEach((link, i) => {
  link.addEventListener("click", () => {
    let active = document.querySelector(".about .aboutMenu .submenu__active");
    active.classList.remove("underline--enter");
    link.classList.add("underline--enter");
    document.querySelectorAll(".friend :is(img, .name, .text)").forEach((e) => {
      e.classList.remove("friendlist--enter");
    });

    // Si on vient de friends
    if (link !== aboutMenuLinks[2] && inFriends) {
      document
        .querySelector(".about .menus .jobs")
        .classList.add("jobsMenu--exit");
    }

    // animations
    setTimeout(() => {
      if (active) active.classList.add("underline--exit");
      updateContent(aboutState, aboutContent, aboutMenuLinks, i);
    }, 1);

    setTimeout(() => {
      aboutMenuLinks.forEach((link) => {
        link.classList.remove("underline--exit");
      });
    }, 1000); // modifier ici pour le submenu d'ABOUT
  });
});

let jobsMenu;

if (window.innerWidth < 1440) {
  jobsMenu = document.querySelectorAll(".about .jobs__link");
} else {
  jobsMenu = document.querySelectorAll(".about .jobsDesktop__link");
}
const friendLists = document.querySelectorAll(".about .friendlist");
let activeFriendList = document.querySelectorAll(
  ".about .friendlist:not(.hidden)"
);

const friendsState = {
  name: "friends",
  activeContent: friendLists[0],
  activeMenuLink: jobsMenu[0],
};

const sliderArrows = document.querySelectorAll(
  ".slider .fa-chevron-left, .slider .fa-chevron-right"
);

activeFriendListFriends = document.querySelectorAll(
  ".about .friendlist:not(.hidden) .friend"
);

// Gestion du submenu avec slider
jobsMenu.forEach((link, i) => {
  link.addEventListener("click", () => {
    let active;
    if (window.innerWidth < 1440) {
      active = document.querySelector(".about .jobs .submenu__active");
    } else {
      active = document.querySelector(".about .jobsDesktop .submenu__active");
    }
    active.classList.remove("underline--enter");
    link.classList.remove("underline--exit");

    allFriends.forEach((e) => {
      e.classList.remove(
        "friendlist--exit",
        "friendlist--enter",
        "slider--exit--right",
        "slider--exit--left",
        "slider--enter--right",
        "slider--enter--left"
      );
    });

    // animations
    setTimeout(() => {
      if (active) active.classList.add("underline--exit");
      updateContent(friendsState, friendLists, jobsMenu, i);
    }, 1);

    setTimeout(() => {
      activeFriendListFriends.forEach((friend) => {
        friend.classList.add("hidden");
      });
      activeFriendListFriends[0].classList.remove("hidden");
      link.classList.add("underline--enter");

      // Actualiser le premier élément du nouveau friends pour préparer l'exit du slider
      activeFriendListFriends = document.querySelectorAll(
        ".about .friendlist:not(.hidden) .friend"
      );
      activeFriend = activeFriendListFriends[0];
      currentIndex = 0;
    }, 500);

    setTimeout(() => {
      jobsMenu.forEach((link) => {
        link.classList.remove("underline--exit");
      });
      allFriends.forEach((e) => {
        e.classList.remove("friendlist--exit", "friendlist--enter");
      });
    }, 1000);
  });
});
