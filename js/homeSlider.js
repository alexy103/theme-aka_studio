// const opinions = document.querySelector(".home .opinions");
// const opinionsLeftArrow = opinions.querySelector(".fa-chevron-left");
// const opinionsRightArrow = opinions.querySelector(".fa-chevron-right");

// const wrapper = opinions.querySelector(".content__wrapper");
// let allOpinions = Array.from(opinions.querySelectorAll(".content"));

// let opinionsCurrentIndex = 0;
// let isAnimating = false;

// // Fonction pour appliquer le translateX
// function updateSlider() {
//   allOpinions.forEach((slide, i) => {
//     slide.style.transform = `translateX(${-opinionsCurrentIndex * 167}%)`;
//     slide.style.transition = "transform 0.5s ease";
//   });
// }

// // === Flèche droite ===
// opinionsRightArrow.addEventListener("click", () => {
//   if (isAnimating) return;
//   isAnimating = true;
//   opinionsCurrentIndex++;
//   updateSlider();

//   // Après la fin de la transition, on bouge le premier slide à la fin
//   setTimeout(() => {
//     const first = allOpinions.shift(); // retirer premier
//     wrapper.appendChild(first); // mettre à la fin
//     allOpinions.push(first); // mettre à jour le tableau
//     opinionsCurrentIndex--; // on remet l'index à 0
//     allOpinions.forEach((slide) => {
//       slide.style.transition = "none";
//       slide.style.transform = `translateX(0%)`;
//     });
//     isAnimating = false;
//   }, 1000); // correspond à la durée de transition
// });

// // === Flèche gauche ===
// opinionsLeftArrow.addEventListener("click", () => {
//   if (isAnimating) return;
//   isAnimating = true;

//   // Pour slider gauche, on prend le dernier et on le met devant
//   const last = allOpinions.pop();
//   wrapper.insertBefore(last, wrapper.firstChild);
//   allOpinions.unshift(last);
//   allOpinions.forEach((slide) => {
//     slide.style.transition = "none";
//     slide.style.transform = `translateX(-167%)`;
//   });

//   // puis on anime vers 0
//   setTimeout(() => {
//     opinionsCurrentIndex = 0;
//     updateSlider();
//   }, 20); // petit delay pour que le navigateur applique le transform
//   setTimeout(() => {
//     isAnimating = false;
//   }, 520);
// });

// // === Initialisation ===
// updateSlider();
