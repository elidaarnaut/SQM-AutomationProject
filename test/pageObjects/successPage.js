const { $ } = require('@wdio/globals')
const Page = require('./page');

class SuccessPage extends Page {

    open () {
        return super.open('');
    }

    get successfulPurchaseMessage() {
        return $('.base');
    }
}

module.exports = new SuccessPage();