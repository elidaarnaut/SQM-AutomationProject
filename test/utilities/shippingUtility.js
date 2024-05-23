const { expect } = require('@wdio/globals')
const ShippingPage = require('../pageObjects/shippingPage')

class ShippingUtility {

    async inputShippingDetails(streetAddress, city, postalCode, phoneNum) {
        await ShippingPage.InputStreetAddress.setValue(streetAddress);
        await ShippingPage.InputCity.setValue(city);
        await ShippingPage.menuRegion.click();
        await ShippingPage.regionToSelect.click();
        await ShippingPage.InputPostalCode.setValue(postalCode);
        await ShippingPage.InputPhoneNumber.setValue(phoneNum);
        await ShippingPage.checkboxShippingMethod.click();
    }

    async checkShippingDetails(streetAddress, city, postalCode, phoneNum) {
        expect (await ShippingPage.InputStreetAddress.getValue()).toEqual(streetAddress)
        expect (await ShippingPage.InputCity.getValue()).toEqual(city)
        expect (await ShippingPage.InputPostalCode.getValue()).toEqual(postalCode)
        expect (await ShippingPage.InputPhoneNumber.getValue()).toEqual(phoneNum)
        expect (await ShippingPage.checkboxShippingMethod.getAttribute('checked')).toEqual('true')
    }
}

module.exports = new ShippingUtility();