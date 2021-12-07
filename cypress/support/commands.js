// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-real-events/support";

cy.formatMoney = (number, decPlaces = 2, decSep = '.', thouSep = ',') => {
  decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
  decSep = typeof decSep === "undefined" ? "." : decSep;
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  var j = (j = i.length) > 3 ? j % 3 : 0;

  return sign +
      (j ? i.substr(0, j) + thouSep : "") +
      i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
      (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

Cypress.Commands.add('totalPrice', (currency) => {
  cy.get('div.header-mini-cart').should('be.visible');
  cy.get('div.header-mini-cart div.cart-item').then(item => {
    let total = 0;

    for(let i = 0; i < item.length; i++) {
      let singleItemQty = item.find('input.cart_qty')[i].value;
      let singleItemPrice = item.find('bdi')[i].textContent;
      cy.log(singleItemQty, singleItemPrice)
      total += (parseFloat(singleItemPrice.substr(1).trim().replace(/,/g, '')) * parseFloat(singleItemQty));
    }
    cy.get('span.sub-total-amount').should('have.text', `${currency + cy.formatMoney(total + 30)}`)
  })
})

Cypress.Commands.add('getCartCount', () => {
  cy.get('div.heder-action-nav a.btn-cart span.counter').invoke('text').as('cartCount');
  cy.get('div.header-mini-cart div.mini-cart-body').then(item => {
    let cartItem = item.find('div.cart-item').length;
    let counter = 0;
    if(cartItem) {
      cy.get('div.header-mini-cart div.cart-item').then(item => {      
        for(let i = 0; i < item.length; i++) {
          counter += parseInt(item.find('input.cart_qty')[i].value);
        }
      })
    }
    cy.get('@cartCount').then(text => {
      expect(parseInt(text)).to.equal(counter);
    });
  });
})

Cypress.Commands.overwrite("clearCookies", () => {
  cy.getCookies().then(cookies => {
      for (const cookie of cookies) {
          cy.clearCookie(cookie.name)
      }
  })
})

Cypress.Commands.add('afterBeforeSelector', (sel, pseudo) => {
  let backColor = window.getComputedStyle(
    document.querySelector(`${sel}`), `:${pseudo}`
  ).getPropertyValue('background-color');

  cy.get(sel).then(el => {
    expect(document.querySelector(el), `:${sel}`).to.have.css('background-color', backColor);
  })
})