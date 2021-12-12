export class MiniCartModalItems {
  miniCart() {
    return cy.get('div.header-mini-cart');
  }

  miniCartBadge() {
    return cy.get('.btn-cart > .counter');
  }

  miniCartOpenLink() {
    return cy.get('a.btn-cart');
  }

  miniCartCloseButton() {
    return cy.get('div.header-mini-cart a.cart-close');
  }

  miniCartBody() {
    return cy.get('div.header-mini-cart div.mini-cart-body');
  }

  miniCartItem() {
    return cy.get('div.header-mini-cart div.cart-item');
  }

  miniCartTotal() {
    return cy.get('span.sub-total-amount');
  }

  overlayBackground() {
    return cy.get('span.backdrop-overlay');
  }
}