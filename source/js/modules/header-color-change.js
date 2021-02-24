export default (i) => {
  const headerColorChange = function (index) {
    if (index === 0 || index === 1) {
      document.body.classList.add(`menu-c-dark`);
      document.body.classList.remove(`menu-c-blue`, `menu-c-blue-dark`);
    } else if (index === 2 || index === 3) {
      document.body.classList.add(`menu-c-blue`);
      document.body.classList.remove(`menu-c-dark`, `menu-c-blue-dark`);
    } else if (index === 4 || index === 5) {
      document.body.classList.add(`menu-c-blue-dark`);
      document.body.classList.remove(`menu-c-dark`, `menu-c-blue`);
    } else {
      document.body.classList.remove(`menu-c-dark`, `menu-c-blue`, `menu-c-blue-dark`);
    }
    if (index === -1 && document.getElementById(`story`).classList.contains(`active`) && !document.body.classList.contains(`menu-c-dark`)) {
      document.body.classList.add(`menu-c-dark`);
    }
  };
  headerColorChange(i);
};
