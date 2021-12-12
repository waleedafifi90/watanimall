export class homePageItems {
  homePageTitle() {
    return cy.title();
  }

  homeNavItem() {
    return  cy.get('a[aria-current="page"]');
  }
}