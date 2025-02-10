const { requestToken } = require('../services/oauthService');

async function testRequestToken() {
  try {
    const tokenData = await requestToken();
    console.log('Received OAuth Request Token:', tokenData);
  } catch (error) {
    console.error('Error requesting OAuth token:', error);
  }
}

testRequestToken();
