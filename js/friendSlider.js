const friendSliderLeftArrows = document.querySelectorAll(
  ".content--friends .slider .fa-chevron-left"
);
const friendSliderRightArrows = document.querySelectorAll(
  ".content--friends .slider .fa-chevron-right"
);

const allFriends = document.querySelectorAll(
  ".friendlist .friend :is(img, .name, .text)"
);
let activeFriendListFriends = document.querySelectorAll(
  ".about .friendlist:not(.hidden) .friend"
);

let activeFriend = document.querySelector(".about .friend:not(.hidden)");
let currentIndex = 0;

function showFriend(index, direction) {
  allFriends.forEach((e) => {
    e.classList.remove("friendlist--exit", "friendlist--enter");
  });

  activeFriend = document.querySelector(".about .friend:not(.hidden)");
  console.log(document.querySelectorAll(".about .friend:not(.hidden)")[0]);

  // On nettoie tout
  allFriends.forEach((e) => {
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
    activeFriendListFriends.forEach((friend) => {
      friend.classList.add("hidden");
    });

    // Boucle infinie
    if (index >= activeFriendListFriends.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = activeFriendListFriends.length - 1;
    } else {
      currentIndex = index;
    }

    activeFriendListFriends[currentIndex].classList.remove("hidden");
    activeFriend = activeFriendListFriends[currentIndex];

    // Nouvel ami
    activeFriend.querySelectorAll("img, .name, .text").forEach((e) => {
      e.classList.remove("slider--exit--right", "slider--exit--left");
      e.classList.add(
        direction === "right" ? "slider--enter--right" : "slider--enter--left"
      );
    });
  }, 500);
}

// Flèche droite
friendSliderRightArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    showFriend(currentIndex + 1, "right");
  });
});

// Flèche gauche
friendSliderLeftArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    showFriend(currentIndex - 1, "left");
  });
});
