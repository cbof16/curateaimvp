const { promoteAuction } = require('../services/socialBotService');
const axios = require('axios');

jest.mock('axios');

describe('promoteAuction', () => {
  it('should post a tweet with auction details', async () => {
    const auction = {
      title: 'Amazing Artwork',
      description: 'A beautiful piece of art.',
      url: 'http://example.com/auction',
      endTime: '2025-12-31T23:59:59Z',
    };

    axios.post.mockResolvedValue({ data: { id: '12345' } });

    await promoteAuction(auction);

    expect(axios.post).toHaveBeenCalledWith(
      'https://api.twitter.com/2/tweets',
      { status: expect.stringContaining('Auction Alert! 🚨') },
      {
        headers: {
          'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
  });

  it('should handle errors when posting a tweet', async () => {
    const auction = {
      title: 'Amazing Artwork',
      description: 'A beautiful piece of art.',
      url: 'http://example.com/auction',
      endTime: '2025-12-31T23:59:59Z',
    };

    axios.post.mockRejectedValue(new Error('Twitter API error'));

    await expect(promoteAuction(auction)).rejects.toThrow('Twitter API error');
  });
});
