const { expect } = require('@wdio/globals')
const utilities = require('../utilities/utilities');
const config = require('../config/config');

  const {
    RegistrationUtility,
    LoginUtility
  } = utilities;

  const { FirstName, LastName, Email, Password, ConfirmPassword } = config.credentials;

describe('Positive Registarion and Login test ', () => {

    it('should allow the user to create a new account', async () => {

        await RegistrationUtility.registerUser(FirstName, LastName, Email, Password, ConfirmPassword);
    })

    it('should allow the user log into valid account', async () => {

        await LoginUtility.loginUser(Email, Password)
    })

})