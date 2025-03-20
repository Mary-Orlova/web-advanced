const openButton = document.querySelector('.burger');
const closeButton = document.querySelector('.close');


let bg_animation = gsap.timeline();
bg_animation.pause();

bg_animation.to(".menu", {display: 'block'}, "start");
bg_animation.fromTo(".menu__top", {opacity: 0}, {duration: 0.3, opacity: 1, ease: "power1.out"}, 0.1);
bg_animation.from(".menu-background", {duration: 1, y: 100, opacity: 0, ease: "power1.out"}, 0.5);
bg_animation.fromTo(".close", {opacity: 0,}, {duration: 0.1, opacity: 1, ease: "power1.out"}, 0);
bg_animation.from(".menu__left", {duration: 0.5, y: 50, opacity: 0, ease: "power1.out"}, 0.5);
bg_animation.from(".menu__right", { duration: 0.5, y: 50, opacity: 0, ease: "power1.out"}, 1);
bg_animation.from(".social", { uration: 0.5, y: 50, opacity: 0, ease: "power1.out"}, 1);

openButton.addEventListener('click', () => {
  bg_animation.restart();
});

closeButton.addEventListener('click', () => {
  bg_animation.reverse();
});
