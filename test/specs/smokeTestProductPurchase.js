const { expect } = require('@wdio/globals')
const pageObjects = require('../pageObjects/pageObjects');
const utilities = require('../utilities/utilities');
const config = require('../config/config');
const commonUtility = require('../utilities/commonUtility');

const {
    HomePage,
    LoginPage,
    ProductPage,
    ShippingPage,
    PaymentsPage,
    SuccessPage,
    SearchPage
  } = pageObjects;

  const {
    RegistrationUtility,
    ShippingUtility,
    CartUtility,
  } = utilities;

  const { URLcheck, waitForCounterNumberNotToBeZero } = commonUtility;

  const { Qty, streetAddress, city, postalCode, phoneNum } = config.shippingDetails;
  const { searchValue } = config.searchDetails;
  const { FirstName, LastName, Email, Password, ConfirmPassword } = config.credentials;

describe('My smoke test - product pruchase ', () => {

    beforeAll(async() => {
        await RegistrationUtility.registerUser(FirstName, LastName, Email, Password, ConfirmPassword);
    });

    it('should allow the user log into valid account', async () => {

        await HomePage.open() 
        await URLcheck('https://magento.softwaretestingboard.com/') 

        await expect (HomePage.signUpLink).toBeExisting() 
        await HomePage.signUpLink.click() 

        await URLcheck('https://magento.softwaretestingboard.com/customer/account/login/')

        await LoginPage.login(Email, Password) 
        await LoginPage.checkLoginDetails(Email, Password)

        await expect (LoginPage.signInBtn).toBeExisting()
        await LoginPage.signInBtn.click()
        await expect(HomePage.welcomeMessage).toBeExisting()
    })

    it('should allow the user to search for a product and select a product,', async () => {

        await browser.pause(500)
        await HomePage.searchBar.setValue(searchValue)
        await expect (await HomePage.searchBar.getValue()).toEqual(searchValue)
        await expect (HomePage.searchBtn).toBeExisting()
        await HomePage.searchBtn.click()

        await SearchPage.productAtIndex(0).click()
    })

    it('should allow the user to select product details and add product to cart', async () => {
        await CartUtility.inputProductDetails(Qty)
        await CartUtility.checkProductDetails(Qty)
        await ProductPage.addToCartBtn.click()
        await expect(ProductPage.successMessage).toBeExisting()

        await waitForCounterNumberNotToBeZero(ProductPage.counterNumber)
        
        await ProductPage.cartBtn.click()
        expect (await ProductPage.cartBtn.getAttribute('class')).toEqual('action showcart active')

        await ProductPage.proceedToCheckoutBtn.click()
    })

    it('should allow the user to input shipping details and to finalize the checkout with successful purchase', async () => {
        await browser.pause(6000)
        await URLcheck('https://magento.softwaretestingboard.com/checkout/#shipping') 


        await ShippingPage.open()
        
        await ShippingPage.open()
        await ShippingUtility.inputShippingDetails(streetAddress, city, postalCode, phoneNum)
        await ShippingUtility.checkShippingDetails(streetAddress, city, postalCode, phoneNum)
        await ShippingPage.nextBtn.click()

        await browser.pause(5000)
        await URLcheck('https://magento.softwaretestingboard.com/checkout/#payment') 

        await PaymentsPage.placeOrderBtn.click()

        await browser.pause(5000)

        await expect(SuccessPage.successfulPurchaseMessage).toHaveTextContaining('Thank you for your purchase!')

    })
})
