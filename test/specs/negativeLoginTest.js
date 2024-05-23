const { expect } = require('@wdio/globals')
const pageObjects = require('../pageObjects/pageObjects');
const utilities = require('../utilities/utilities');
const config = require('../config/config');
const commonUtility = require('../utilities/commonUtility');

const { LoginPage } = pageObjects;
const { LoginUtility } = utilities;
const { InvalidEmail, InvalidPassord, Password, Email} = config.credentials;
const { checkIfElementIsExisting, checkIfElementsAreExisting } = commonUtility;

describe('Negative login tests', () => {

    it('should not login with invalid email', async () => {

        await LoginPage.open()
        await LoginUtility.inputLoginDetails(InvalidEmail, Password)
        await LoginPage.checkLoginDetails(InvalidEmail, Password)
        await LoginPage.signInBtn.click()
        await checkIfElementIsExisting(LoginPage.emailErrorMessage)
    })

    it('should not login with invalid password', async () => {

        await LoginPage.open()
        await LoginUtility.inputLoginDetails(Email, InvalidPassord)
        await LoginPage.checkLoginDetails(Email, InvalidPassord)
        await LoginPage.signInBtn.click()
        await checkIfElementIsExisting(LoginPage.signUpErrorMessage)
    })

    it('should not login without all required fields being filled', async () => {

        await LoginPage.open()
        await LoginPage.signInBtn.click()
        await checkIfElementsAreExisting(LoginPage.errorMessages)
    })

})