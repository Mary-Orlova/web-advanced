(()=>{const n=new Swiper(".js-hero--slider",{slidesPerView:1,loop:!0,pagination:{el:".js-hero-pagination",clickable:!0},a11y:{paginationBulletMessage:"Перейти к слайду {{index}}"}})})();
n = {lazy: {
  loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
  loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
},
}
