// Load environment variables from .env file
require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  veniceAiApi: process.env.VENICE_AI_API,
  veniceAiKey: process.env.VENICE_AI_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

module.exports = config;
