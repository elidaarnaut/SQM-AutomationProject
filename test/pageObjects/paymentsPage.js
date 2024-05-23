const { $ } = require('@wdio/globals')
const Page = require('./page');

class PaymentsPage extends Page {

    open () {
        return super.open('');
    }

    get placeOrderBtn() {
        return $('.action.primary.checkout');
    }
}
module.exports = new PaymentsPage();