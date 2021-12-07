/// <reference types="cypress" />

describe('Watanimall add to cart scenario', () => {
  const categoryPageTitle = 'جميع الفئات';
  const categoryName = 'MONITORS';
  let firstProductPrice = 0;
  let productName = '';
  const manufacturerName = 'ASUS';
  const initTotalWithOneProduct = 970;
  const totalAddedCost = 30;
  const currency = '₪';

  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      }
    });
  });

  context('Navigate to all category from header nav', () => {
    it('Verify the cart is empty', () => {
      cy.get('.btn-cart > .counter')
        .should('have.css', 'background-color', 'rgb(245, 140, 13)')
        .and('have.css', 'color', 'rgb(255, 255, 255)');
      cy.get('a.btn-cart').click();
      cy.getCartCount();
      cy.get('div.header-mini-cart a.cart-close').click();
      cy.get('div.header-mini-cart').should('not.be.visible');
    })

    it('Verify navigate to category page from header nav', () => {
      // cy.afterBeforeSelector('#header #nav ul li:nth-child(5) a', 'after');
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
      cy.get('#main div.category-row div a[href*=monitors]').realHover();
      cy.get('a.category-item[href*=monitors]').should('have.css', 'box-shadow', 'rgb(230, 231, 237) 0px 18px 50px 0px');
      cy.get('a.category-item[href*=monitors] span.category-name').should('have.css', 'color', 'rgb(245, 140, 13)')
      cy.get('#main div.category-row div a[href*=monitors]').click();
      cy.url().should('include', 'product-category/monitors');
      cy.get('#main div.shop-header h1').should('contain', categoryName)
    });

    it('Verify filtring the list based on ASUS category', () => {
      cy.get('div[data-name="manufacturer"] div[data-value="asus"]').should('contain', manufacturerName);
      cy.get('div[data-name="manufacturer"] div[data-value="asus"] span').invoke('text').as('categoryCount');

      cy.get('div[data-name="monitor_size_in_inches"] span').invoke('text').as('monitorSize');

      cy.get('div[data-name="manufacturer"] div[data-value="asus"]').click();
      
      cy.get('@categoryCount').then(ele => {
        cy.get('div.products-row div.product-col').should('have.length', parseFloat(ele.replace(/[()]/g, "").trim()))
      })
      
      cy.get('@monitorSize').then(size => {
        cy.get('div[data-name="monitor_size_in_inches"] span').invoke('text').should('not.equal', size);
      })

      cy.get('div[data-name="manufacturer"] div[data-value="asus"]').should('have.class', 'checked');
      cy.get('div.shop-products-holder div.loader').should('have.class', 'hidden');
      cy.get('div.shop-products-holder div.product-col').should('contain', manufacturerName);
    });


    it('Verify soritng the result price from low to high', () => {
      cy.get('div.sort-wrapper form span.jcf-select-orderby').should('be.visible');
      cy.get('div.sort-wrapper form span.jcf-select-orderby').click();
      
      let url = 'https://watanimall.com/product-category/monitors?orderby=price&_manufacturer=asus';
      cy.intercept('POST', url).as('asusRequest');

      cy.get('div.sort-wrapper form div.jcf-select-drop ul li span[data-index=4]').click();

      cy.wait('@asusRequest');
    });
  
    it('Verify add the product to cart ', () => {
      
      cy.get('div.products-row div.product-col div.product-price').children().not('del').find('bdi').then(ele => {
        const unsortedItems = ele.map((index, el) =>  Cypress.$(el).text().substr(1).trim().replace(/,/g, '')).get();
        const sortedItems = unsortedItems.slice().sort((a, b) => parseFloat(a) - parseFloat(b));
        expect(sortedItems, 'Items are sorted').to.deep.equal(unsortedItems);
      });

      cy.get('div.shop-products-holder div.product-col:first-child div.product-item').realHover().children('div.btn-cart-wrap').should('be.visible');
      // cy.get('div.shop-products-holder div.product-col:first-child div.product-item div.btn-cart-wrap a.btn-add-cart').as('addToCart');
      // cy.get('@addToCart').realHover();
      // cy.get('@addToCart').should('have.css', 'background', 'rgb(245, 140, 13) none repeat scroll 0% 0% / auto padding-box border-box')

      cy.get('div.shop-products-holder div.product-col:nth-child(1) div.product-item div.btn-cart-wrap a.btn-add-cart').click();
      cy.totalPrice(currency);
      cy.getCartCount();
      cy.get('div.header-mini-cart a.cart-close').click();
    });

    it('Verify navigating to the second product', function() {
      cy.get('div.shop-products-holder div.product-col:nth-child(2) .product-item > .product-name a').invoke('text').as('productName');
      cy.get('div.shop-products-holder div.product-col:nth-child(2) .product-item > .product-name a').click();
      cy.get('@productName').then( text => {
        cy.get('.product_title').should('contain', text.split(' ')[4]);
      })
    });

    it('Verify increas product quantity from the buttons', () => {
      cy.get('form.cart div.quantity span.jcf-btn-dec').should('have.class', 'jcf-disabled');
      cy.get('input[id*=quantity]').should('have.value', 1);
      cy.get('form.cart div.quantity span.jcf-btn-inc').click();
      cy.get('input[id*=quantity]').should('have.value', 2);
      cy.get('form.cart div.quantity span.jcf-btn-dec').should('not.have.class', 'jcf-disabled');
    });

    it('Verify add the product to the cart', () => {
      cy.get('button[name="add-to-cart"]').click();
      
      cy.totalPrice(currency);
      cy.getCartCount();
      cy.get('span.backdrop-overlay').should('have.css', 'visibility', 'visible');
    });

    it('Verify delete a product from the cart', () => {
      // cy.get('div.mini-cart-body div.cart-item').first().children('a.cart-remove').realHover();
      // cy.get('div.mini-cart-body div.cart-item').first().children('a.cart-remove').should('have.css', 'color', 'rgb(245, 140, 13)');
      cy.get('div.mini-cart-body div.cart-item').first().children('a.cart-remove').click();
      cy.totalPrice(currency);
      cy.get('div.loader-wrap').should('have.css', 'visibility', 'visible');
    });
  });

  after(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  })
})