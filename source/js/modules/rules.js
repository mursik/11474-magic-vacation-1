export default () => {
  let element = document.querySelector(`.rules__list li:last-child p`);
  let btn = document.querySelector(`.rules__link`);
  let screenRules = document.getElementById(`rules`);
  if (screenRules.classList.contains(`active`)) {
    element.addEventListener(`animationend`, () => {
      btn.classList.add(`show`);
    });
  } else {
    btn.classList.remove(`show`);
  }
};
