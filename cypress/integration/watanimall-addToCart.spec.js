/// <reference types="cypress" />

describe('Watanimall add to cart scenario', () => {
  const categoryPageTitle = 'جميع الفئات';
  const categoryName = 'MONITORS';
  let firstProductPrice = 0;

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

    it('Verify filtring the list based on ASUS category', () => {
      cy.get('div[data-name="manufacturer"] div[data-value="asus"]').should('contain', 'ASUS');
      cy.get('div[data-name="manufacturer"] div[data-value="asus"] span').should('contain', 13);
      cy.get('div[data-name="manufacturer"] div[data-value="asus"]').click();
      // cy.get('div.shop-products-holder div.loader').should('be.visible');
      cy.get('div[data-name="manufacturer"] div[data-value="asus"]').should('have.class', 'checked');
      cy.get('div.shop-products-holder div.loader').should('have.class', 'hidden');
      cy.get('div.shop-products-holder div.product-col').should('contain', 'ASUS');


      // cy.get('div.shop-products-holder div.product-col div.product-item').first().realHover().then(el => {
      //   el.children('.btn-cart-wrap').is(':visible');
      //   el.children('.btn-cart-wrap a.btn-add-cart').to.contain('Add to the cart');
      // });
    });

    it('Verify soritng the result price from tow to high', () => {
      cy.get('div.sort-wrapper form span.jcf-select-orderby').should('be.visible');
      cy.get('div.sort-wrapper form span.jcf-select-orderby').click();
      cy.get('div.sort-wrapper form div.jcf-select-drop ul li span[data-index=4]').click();
    });

    it('Verify add the product to cart ', () => {
      cy.get('div.shop-products-holder div.product-col:first-child div.product-item').realHover().children('div.btn-cart-wrap').should('be.visible').then(el => {
        expect(el.children('a:last-child')).to.be.visible;
      }).click();
      
      // cy.get('div.shop-products-holder div.product-col:nth-child(1) div.product-item div.btn-cart-wrap a:last-child').click();
      cy.get('div.header-mini-cart').should('be.visible');

    });

    it('Verify navigating to the second product', () => {
      cy.get('div.shop-products-holder div.product-col:nth-child(2)').click();
    });
  })

})