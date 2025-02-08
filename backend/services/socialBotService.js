require('dotenv').config();

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 100;

/**
 * Generates a promotional message for a given auction.
 * @param {Object} auction - Auction details.
 * @param {string} auction.artworkName - Name of the artwork.
 * @param {string} auction.artist - Artist name.
 * @param {number} auction.price - Starting price in ETH.
 * @returns {string} The generated promotional message.
 */
function generatePromoMessage(auction) {
  return `🎨 New Auction: ${auction.artworkName} by ${auction.artist} - starting at ${auction.price} ETH. Bid now! #NFTAuction #AIArt`;
}

/**
 * Posts a tweet via the Twitter API.
 * Implements retry logic in case of failures.
 * @param {string} message - The tweet message to post.
 * @param {number} attempt - The current attempt count.
 * @returns {Promise<Object>} A promise that resolves to an object representing the posted tweet.
 */
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function postTweet(message, attempt = 1) {
  try {
    const tweet = await client.post('statuses/update', { status: message });
    console.log(`PostTweet: Success on attempt ${attempt}.`, tweet);
    return tweet;
  } catch (error) {
    if (attempt < MAX_RETRIES) {
      console.log(`PostTweet: Attempt ${attempt} failed. Retrying...`, error);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return postTweet(message, attempt + 1);
    } else {
      console.error(`PostTweet: Max retries reached. Failed to post tweet.`, error);
      throw error;
    }
  }
}

module.exports = {
  generatePromoMessage,
  postTweet
};
