![Cypress.io](https://miro.medium.com/max/7200/1*Jkb_tsMBOvL6wQ8bzldu8Q.png)
# watanimall

[![waleedafifi90 - watanimall](https://img.shields.io/static/v1?label=waleedafifi90&message=watanimall&color=blue&logo=github)](https://github.com/waleedafifi90/watanimall "Go to GitHub repo") [![stars - watanimall](https://img.shields.io/github/stars/waleedafifi90/watanimall?style=social)](https://github.com/waleedafifi90/watanimall) [![License](https://img.shields.io/badge/License-MIT-blue)](#license) ![Coverage](https://img.shields.io/static/v1?label=Coverage&message=94%&color=green&logo=github-actions&logoColor=white)  ![Test Cases](https://img.shields.io/badge/Total_Test-22-blue.svg?style=flat) ![Test Pass - 20](https://img.shields.io/badge/Test_Pass-20-2ea44f) ![Test Fail - 2](https://img.shields.io/badge/Test_Fail-2-A13333)



This repo will allow you to check if the functionallity of the Watanimall working without problems.

Also there some of the assertion to check the style like the hover

## Requirentments
- Node js
- Chrome browser

### Dependencies used
1. [Cypress](https://www.cypress.io/)
2. [Cypress real events](https://github.com/dmtrKovalenko/cypress-real-events)
  
### How to start using this script
```javascript
git clone https://github.com/waleedafifi90/watanimall.git

// Once it finish open it using terminal and do
npm install
```

**To run the cypress runner**
```javascript
npx cypress open
```

to do update on the test file follow the path to find all of the test cases
```
cypress/integration/watanimall-addToCart.spec.js
```

https://user-images.githubusercontent.com/57403758/145365063-a310f42b-63b2-485e-bd67-0aad75a13b49.mp4


### Cypress run test
https://user-images.githubusercontent.com/57403758/145365574-dd021fc7-ed36-4016-b354-90a815aa6a68.mp4

<img width="561" alt="Screen Shot 2021-12-09 at 11 00 10 AM" src="https://user-images.githubusercontent.com/57403758/145365634-9d9d96ce-d7ed-440e-abb0-0ee01939caf5.png">


### Test cases covered by this app
- Navigate to Category page from the navigation bar
- Check the hover style on the Monitor card
- Click on the Monitor card and check the url
- Filter the result based on the Manufacture and the price
- Hover over the first product and check if the button are exsits
- Click on the add to cart from the hover effect and check the total price of the side cart
- Close the side cart
- Click on the second product card and check the redirect to detaild page
- Ckech the name of the product in the details page
- Increase the quantity using the buttons and add the product to cart
- check the cart in the header if had 3 items and then delete one item from the cart

### Updates
- Dynamic assertion for the cart Quantity and the cart item as custom Command
- Get the first element by `data-id` insted of `nth-child` selector
- Check the changes on monitor size once Asus selected
- Check for the changes on the product list once the sort type changed
- Check home screen (page title, active style for current nav item)
- Change category row assertion to check for empty insted of length
- Go back to home page after removing an item from teh cart and check for the url and the active style
- Change the constant variable to fixture
- Get the product 107055 and store it into fixture then check it in the details page
- Check the pagination if it's exists or not when the product count more or less than 45 
- Check add to cart button hover effect
- Remove the item from the cart based on the ket id
- Check add to cart button style in product details page
- Check the slider inside the product page
- Check for category page Breadcrumb, url when filter, and the sort must be on default on page load
- Check for the name of the product that been added to the cart ❌
- Check for the breadcrumb in the product details page ❌
- Check manufacture in details page
- Check the name of the product name, price, and quantity been added to cart from details page
- Check the stock count and compare it with the max value of the quantity

### Cypress Tasks
1. setProductData(item, Value)
2. getProductData(item)

### Bugs
- Price format in the cart changed once the user remove an item
<img width="383" alt="Screen Shot 2021-12-09 at 8 54 10 AM" src="https://user-images.githubusercontent.com/57403758/145349351-5efdd197-b19a-45f8-b4db-5a37699f7f67.png">


### Custom command explanation
```Javascript
/**
 * @path cypress/support/commands.js
 */

/** 
 * @function formatMoney 
 * @var number Should be passed by the user
 * @var decPlaces by default 2
 * @var decSep number will has . separator for decimal
 * @var thouSep to seperate between thousands like 1,000.00
 * 
 * @invoke cy.formatMoney(7784334); => 7,784,334.00
*/

/**
 * @function totalPrice
 * @var currency symbol ($)
 * 
 * @invoke cy.totalPrice($);
 * 
 * This command will loop over the cart and get the quantity value
 * then multiply it with the price then compare it with total price
 * 
*/

/**
 * @function getCartCount
 * @invoke cy.getCartCount();
 * 
 * This command get the counter from the cart count span in the header
 * then it's open the mini cart and loop over the cart item once there 
 * are items it get the values of the item the check the total of the 
 * values with the number in the cart count span
*/
```
