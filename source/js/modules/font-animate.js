export default class FontAnimate {
  constructor(
      element,
      timer,
      classForActivate,
      property,
      timingFunction
  ) {
    this._TIME_SPACE = 100;

    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = element;
    this._timeOffset = 150;
    this._timingFunction = timingFunction;

    this.prePareText();
  }

  createElement(letter, index) {
    const span = document.createElement(`span`);
    const rand = 2 + Math.floor(Math.random() * 3); // min + Math.random() * (max + 1 - min); от 2 до 4
    if (this._timeOffset === 0)
      this._timeOffset =  rand * 50
    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer + rand*100}ms ${this._timingFunction} ${this._timeOffset}ms`;
    this._timeOffset -= 50;
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent.trim().split(` `).filter((latter)=>latter !== ``);
    const content = text.reduce((fragmentParent, word) => {

      const wordElement = Array.from(word).reduce((fragment, latter, index) => {
        fragment.appendChild(this.createElement(latter, index + 1));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}
