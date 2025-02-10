const express = require('express');
const router = express.Router();
const { Client } = require('pg');
require('dotenv').config();

const dbClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

dbClient.connect();

router.get('/rank', async (req, res) => {
  const query = 'SELECT * FROM artists ORDER BY rank ASC';
  const result = await dbClient.query(query);
  console.log(result.rows);
  res.json(result.rows);
});

module.exports = router;
