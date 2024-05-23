const { $ } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page {

    open () {
        return super.open('');
    }

    get registrationLink () {
        return $x('/page-wrapper/page-header/panel wrapper/panel header/header links/li[2]');
    }

    async registration(){
        await this.registrationLink.click();
    }

    get signUpLink() {
        return $('.authorization-link');
    }

    get welcomeMessage() {
        return $('.logged-in');
    }

    get productList() {
        return $$('.product-item');
    }

     productAtIndex (index) {
        return this.productList[index];
    }

    get searchBar() {
        return $('#search');
    }

    get searchBtn() {
        return $('.action.search');
    }
}
module.exports = new HomePage();