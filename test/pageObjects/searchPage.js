const { $ } = require('@wdio/globals')
const Page = require('./page');

class SearchPage extends Page {

    open () {
        return super.open('');
    }

    get productList() {
        return $$('.item.product.product-item');
    }

     productAtIndex (index) {
        return this.productList[index];
    }  
}
module.exports = new SearchPage();