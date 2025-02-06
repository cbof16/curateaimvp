const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const VENICE_AI_API = process.env.VENICE_AI_API;
const VENICE_AI_KEY = process.env.VENICE_AI_KEY;

const fetchAIArt = async (prompt) => {
  try {
    console.log('Requesting AI art with prompt:', prompt);
    const response = await axios.post(`${VENICE_AI_API}/image/generate`, {
      model: "default",
      prompt: prompt,
      width: 1024,
      height: 1024,
      steps: 30,
      hide_watermark: false,
      return_binary: false,
      seed: 123,
      cfg_scale: 7,
      style_preset: "3D Model",
      negative_prompt: "",
      safe_mode: false
    }, {
      headers: {
        'Authorization': `Bearer ${VENICE_AI_KEY}`
      }
    });

    console.log('Received response:', response.data);
    const { image_url, title, timestamp } = response.data;
    return { image_url, title, timestamp };
  } catch (error) {
    console.error('Error fetching AI art:', error.message);
    if (error.response && error.response.data && error.response.data.message === 'Insufficient VCU balance') {
      throw new Error('Insufficient VCU balance. Please top up your VCU balance to generate AI art.');
    }
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch AI art');
  }
};

module.exports = { fetchAIArt };
