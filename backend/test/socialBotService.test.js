const { generatePromoMessage, postTweet } = require('../services/socialBotService');

describe('Social Bot Service', () => {
  beforeEach(() => {
    // Clear Twitter API credentials to simulate missing credentials scenario
    delete process.env.TWITTER_API_KEY;
    delete process.env.TWITTER_API_SECRET;
    delete process.env.TWITTER_ACCESS_TOKEN;
    delete process.env.TWITTER_ACCESS_SECRET;
  });

  test('generatePromoMessage creates correct promotional message', () => {
    const auction = { artworkName: 'Sunset', artist: 'Alice', price: 2.5 };
    const message = generatePromoMessage(auction);
    expect(message).toBe('🎨 New Auction: Sunset by Alice - starting at 2.5 ETH. Bid now! #NFTAuction #AIArt');
  });

  test('postTweet simulates tweet posting when credentials are missing', async () => {
    const message = 'Test tweet';
    const response = await postTweet(message);
    expect(response).toHaveProperty('id');
    expect(response.text).toBe(message);
  });

  test('postTweet retries and eventually succeeds', async () => {
    // Override Math.random to simulate failures on the first two attempts, then success.
    let callCount = 0;
    const originalRandom = Math.random;
    Math.random = () => {
      callCount++;
      return callCount < 3 ? 0.1 : 0.5;
    };

    const message = 'Retry tweet test';
    const response = await postTweet(message);
    expect(callCount).toBeGreaterThanOrEqual(3);
    expect(response.text).toBe(message);

    // Restore original Math.random
    Math.random = originalRandom;
  });
});
