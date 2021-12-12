export class CategoryPageItems {
  categoryNavItem() {
    return cy.get("#header #nav ul li a[href*=all-categories]");
  }

  categoryRow() {
    return cy.get('#main .category-page-container .category-row');
  }

  categoryItem(cat) {
    return cy.get(`#main div.category-row div a[href*=${cat}]`);
  }

  pageHeadingTag() {
    return cy.get('#main h1');
  }

  NavItemParent() {
    return cy.get("#header #nav ul li a[href*=all-categories]")
             .parent();
  }

  shopHeadingTag() {
    return cy.get('#main div.shop-header h1');
  }

  breadCrumb() {
    return cy.get('main nav.woocommerce-breadcrumb');
  }

  sortFilterSelection() {
    return cy.get('div.sort-wrapper form.woocommerce-ordering span.jcf-select-text');
  }

  filterItem(type, filter) {
    return cy.get(`div[data-name="${type}"] div[data-value="${filter}"]`);
  }

  filterItemCounter(type, filter) {
    return cy.get(`div[data-name="${type}"] div[data-value="${filter}"] span`);
  }

  productColumn() {
    return cy.get('div.products-row div.product-col');
  }

  sortSelect() {
    return cy.get('div.sort-wrapper form span.jcf-select-orderby');
  }

  sortSelectItem(dataID) {
    return cy.get(`div.sort-wrapper form div.jcf-select-drop ul li span[data-index=${dataID}]`)
  }

  sortSelectTestDisplay() {
    return cy.get('div.sort-wrapper form.woocommerce-ordering span.jcf-select-text');
  }

  productPrices() {
    return cy.get('div.products-row div.product-col div.product-price').children().not('del').find('bdi');
  }

  productColumnParent(product) {
    return cy.get(`a[data-id="${product}"]`).parents('div.product-item');
  }

  productColumnButtonWrapper(product) {
    return cy.get(`a[data-id="${product}"]`).parents('div.product-item').children('div.btn-cart-wrap');
  }

  addToCartOnHoverButton(product) {
    return cy.get(`a[data-id="${product}"]`);
  }
}