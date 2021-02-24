import throttle from 'lodash/throttle';
import rules from './rules.js';
import FontAnimate from './font-animate.js';
import headerColorChange from './header-color-change.js';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.previewScreen = 0;
    this.screenBg = document.querySelector(`.screen__bg`);
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.previewScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    if (this.previewScreen === 1 && this.activeScreen === 2) {
      this.screenBg.classList.add(`active`);
      setTimeout(() => this.changeVisibilityDisplay(), 700);
    } else {
      this.changeVisibilityDisplay();
    }
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
    this.screenBg.classList.remove(`active`);

    this.animateBlocksScreen();
    rules();
    headerColorChange(-1);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  animateBlocksScreen() {

    this.screenElements[this.previewScreen].querySelectorAll(`.active`).forEach((element) => {
      element.classList.remove(`active`);
    });

    let title = this.screenElements[this.activeScreen].getElementsByTagName(`h1`);
    if (title.length === 0) {
      title = this.screenElements[this.activeScreen].getElementsByTagName(`h2`);
    }

    let fontAnimateTitle;
    for (let i = 0; i < title.length; i++) {
      fontAnimateTitle = new FontAnimate(title[i], true, 500, `transform`, `cubic-bezier(0, 0, 0.32, 0.99)`);
      setTimeout(() => {
        fontAnimateTitle.runAnimation();
      }, 500);
    }

    const fontAnimateDate = new FontAnimate(this.screenElements[this.activeScreen].querySelector(`.intro__date`), false, 300, `transform`, `cubic-bezier(0, 0, 0.32, 0.99)`);
    setTimeout(()=>{
      fontAnimateDate.runAnimation();
    }, 1200);
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
