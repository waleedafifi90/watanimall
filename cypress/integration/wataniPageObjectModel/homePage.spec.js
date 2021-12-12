/// <reference types="cypress" />

import {homePage} from '../../pageObjectModel/homePage/page';
import {MiniCartModal} from '../../pageObjectModel/miniCart/page';
import {CategoryPage} from '../../pageObjectModel/categoryPage/page';

describe('Watani add to cart scenario', () => {

  const hPage = new homePage();
  const mCart = new MiniCartModal();
  const catPage = new CategoryPage();

  let url = 'https://watanimall.com/product-category/monitors?orderby=price&_manufacturer=asus';


  before(() => {
    cy.visit('/');
  })

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
      catPage.tests.productPrices().then(ele => {
        const unsortedItems = ele.map((index, el) =>  Cypress.$(el).text().substring(1).trim().replace(/,/g, '')).get();
        const sortedItems = unsortedItems.slice().sort((a, b) => parseFloat(a) - parseFloat(b));
        expect(sortedItems, 'Items are sorted').to.deep.equal(unsortedItems);
      });

      catPage.actions.prpductColumnAction();
      catPage.tests.productButtonsWrapper();
    });
  })
})