import axios, { AxiosError } from 'axios';
import { VeniceArtwork } from '../types/venice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchTrendingArtworks = async (): Promise<VeniceArtwork[]> => {
  try {
    const response = await axios.get(`${API_URL}/venice-ai/trending`);
    return response.data;
  } catch (error) {
    // Convert the error to a string message
    const message = error instanceof AxiosError 
      ? error.response?.data?.error || error.message
      : 'An unexpected error occurred';
    throw new Error(message);
  }
};