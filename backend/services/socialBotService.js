const Twitter = require('twitter');
require('dotenv').config();
const fs = require('fs');

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const generatePromotionalMessage = (artworkName, artist, price) => {
  return `🎨 New Auction: ${artworkName} by ${artist} - starting at ${price} ETH. Bid now! #NFTAuction #AIArt`;
};

const postTweet = async (message, retries = 3) => {
  try {
    const response = await client.post('statuses/update', { status: message });
    console.log('Tweet posted:', response);
    logResponse(response);
  } catch (error) {
    console.error('Error posting tweet:', error);
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await postTweet(message, retries - 1);
    }
  }
};

const logResponse = (response) => {
  const logEntry = `${new Date().toISOString()} - ${JSON.stringify(response)}\n`;
  fs.appendFile('social_engagement.log', logEntry, (err) => {
    if (err) {
      console.error('Error logging response:', err);
    } else {
      console.log('Response logged successfully');
    }
  });
};

module.exports = {
  generatePromotionalMessage,
  postTweet,
};
