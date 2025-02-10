import { API_BASE_URL } from '../config/api';

export async function fetchAuctions(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/auctions`);
    if (!response.ok) {
      throw new Error('Failed to fetch auctions');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error;
  }
}
