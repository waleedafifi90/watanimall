![Cypress.io](https://miro.medium.com/max/7200/1*Jkb_tsMBOvL6wQ8bzldu8Q.png)
# watanimall

[![waleedafifi90 - watanimall](https://img.shields.io/static/v1?label=waleedafifi90&message=watanimall&color=blue&logo=github)](https://github.com/waleedafifi90/watanimall "Go to GitHub repo") [![stars - watanimall](https://img.shields.io/github/stars/waleedafifi90/watanimall?style=social)](https://github.com/waleedafifi90/watanimall) [![License](https://img.shields.io/badge/License-MIT-blue)](#license) ![Coverage](https://img.shields.io/static/v1?label=Coverage&message=90%&color=green&logo=github-actions&logoColor=white)  ![Test Cases](https://img.shields.io/badge/Test-15-blue.svg?style=flat)


This repo will allow you to check if the functionallity of the Watanimall working without problems.

Also there some of the assertion to check the style like the hover

## Requirentments
- Node js
- Cypress
- Chrome browser
  
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




https://user-images.githubusercontent.com/57403758/145275285-325103c4-d0a5-4d9d-a690-d217475e1f57.mp4


### Cypress run test
<img width="584" alt="Screen Shot 2021-12-08 at 9 54 30 PM" src="https://user-images.githubusercontent.com/57403758/145275233-fa9286b9-c33e-4bfb-bec0-d9353011afe5.png">



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


### Bugs
- Price format in the cart changed once the user remove an item