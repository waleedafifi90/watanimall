import {CategoryPageItems} from './items';

export class CategoryPageActions {
  constructor() {
    this.items = new CategoryPageItems();
  }

  navigateToCategoryPage() {
    this.items.categoryNavItem()
        .click();
  }

  checkHeadingTitle(title) {
    this.items.pageHeadingTag()
        .should('contain', title)
  }

  navigateToCategory(cat) {
    this.items.categoryItem(cat)
        .click();
  }

  filterByType(type, filter) {
    this.items.filterItem(type, filter)
        .click();
  }

  filterItemCounter(type, filter) {
    this.items.filterItemCounter(type, filter)
        .invoke('text')
        .as('categoryCount');
  }

  sortSelectAction() {
    this.items.sortSelect()
        .click();
  }

  sortSelectItemAction(dataID) {
    this.items.sortSelectItem(dataID)
        .click();
  }

  prpductColumnAction(product) {
    this.items.productColumnParent(product)
        .realHover();
  }

  addToCartOnHoverButtonAction(product) {
    this.items.addToCartOnHoverButton(product)
        .realHover()
        .wait(1000);
  }

  addProductToCart(product) {
    this.items.addToCartOnHoverButton(product)
        .click();
  }

  openProductPage(product) {
    this.items.productColumnParent(product)
        .click();
  }
}