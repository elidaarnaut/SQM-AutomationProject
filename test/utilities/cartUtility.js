const { expect } = require('@wdio/globals')
const ProductPage = require('../pageObjects/productPage')

class CartUtility {

    async inputProductDetails(qty) {

        await ProductPage.sizeBtn.click();
        await ProductPage.colorBtn.click();
        await ProductPage.qtyInputField.setValue(qty);

    }

    async checkProductDetails(qty) {

        expect (await ProductPage.sizeBtn.getAttribute('aria-checked')).toEqual('true')
        expect (await ProductPage.colorBtn.getAttribute('aria-checked')).toEqual('true')
        expect (await ProductPage.qtyInputField.getValue()).toEqual(qty)

    }
}

module.exports = new CartUtility();