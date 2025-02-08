/**
 * @swagger
 * /image/generate:
 *   get:
 *     summary: Generate AI art based on a prompt
 *     parameters:
 *       - in: query
 *         name: prompt
 *         schema:
 *           type: string
 *         required: true
 *         description: The prompt to generate AI art
 *     responses:
 *       200:
 *         description: Successfully generated AI art
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 artData:
 *                   type: object
 *                   description: The generated AI art data
 *       500:
 *         description: Failed to generate AI art
 */
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
