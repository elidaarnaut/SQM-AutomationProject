const { expect } = require('@wdio/globals');
const LoginPage = require('../pageObjects/loginPage');
const SearchPage = require('../pageObjects/searchPage');

class SecurityUtility {
    async attemptSQLInjection() {
        await LoginPage.open();
        await LoginPage.login("admin' OR '1'='1", "password' OR '1'='1");
        await LoginPage.signInBtn.click();
        const errorMessage = await LoginPage.emailErrorMessage.getText();
        expect(errorMessage).not.toContain('SQL syntax'); 
    }

    async attemptXSS() {
        await SearchPage.open();
        const searchField = await SearchPage.searchField;
        await searchField.setValue("<script>alert('XSS');</script>");
        await SearchPage.searchButton.click();
        try {
            const alertText = await browser.getAlertText();
            expect(alertText).toBe(null); 

            
            if (alertText) {
                await browser.acceptAlert();
            }
        } 
        catch (error) {
            
        }
    }
}

module.exports = new SecurityUtility();
