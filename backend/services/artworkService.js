const { Artwork } = require('../models'); // Adjust the path as necessary

const saveArtToDatabase = async (artData) => {
  try {
    await Artwork.create(artData);
  } catch (error) {
    console.error('Error saving art to database:', error);
    throw error;
  }
};

module.exports = { saveArtToDatabase };
