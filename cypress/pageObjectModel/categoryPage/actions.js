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

  prpductColumnAction() {
    this.items.productColumnParent()
        .realHover();
  }
}