const { promoteAuction } = require('./services/socialBotService');

const auction = {
  title: 'Amazing Artwork',
  description: 'A beautiful piece of art.',
  url: 'http://thecurateai.vercel.app/auction',
  endTime: '2025-12-31T23:59:59Z',
};

promoteAuction(auction);
