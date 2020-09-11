export default () => {
  let body = document.body;
  window.addEventListener(`load`, function () {
    body.classList.add(`loaded`);
  });
};
