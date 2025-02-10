// Required modules
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

// Initialize OAuth 1.0a client with credentials from environment variables
const oauth = OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

// Token using access credentials from environment variables
const token = {
  key: process.env.TWITTER_ACCESS_TOKEN,
  secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

/**
 * Posts a tweet using Twitter's API.
 * @param {string} status - Text content of the tweet.
 * @returns {Promise<object>} - The response from Twitter.
 */
async function createTweet(status) {
  const url = 'https://api.twitter.com/1.1/statuses/update.json';

  // Prepare OAuth request data
  const request_data = {
    url: url,
    method: 'POST',
    data: { status },
  };

  // Generate OAuth header
  const headers = oauth.toHeader(oauth.authorize(request_data, token));
  headers['Content-Type'] = 'application/x-www-form-urlencoded';

  try {
    const params = new URLSearchParams();
    params.append('status', status);
    const response = await axios.post(url, params, { headers });
    console.log("Tweet posted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting tweet:", error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = { createTweet };

// Environment variable check using variable names
if (require.main === module) {
  const requiredEnv = [
    'TWITTER_CONSUMER_KEY',
    'TWITTER_CONSUMER_SECRET',
    'TWITTER_ACCESS_TOKEN',
    'TWITTER_ACCESS_TOKEN_SECRET'
  ];
  const missingEnv = requiredEnv.filter(key => !process.env[key]);
  if (missingEnv.length > 0) {
    console.error('Missing environment variables: ' + missingEnv.join(', '));
    process.exit(1);
  }
  const status = process.argv[2] || 'Hello from createTweet!';
  createTweet(status)
    .then(data => console.log('Test tweet posted:', data))
    .catch(error => console.error('Test error:', error));
}
