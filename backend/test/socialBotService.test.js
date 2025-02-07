const socialBotService = require('../services/socialBotService');

const testGeneratePromotionalMessage = () => {
  const message = socialBotService.generatePromotionalMessage('Test Artwork', 'Test Artist', '2.5');
  console.log('Generated Message:', message);
};

const testPostTweet = async () => {
  const message = 'This is a test tweet from the social bot service.';
  await socialBotService.postTweet(message);
};

const runTests = async () => {
  testGeneratePromotionalMessage();
  await testPostTweet();
};

runTests();
