import {CategoryPageItems} from './items';

export class CategoryPageTests {
  constructor() {
    this.items = new CategoryPageItems();
  }

  checkCategoryNavItemStatus() {
    this.items.NavItemParent()
        .should('have.class', 'current-menu-item');
  }

  checkCategoryItems() {
    this.items.categoryRow()
        .should('not.be.empty');
  }

  checkSelectingCategoryItem(cat, contain) {
    this.items.categoryItem(cat)
        .should('contain', contain);
  }

  checkShopTitle(title) {
    this.items.shopHeadingTag()
        .should('contain', title)
  }

  checkBreadCrumb(title) {
    this.items.breadCrumb()
        .should('contain', title);
  }

  checkProductCounterOnFilter(counter) {
    this.items.productColumn()
        .should('have.length', counter);
  }

  checkFilterTypeChecked(type, title) {
    this.items.filterItem(type,title)
        .should('have.class', 'checked');
  }

  sortSelectTest() {
    this.items.sortSelect()
        .should('be.visible');
  }

  sortSelectTestDisplayTest(dataID) {
    this.items.sortSelectTestDisplay()
        .should('have.text', dataID);
  }

  productPrices() {
    return this.items.productPrices();
  }

  productButtonsWrapper() {
    this.items.productColumnButtonWrapper()
        .should('be.visible');
  }
}