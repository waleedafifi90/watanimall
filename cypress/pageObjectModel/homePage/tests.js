import {homePageItems} from './items';

export class homePageTests {
  constructor() {
    this.items = new homePageItems();
  }

  checkHomePageTitle(homePageTitle) {
    this.items.homePageTitle()
        .should('contain', homePageTitle);
  }

  checkHomeNavCurrentPage(homeNavTitle) {
    this.items.homeNavItem()
        .parent()
        .should('have.class', 'current-menu-item')
        .and('contain', homeNavTitle);
  }

  checkCurrentURL() {
    cy.url()
      .should('equal', Cypress.config().baseUrl+'/');
  }

  navigateToCategoryPage(categoryNavName) {
    this.items.categoryNavItem()
        .should('contain', categoryNavName);
  }
}