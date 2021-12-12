import {ProductPageItems} from './items';

export class ProductPageActions {
  constructor() {
    this.items = new ProductPageItems();
  }

  increaseQuantityAction() {
    this.items.increaseButton()
        .click();
  }

  decreaseQuantityAction() {
    this.items.decreaseButton()
        .click();
  }

  increaseDecreaseAction(btn) {
    this.items.increaseDecreaseButton(btn)
        .click();
  }

  increaseDecreaseActionHover(btn) {
    this.items.increaseDecreaseButton(btn)
        .realHover()
        .wait(1000);
  }

  invokeQuantityText() {
    return this.items.inStockQuantity()
        .invoke('text');
  }

  fillQuantityValue(val) {
    this.items.quantityInput()
        .clear()
        .type(val);
  }

  addToCartHover() {
    this.items.addToCartButton()
        .realHover()
        .wait(1000);
  }

  addToCartClickAction() {
    this.items.addToCartButton()
        .click();
  }
}