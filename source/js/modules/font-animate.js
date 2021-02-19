export default class FontAnimate {
  constructor(
      element,
      flagPrePareText,
      timer,
      property,
      timingFunction
  ) {

    this._timer = timer;
    this._classForActivate = `active`;
    this._property = property;
    this._element = element;
    this._timeOffset = 0;
    this._timeOffsetInterval = 50;
    this._timingFunction = timingFunction;
    this._maxStep = 4;
    this._minStep = 2;
    this._flagPrepareText = flagPrePareText;

    this.prePareText();
  }

  createElement(letter, indexWord, indexLetter) {
    const span = document.createElement(`span`);
    const limit = indexWord * this._maxStep * this._timeOffsetInterval;

    if (this._timeOffset <= limit || (indexWord > 0 && indexLetter === 0)) {
      const rand = this._minStep + Math.floor(Math.random() * (this._maxStep + 1 - this._minStep));
      this._timeOffset = rand * this._timeOffsetInterval + limit;
    }

    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer}ms ${this._timingFunction} ${this._timeOffset}ms`;
    this._timeOffset -= this._timeOffsetInterval;

    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    let text = this._element.textContent.trim().split(` `).filter((letter) => letter !== ``);
    if (this._flagPrepareText === false) {
      text = [this._element.textContent.trim()];
    }
    const content = text.reduce((fragmentParent, word, indexWord) => {

      const wordElement = Array.from(word).reduce((fragment, letter, indexLetter) => {
        fragment.appendChild(this.createElement(letter, indexWord, indexLetter));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      wordContainer.appendChild(document.createTextNode(` `)); // fix bag when switching between pages

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
