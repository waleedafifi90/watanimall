import {MiniCartModalItems} from './items';

export class MiniCartModalTests {
  constructor() {
    this.items = new MiniCartModalItems();
  }

  checkMiniCartStyle() {
    this.items.miniCartBadge()
        .should('have.css', 'background-color', 'rgb(245, 140, 13)')
        .and('have.css', 'color', 'rgb(255, 255, 255)');
  }

  miniCartVisabilityStatus() {
    this.items.miniCart()
        .should('not.be.visible');
  }

  miniCartTotalPrice(total) {
    this.items.miniCartTotal()
        .should('have.text', total)
  }

  checkMiniCartOverlay() {
    this.items.overlayBackground()
        .should('have.css', 'visibility', 'visible');
  }
}