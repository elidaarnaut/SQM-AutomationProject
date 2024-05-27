const { expect } = require('@wdio/globals');
const securityUtility = require('../../utilities/securityUtility');

describe('Security Tests - SQL Injection', () => {
    it('checks for SQL injection vulnerability', async () => {
        await securityUtility.attemptSQLInjection();
    });
});
