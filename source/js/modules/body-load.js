export default () => {
  const {body} = document;
  window.addEventListener(`load`, () => {
    body.classList.add(`loaded`);
  });
};
