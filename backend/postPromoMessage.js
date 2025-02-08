const { generatePromoMessage, postTweet } = require('./services/socialBotService');

const auction = {
  artworkName: 'Sunset Overdrive',
  artist: 'Jane Doe',
  price: 2.5
};

const message = generatePromoMessage(auction);

postTweet(message)
  .then(response => {
    console.log('Tweet posted successfully:', response);
  })
  .catch(error => {
    console.error('Failed to post tweet:', error);
  });
