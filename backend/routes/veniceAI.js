const express = require('express');
const router = express.Router();
const { fetchAIArt } = require('../services/veniceAIService');
const { saveArtToDatabase } = require('../services/artworkService');

router.get('/image/generate', async (req, res) => {
  try {
    const prompt = req.query.prompt;
    const artData = await fetchAIArt(prompt);
    await saveArtToDatabase(artData);
    res.json(artData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate AI art' });
  }
});

module.exports = router;
