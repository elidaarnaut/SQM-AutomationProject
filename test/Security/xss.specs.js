//CROSS-SITE SCRIPING TEST (XSS) :

const { expect } = require('@wdio/globals');
const securityUtility = require('../../utilities/securityUtility'); 

describe('Security Tests - XSS', () => {
    it('check for XSS vulnerability in search', async () => {
        await securityUtility.attemptXSS();
    });
});
