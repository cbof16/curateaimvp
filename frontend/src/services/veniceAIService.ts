import axios from 'axios';

const generateAIArt = async (prompt: string) => {
  try {
    const response = await axios.get(`/api/venice-ai/image/generate?prompt=${encodeURIComponent(prompt)}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error === 'Insufficient VCU balance. Please top up your VCU balance to generate AI art.') {
      throw new Error('Insufficient VCU balance. Please top up your VCU balance to generate AI art.');
    }
    throw new Error('Failed to generate AI art');
  }
};

export { generateAIArt };
