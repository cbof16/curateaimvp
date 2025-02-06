import axios from 'axios';

const createAuction = async (auctionData: any) => {
  const response = await axios.post('/api/auctions/create', auctionData);
  return response.data;
};

const getAuctionDetails = async (auctionId: any) => {
  const response = await axios.get(`/api/auctions/${auctionId}`);
  return response.data;
};

const getCurrentPrice = async (auctionId: any) => {
  const response = await axios.get(`/api/auctions/${auctionId}/price`);
  return response.data.price;
};

const buyAuction = async (auctionId: any, buyerAddress: any) => {
  const response = await axios.post(`/api/auctions/${auctionId}/buy`, { buyerAddress });
  return response.data;
};

const cancelAuction = async (auctionId: any) => {
  const response = await axios.delete(`/api/auctions/${auctionId}/cancel`);
  return response.data;
};

export { createAuction, getAuctionDetails, getCurrentPrice, buyAuction, cancelAuction };
