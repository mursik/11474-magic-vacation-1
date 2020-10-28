export default () => {
  let element = document.querySelector(`.rules__list li:last-child p`);
  let btn = document.querySelector(`.rules__link`);
  element.addEventListener(`animationend`, () => {
    btn.classList.add(`show`);
  });
};
