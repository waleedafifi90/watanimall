/// <reference types="cypress" />

describe('Watanimall add to cart scenario', () => {
  const categoryPageTitle = 'جميع الفئات';
  const categoryName = 'MONITORS';

  before(() => {
    cy.visit('/');
  });

  context('Navigate to all category from header nav', () => {
    it('Verify navigate to category page from header nav', () => {
      // cy.get("#header #nav ul li a[href*=all-categories]").parent().trigger('mouseover');
      // cy.get("#header #nav ul li a[href*=all-categories]::after").should('be.visible');
      cy.get("#header #nav ul li a[href*=all-categories]").click();
      cy.url().should('include', 'all-categories');
      cy.get('#main h1').should('contain', categoryPageTitle);
    });

    it('Verify category nav item have the active class', () => {
      cy.get('#header #nav ul li a[href*=all-categories]').parent().should('have.class', 'current-menu-item')
    });

    it('Verify all category listed in the page', () => {
      cy.get('#main .category-page-container .category-row').should('have.length.at.least', 1);
    });
  });

  

})