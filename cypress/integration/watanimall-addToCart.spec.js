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

  context('Monitor category test suite', () => {
    it('Verify navigating to monitor category from the list', () => {
      cy.get('#main div.category-row div a[href*=monitors]').should('contain', categoryName);
      cy.get('#main div.category-row div a[href*=monitors]').click();
      cy.url().should('include', 'product-category/monitors');
      cy.get('#main div.shop-header h1').should('contain', categoryName)
      // cy.get('#main div.category-row div a[href*=monitors]').should('contain', 'MONITORS').realHover().then(el => {
      //   expect(el.children('span')).to.have.css('color', 'rgb(245, 140, 13)');  
      // });

      // cy.get('#main div.category-row div a[href*=monitors] span.category-name').should('have.css', 'color', '#f58c0d');
      // cy.get('#main div.category-row a[href*=monitors]').realHover().should('have.css', 'box-shadow', '0 18px 50px 0 #e6e7ed');

    });
  })

})