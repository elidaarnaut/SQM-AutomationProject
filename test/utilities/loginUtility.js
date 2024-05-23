const { expect } = require('@wdio/globals')
const LoginPage = require('../pageObjects/loginPage')
const HomePage = require('../pageObjects/homePage')

class LoginUtility {

    async inputLoginDetails(email, password) {

        await LoginPage.inputEmail.setValue(email);
        await LoginPage.inputPassword.setValue(password);

    }

    async checkLoginDetails(email, password) {

        expect (await LoginPage.inputEmail.getValue()).toEqual(email)
        expect (await LoginPage.inputPassword.getValue()).toEqual(password)

    }

    async loginUser(Email, Password) {

        await LoginPage.open()

        await this.inputLoginDetails(Email, Password)
        await this.checkLoginDetails(Email, Password)

        await expect (LoginPage.signInBtn).toBeExisting()
        await LoginPage.signInBtn.click()

        await expect(HomePage.welcomeMessage).toBeExisting()

    }
}

module.exports = new LoginUtility();