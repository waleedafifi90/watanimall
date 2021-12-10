/// <reference types="cypress" />

describe('Watanimall add to cart scenario', () => {
  let url = 'https://watanimall.com/product-category/monitors?orderby=price&_manufacturer=asus';

  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      }
    });
    cy.fixture('example').as('data')
  });

  context('Navigate to all category from header nav', () => {
    it('Verify home screen after visit the website', function() {
      cy.title().should('contain', this.data.homeTitle);
      cy.get('a[aria-current="page"]')
        .parent()
        .should('have.class', 'current-menu-item')
        .and('contain', this.data.homeTitle);
      cy.url().should('equal', Cypress.config().baseUrl+'/');
    });

    it('Verify the cart is empty', () => {
      cy.get('.btn-cart > .counter')
        .should('have.css', 'background-color', 'rgb(245, 140, 13)')
        .and('have.css', 'color', 'rgb(255, 255, 255)');
      cy.get('a.btn-cart').click();
      cy.getCartCount();
      cy.get('div.header-mini-cart a.cart-close').click();
      cy.get('div.header-mini-cart').should('not.be.visible');
    })

    it('Verify navigate to category page from header nav', function() {
      cy.get("#header #nav ul li a[href*=all-categories]").click();
      cy.url().should('include', 'all-categories');
      cy.get('#main h1').should('contain', this.data.categoryPageTitle);
    });

    it('Verify category nav item have the active class', () => {
      cy.get('#header #nav ul li a[href*=all-categories]').parent().should('have.class', 'current-menu-item')
    });

    it('Verify all category listed in the page', () => {
      cy.get('#main .category-page-container .category-row').should('not.be.empty');
    });
  });

  context('Navigate to Monitor category and add product from on hover add to cart button', () => {
    it('Verify navigating to monitor category from the list', function() {
      cy.get('#main div.category-row div a[href*=monitors]').should('contain', this.data.categoryName);
      cy.get('#main div.category-row div a[href*=monitors]').realHover();
      cy.get('a.category-item[href*=monitors]').should('have.css', 'box-shadow', 'rgb(230, 231, 237) 0px 18px 50px 0px');
      cy.get('a.category-item[href*=monitors] span.category-name').should('have.css', 'color', 'rgb(245, 140, 13)')
      cy.get('#main div.category-row div a[href*=monitors]').click();
      cy.url().should('include', 'product-category/monitors');
      cy.get('#main div.shop-header h1').should('contain', this.data.categoryName)
      cy.get('main nav.woocommerce-breadcrumb').should('contain', this.data.categoryName);
      cy.title().should('contain', this.data.categoryName);
      cy.get('div.sort-wrapper form.woocommerce-ordering span.jcf-select-text').should('have.text', this.data.defaultSelection);

      cy.get('div.products-row div.product-col').then(items => {
        if(items.length == this.data.itemPerPage) {
          if(items.last().next('nav.woocommerce-pagination')) {
            cy.get('nav.woocommerce-pagination').should('exist');
          }
        }
      })
    });

    it('Verify filtring the list based on ASUS category', function() {
      cy.get('div[data-name="manufacturer"] div[data-value="asus"]').should('contain', this.data.manufacturerName);
      cy.get('div[data-name="manufacturer"] div[data-value="asus"] span').invoke('text').as('categoryCount');

      cy.get('div[data-name="monitor_size_in_inches"] span').invoke('text').as('monitorSize');

      cy.get('div[data-name="manufacturer"] div[data-value="asus"]').click();
      cy.url().should('contain', `_manufacturer=${Cypress._.lowerCase(this.data.manufacturerName)}`);

      cy.get('@categoryCount').then(ele => {
        cy.get('div.products-row div.product-col').should('have.length', parseFloat(ele.replace(/[()]/g, "").trim()));
      })
      
      cy.get('@monitorSize').then(size => {
        cy.get('div[data-name="monitor_size_in_inches"] span').invoke('text').should('not.equal', size);
      })

      cy.get('div.products-row div.product-col').then(items => {
        if(items.length < this.data.itemPerPage) {
          cy.get('nav.woocommerce-pagination').should('not.exist');
        }
      })
      cy.get('div[data-name="manufacturer"] div[data-value="asus"]').should('have.class', 'checked');
      cy.get('div.shop-products-holder div.loader').should('have.class', 'hidden');
      cy.get('div.shop-products-holder div.product-col').should('contain', this.data.manufacturerName);
    });

    it('Verify soritng the result price from low to high', function() {
      cy.intercept('POST', url).as('asusRequest');

      cy.get('div.sort-wrapper form span.jcf-select-orderby').should('be.visible');
      cy.get('div.sort-wrapper form span.jcf-select-orderby').click();
      
      cy.get('div.sort-wrapper form div.jcf-select-drop ul li span[data-index=4]').click();
      cy.get('div.sort-wrapper form.woocommerce-ordering span.jcf-select-text').should('have.text', this.data.order);
      cy.url().should('include', 'orderby=price');
      cy.wait('@asusRequest');
    });
  
    it('Verify add the product to cart ', function() {
      cy.get('div.products-row div.product-col div.product-price').children().not('del').find('bdi').then(ele => {
        const unsortedItems = ele.map((index, el) =>  Cypress.$(el).text().substring(1).trim().replace(/,/g, '')).get();
        const sortedItems = unsortedItems.slice().sort((a, b) => parseFloat(a) - parseFloat(b));
        expect(sortedItems, 'Items are sorted').to.deep.equal(unsortedItems);
      });

      cy.get('a[data-id="107056"]').parents('div.product-item').find('h3').invoke('text').as('firstProductName');
      cy.get('a[data-id="107056"]').parents('div.product-item').realHover().children('div.btn-cart-wrap').should('be.visible');
      cy.get('a[data-id="107056"]').realHover().wait(1000).should('have.css', 'background-color', 'rgb(245, 140, 13)');
      cy.get('a[data-id="107056"]').click();

      cy.get('@firstProductName').then(text => {
        cy.get('div.header-mini-cart strong.product-name').should('contain', text);
      });

      cy.totalPrice(this.data.currency);
      cy.getCartCount();
      cy.get('div.header-mini-cart a.cart-close').click();
      cy.get('div.header-mini-cart').should('not.be.visible');
    });

    it('Verify product count on change monitor size with asus brand', () => {
      cy.get('div[data-value=27]').click();
      cy.get('div[data-value=27]').should('have.class', 'checked').children('span').invoke('text').then(text => {
        cy.get('div.products-row div.product-col').should('have.length', parseFloat(text.replace(/[()]/g, "").trim()))
      })
      cy.url().should('contain', `_monitor_size_in_inches`);
    })

    it('Verify product count on change Resolution with asus brand and monitor size', () => {
      cy.get('div[data-value=2560x1440]').click();
      cy.get('div[data-value=2560x1440]').should('have.class', 'checked').children('span').invoke('text').then(text => {
        cy.get('div.products-row div.product-col').should('have.length', parseFloat(text.replace(/[()]/g, "").trim()))
      })
      cy.url().should('contain', `_resolution`);
    });

    it('Verify product count on change Monitor Panel Type with asus brand and monitor size and resolution', () => {
      cy.get('div[data-value=ips]').click();
      cy.get('div[data-value=ips]').should('have.class', 'checked').children('span').invoke('text').then(text => {
        cy.get('div.products-row div.product-col').should('have.length', parseFloat(text.replace(/[()]/g, "").trim()))
      })
      cy.url().should('contain', `_panel_type`);
    });

    it('Verify product count on change Monitor Feature with asus brand and monitor size and resolution and Monitor Panel Type', () => {
      cy.get('div[data-value=flat]').click();
      cy.get('div[data-value=flat]').should('have.class', 'checked').children('span').invoke('text').then(text => {
        cy.get('div.products-row div.product-col').should('have.length', parseFloat(text.replace(/[()]/g, "").trim()))
      })
      cy.url().should('contain', `_panel_type`);
    });

    it('Verify product count on change Monitor Frequency with asus brand and monitor size and resolution and Monitor Panel Type and Monitor Feature', () => {
      url = 'https://watanimall.com/product-category/monitors?orderby=price&_manufacturer=asus&_monitor_size_in_inches=27&_resolution=2560x1440&_panel_type=ips&_monitor_feature=flat&_monitor_frequ=165';
      cy.intercept('POST', url).as('asusRequest');

      cy.get('div[data-value=165]').click();
      cy.get('div[data-value=165]').should('have.class', 'checked').children('span').invoke('text').then(text => {
        cy.get('div.products-row div.product-col').should('have.length', parseFloat(text.replace(/[()]/g, "").trim()))
      })
      cy.url().should('contain', `_panel_type`);
      cy.wait('@asusRequest');
    });
  });

  context('Navigate to product details page', function() {
    it('Verify add the product details for product id: 106816 to fixture', function() {
      cy.get(`a[data-id="${this.data.productID}"]`).parents('div.product-item').then(ele => {
        cy.writeFile('cypress/fixtures/product.json', {
          'href': `${ele.find('h3.product-name a').attr('href')}`,
          'productName': `${ele.find('h3.product-name a').text()}`,
          'productPrice': `${ele.find('div.product-price bdi').text()}`,
          'dataID': `${ele.find('a.btn-add-cart').attr('data-id')}`,
          'manufacture': `${this.data.manufacturerName}`
        })
      })
    })

    it('Verify navigating to the second product', function() {
      cy.get(`a[data-id="${this.data.productID}"]`).parents('div.product-item').click();
      cy.fixture('product').then( text => {
        cy.url().should('equal', text.href);
        cy.get('div.single-product-detail .product_title').should('contain', text.productName.slice(1, 20));
        cy.get(`div[id=product-${text.dataID}]`).should('exist');
        cy.get('div.single-product-detail div.product-price bdi').should('have.text', text.productPrice);
        cy.get('div.single-product-summary table').should('contain', text.manufacture);
        cy.get('div.single-product-container nav.woocommerce-breadcrumb').should('contain', text.productName);
      })
    });

    it('Verify increase product quantity from the buttons', function() {
      // cy.log(this.data)
      cy.get('form.cart div.quantity span.jcf-btn-dec').should('have.class', 'jcf-disabled');
      cy.get('input[id*=quantity]').should('have.value', 1);
      cy.get('div.single-product-detail p.stock').invoke('text').as('stockCount');
      cy.get('@stockCount').then(text => {
        let stockCount = parseInt(text.replace(/[^0-9]/g, ''));
        cy.log(stockCount);
        cy.get('form.cart div.quantity span.jcf-btn-inc').realHover().wait(1000).should('have.css', 'background-color', 'rgb(245, 140, 13)')
        cy.get('form.cart div.quantity span.jcf-btn-inc').click();
        cy.get('input[id*=quantity]').should('have.value', 2).and('have.attr', 'max', stockCount);
        cy.get('form.cart div.quantity span.jcf-btn-dec').should('not.have.class', 'jcf-disabled');

      })
    });

    it('Verify disable increase button when add stock count', function() {
      cy.get('div.single-product-detail p.stock').invoke('text').as('stockCount');
      cy.get('@stockCount').then(text => {
        let stockCount = parseInt(text.replace(/[^0-9]/g, ''));
        cy.log(stockCount);
        cy.get('form.cart div.quantity span.jcf-btn-inc').realHover().wait(1000).should('have.css', 'background-color', 'rgb(245, 140, 13)')
        cy.get('input[id*=quantity]').clear().type(stockCount - 1);
        cy.get('form.cart div.quantity span.jcf-btn-inc').click();
        cy.get('input[id*=quantity]').should('have.value', stockCount);

        cy.get('form.cart div.quantity span.jcf-btn-inc').should('have.class', 'jcf-disabled');
      })
      cy.get('div.single-product-detail').then( $item => {
        let product = {
          "productName": $item.find('h1.product_title').text(),
          "productPrice": $item.find('bdi').text(),
          "quantity": $item.find('input[id*=quantity]').val()
        }
        cy.task('setProductData', {
          name: 'product',
          value: product,
        })
      })
    });

    it('Verify Change the slider image', () => {
      cy.get('div.single-product-detail div.single-slider-wrapper').then(slider => {
        if(slider.find('div.pagination-slider-wrapper').length) {
          cy.get('div.single-product-detail div.single-slider-wrapper div.pagination-slider-wrapper div[data-slick-index="2"]').click();
          cy.get('div.single-product-detail div.single-slider-wrapper div.pagination-slider-wrapper div[data-slick-index="2"]').should('have.class', 'slick-active');
          cy.get('div.single-product-detail div.slick-list div[data-slick-index="2"').should('have.class', 'slick-active');
        } else { cy.log('No Slides found') }
      })
    })

    it('Verify add the product to the cart', function() {
      cy.get('button[name="add-to-cart"]')
        .realHover()
        .wait(1000)
        .should('have.css', 'background-color', 'rgb(0, 0, 0)')
        .and('have.css', 'color', 'rgb(255, 255, 255)')
        .click();

        cy.task('getProductData', 'product').then((item) => {
          cy.get(`input[id*=${this.data.productID}]`)
            .parents('div.cart-item')
            .find('strong.product-name')
            .invoke('text')
            .should('contain', item.productName);
          cy.get(`input[id*=${this.data.productID}]`).should('have.value', item.quantity);
        });
       
      cy.totalPrice(this.data.currency);
      cy.getCartCount();
      cy.get('span.backdrop-overlay').should('have.css', 'visibility', 'visible');
    });

    it('Verify delete a product from the cart', function() {
      cy.get(`div.cart-item a[data-key="${this.data.removeDataKey}"]`).click();
        // .realHover()
        // .wait(1000)
        // .should('have.css', 'color', 'rgb(245, 140, 13)');
      cy.get(`div.cart-item a[data-key="${this.data.removeDataKey}"]`).should('not.exist');
      cy.totalPrice(this.data.currency);
      cy.get('div.loader-wrap').should('have.css', 'visibility', 'visible');
      cy.get('div.header-mini-cart a.cart-close').click();
      cy.get('div.header-mini-cart').should('not.be.visible');
    });

    it('Verify navigating to home screen', function() {
      cy.get(`header #nav .nav-wrap ul li a[href="${Cypress.config().baseUrl}/"]`).click();
      cy.url().should('equal', Cypress.config().baseUrl+'/');
      cy.get('a[aria-current="page"]')
        .parent()
        .should('have.class', 'current-menu-item')
        .and('contain', this.data.homeTitle);
    })
  })

  after(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  })
})