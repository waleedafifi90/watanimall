import {ProductPageItems} from './items';

export class ProductPageTests {
  constructor() {
    this.items = new ProductPageItems();
  }

  checkProductTitle(title) {
    this.items.productTitle()
        .should('contain', title.replace("″","\""));
  }

  checkProductPrice(price) {
    this.items.productPrice()
        .should('have.text', price);
  }

  checkProductSummary(sammary) {
    this.items.summaryTable()
        .should('contain', sammary);
  }

  checkProductBreadCrumb(title) {
    this.items.breadCrumb()
        .should('contain', title.replace("″","\""));
  }

  checkIncreaseDecreaseStatus(btn, stat) {
    let status = stat ? 'have.class' : 'not.have.class';
    this.items.increaseDecreaseButton(btn)
        .should(status, 'jcf-disabled');
  }

  checkIncreaseDecreaseHover(btn) {
    this.items.increaseDecreaseButton(btn)
        .should('have.css', 'background-color', 'rgb(245, 140, 13)')
  }

  checkQuantityValue(val, maxStock) {
    this.items.quantityInput()
        .should('have.value', val)
        .and('have.attr', 'max', maxStock)
  }

  addToCartHover() {
    this.items.addToCartButton()
        .should('have.css', 'background-color', 'rgb(0, 0, 0)')
        .and('have.css', 'color', 'rgb(255, 255, 255)')
  }
}