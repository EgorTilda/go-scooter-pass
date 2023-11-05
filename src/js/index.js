import modalToggle from './modules/modal';
const swiper = new Swiper('.swiper', {
    navigation: {
        nextEl: '.gallery-slider__btn--next',
        prevEl: '.gallery-slider__btn--prev',
    },
});

document.getElementById('cta-btn').addEventListener('click', modalToggle);
document.getElementById('close-modal').addEventListener('click', modalToggle);
document.body.addEventListener('keydown', (e)=> {
    if (e.key == 'Escape') {
        modalToggle();
    }
});