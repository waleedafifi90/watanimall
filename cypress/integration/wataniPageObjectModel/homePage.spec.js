/// <reference types="cypress" />

import {homePage} from '../../pageObjectModel/homePage/page';
import {MiniCartModal} from '../../pageObjectModel/miniCart/page';
import {CategoryPage} from '../../pageObjectModel/categoryPage/page';
import {ProductPage} from '../../pageObjectModel/productPage/page';

describe('Watani add to cart scenario', () => {

  const hPage = new homePage();
  const mCart = new MiniCartModal();
  const catPage = new CategoryPage();
  const prodPage = new ProductPage();

  let url = 'https://watanimall.com/product-category/monitors?orderby=price&_manufacturer=asus';
  const addToCartURL = 'https://watanimall.com/wp-admin/admin-ajax.php';

  before(() => {
    cy.visit('/');
  })

  beforeEach(() => {
    Cypress.Cookies.defaults({
      preserve: (cookie) => {
        return true;
      }
    });
  });

  context('Home page test suite', () => {
    it('Verify home screen after visit the website', () => {
      hPage.tests.checkCurrentURL();
      hPage.tests.checkHomeNavCurrentPage('الرئيسية');
      hPage.tests.checkHomePageTitle('الرئيسية');
    });

    it('Verify the cart is empty', () => {
      mCart.tests.checkMiniCartStyle();
      mCart.actions.openMiniCart();
      cy.getCartCountPOM();
      mCart.actions.closeMiniCart();
    });
  });

  context('All Category suite', () => {
    it('Verify Navigating to All Category Page', () => {
      catPage.actions.navigateToCategoryPage();
      catPage.actions.checkHeadingTitle('جميع الفئات');
      catPage.tests.checkCategoryNavItemStatus();
      catPage.tests.checkCategoryItems();
    });

    it('Navigate to Monitor category and add product from on hover add to cart button', () => {
      catPage.tests.checkSelectingCategoryItem('monitors', 'MONITORS');
      catPage.actions.navigateToCategory('monitors');
      catPage.tests.checkShopTitle('MONITORS');
      catPage.tests.checkBreadCrumb('MONITORS');
    });

    it('Verify filtring the list based on ASUS category', () => {
      catPage.actions.filterByType('manufacturer', 'asus');
      catPage.actions.filterItemCounter('manufacturer', 'asus');
      catPage.tests.checkFilterTypeChecked('manufacturer', 'asus');

      cy.get('@categoryCount').then(ele => {
        catPage.tests.checkProductCounterOnFilter(parseFloat(ele.replace(/[()]/g, "").trim()));
      });
    });

    it('Verify soritng the result price from low to high', () => {
      cy.intercept('POST', url).as('asusRequest');
      catPage.tests.sortSelectTest();
      catPage.actions.sortSelectAction();
      catPage.actions.sortSelectItemAction(4);
      catPage.tests.sortSelectTestDisplayTest('ترتيب حسب: الأدنى سعراً للأعلى');
      cy.wait('@asusRequest');
    });
  });

  context('Add First Product to the cart', () => {
    it('Verify add the product to cart ', () => {
      cy.intercept('POST', addToCartURL).as('addToCart');

      catPage.tests.productPrices().then(ele => {
        const unsortedItems = ele.map((index, el) =>  Cypress.$(el).text().substring(1).trim().replace(/,/g, '')).get();
        const sortedItems = unsortedItems.slice().sort((a, b) => parseFloat(a) - parseFloat(b));
        expect(sortedItems, 'Items are sorted').to.deep.equal(unsortedItems);
      });

      catPage.actions.prpductColumnAction('107056');
      catPage.tests.productButtonsWrapper('107056');
      catPage.actions.addToCartOnHoverButtonAction('107056');
      catPage.tests.addToCartOnHoverButton('107056');
      catPage.actions.addProductToCart('107056');
      cy.wait('@addToCart');
      cy.getCartCountPOM();
      cy.totalPricePOM('₪');
      mCart.actions.closeMiniCart();
      mCart.tests.miniCartVisabilityStatus();
    });
  });

  context('Add second product from product details page', () => {

    it('Verify add the product details for product id: 102566 to fixture', function() {
      catPage.items.productColumnParent('102566').then(ele => {
        cy.writeFile('cypress/fixtures/product.json', {
          'href': `${ele.find('h3.product-name a').attr('href')}`,
          'productName': `${ele.find('h3.product-name a').text()}`,
          'productPrice': `${ele.find('div.product-price bdi').text()}`,
          'dataID': `${ele.find('a.btn-add-cart').attr('data-id')}`,
          'manufacture': `ASUS`
        })
      })
    })

    it('Verify navigating to product details page', () => {
      catPage.actions.openProductPage('102566');
      cy.fixture('product').then(text => {
        // prodPage.tests.checkProductBreadCrumb(text.productName);
        prodPage.tests.checkProductPrice(text.productPrice);
        prodPage.tests.checkProductSummary(text.manufacture);
        // prodPage.tests.checkProductTitle(text.productName);
      });
    });

    it('Verify increase product quantity from the buttons', () => {
      prodPage.tests.checkIncreaseDecreaseStatus('dec', true);
      prodPage.actions.invokeQuantityText().as('stockCount');
      cy.get('@stockCount').then(stock => {
        let stockCount = parseInt(stock.replace(/[^0-9]/g, ''));

        prodPage.actions.increaseDecreaseActionHover('inc');
        prodPage.tests.checkIncreaseDecreaseHover('inc');
        prodPage.actions.increaseDecreaseAction('inc');

        prodPage.tests.checkQuantityValue(2, stockCount);
        prodPage.tests.checkIncreaseDecreaseStatus('dec', false);
      })
    });

    it('Verify disable increase button when add stock count', () => {
      prodPage.actions.invokeQuantityText().as('stockCount');
      cy.get('@stockCount').then(stock => {
        let stockCount = parseInt(stock.replace(/[^0-9]/g, ''));

        prodPage.actions.increaseDecreaseActionHover('inc');
        prodPage.tests.checkIncreaseDecreaseHover('inc');
        prodPage.actions.fillQuantityValue(stockCount - 1);
        prodPage.actions.increaseDecreaseAction('inc');

        prodPage.tests.checkQuantityValue(stockCount, stockCount);

        prodPage.tests.checkIncreaseDecreaseStatus('inc', true);
      });
    });

    it('Verify add the product to the cart', function() {
      prodPage.actions.addToCartHover();
      prodPage.tests.addToCartHover();
      prodPage.actions.addToCartClickAction();
      mCart.tests.checkMiniCartOverlay();
      cy.getCartCountPOM();
      cy.totalPricePOM('₪');
      mCart.actions.closeMiniCart();
    });
  })

  after(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  })
})