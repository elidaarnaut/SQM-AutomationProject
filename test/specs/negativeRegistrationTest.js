const { expect } = require('@wdio/globals')
const pageObjects = require('../pageObjects/pageObjects');
const utilities = require('../utilities/utilities');
const config = require('../config/config');
const commonUtility = require('../utilities/commonUtility');

const { RegistrationPage } = pageObjects;
const { RegistrationUtility } = utilities;
const { FirstName, LastName, Email, Password, ConfirmPassword, InvalidEmail, InvalidPassord, ConfirmInvalidPassword} = config.credentials;
const { checkIfElementIsExisting, checkIfElementsAreExisting } = commonUtility;


describe('Negative registration tests', () => {

    it('should not create an account with used email', async () => {

        await RegistrationUtility.inputRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword)
        await RegistrationUtility.checkRegistrationDetails(FirstName, LastName, Email, Password, ConfirmPassword)
        await RegistrationPage.btnSubmit.click() 
        await checkIfElementIsExisting(RegistrationPage.message)
    })

    it('should not create an account with an invalid email', async () => {

        await RegistrationUtility.inputRegistrationDetails(FirstName, LastName, InvalidEmail, Password, ConfirmPassword)
        await RegistrationUtility.checkRegistrationDetails(FirstName, LastName, InvalidEmail, Password, ConfirmPassword)
        await RegistrationPage.btnSubmit.click() 
        await checkIfElementIsExisting(RegistrationPage.emailErrorMessage)
    })

    it('should not create an account with an invalid password', async () => {

        await RegistrationUtility.inputRegistrationDetails(FirstName, LastName, Email, InvalidPassord, ConfirmInvalidPassword)
        await RegistrationUtility.checkRegistrationDetails(FirstName, LastName, Email, InvalidPassord, ConfirmInvalidPassword)
        await RegistrationPage.btnSubmit.click() 
        await checkIfElementIsExisting(RegistrationPage.passwordErrorMessage)
    })

    it('should not create an account without all requred fileds being filled', async () => {

        await RegistrationPage.open()
        await RegistrationPage.btnSubmit.click() 
        await checkIfElementsAreExisting(RegistrationPage.errorMessages)
    })

})