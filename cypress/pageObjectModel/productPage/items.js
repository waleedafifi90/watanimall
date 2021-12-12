export class ProductPageItems {
  breadCrumb() {
    return cy.get('nav.woocommerce-breadcrumb');
  }

  productTitle() {
    return cy.get('div.single-product-detail h1.product_title')
  }

  productPrice() {
    return cy.get('div.single-product-detail div.product-price bdi')
  }

  inStockQuantity() {
    return cy.get('div.single-product-detail p.in-stock')
  }

  summaryTable() {
    return cy.get('div.single-product-summary table');
  }

  decreaseButton() {
    return cy.get('form.cart div.quantity span.jcf-btn-dec');
  }

  increaseDecreaseButton(btn) {
    return cy.get(`form.cart div.quantity span.jcf-btn-${btn}`);
  }

  quantityInput() {
    return cy.get('form.cart input[id*=quantity]');
  }

  increaseButton() {
    return cy.get('form.cart div.quantity span.jcf-btn-inc');
  }

  addToCartButton() {
    return cy.get('button[name="add-to-cart"]');
  }
}