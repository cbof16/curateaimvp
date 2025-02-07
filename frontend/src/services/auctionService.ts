import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const createAuction = async (auctionData: any) => {
  const response = await axios.post(`${API_BASE_URL}/auctions`, auctionData);
  return response.data;
};

export const getAuctionDetails = async (auctionId: string) => {
  const response = await axios.get(`${API_BASE_URL}/auctions/${auctionId}`);
  return response.data;
};

export const getCurrentPrice = async (auctionId: string) => {
  const response = await axios.get(`${API_BASE_URL}/auctions/${auctionId}/price`);
  return response.data;
};

export const buyAuction = async (auctionId: string, buyerData: any) => {
  const response = await axios.post(`${API_BASE_URL}/auctions/${auctionId}/buy`, buyerData);
  return response.data;
};

export const cancelAuction = async (auctionId: string) => {
  const response = await axios.post(`${API_BASE_URL}/auctions/${auctionId}/cancel`);
  return response.data;
};
