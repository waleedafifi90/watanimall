import {MiniCartModalItems} from './items';

export class MiniCartModalActions {
  constructor() {
    this.items = new MiniCartModalItems();
  }

  openMiniCart() {
    this.items.miniCartOpenLink()
        .click();
  }

  closeMiniCart() {
    this.items.miniCartCloseButton()
        .click();
  }

  cartCounterText() {
    this.items.miniCartBadge()
        .invoke('text')
        .as('cartCount');
  }
}