export default class Section {
  constructor({ renderer, items }, classSelector) {
    this._renderer = renderer;
    this._items = items;
    this._element = document.querySelector(`.${classSelector}`);
  }

  renderItems() {
    //use this._renderer to render items to the this._element
    console.log("render Items is being called");
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(data) {
    //take the item and add it to this._element
    this._element.prepend(data);
  }
}
