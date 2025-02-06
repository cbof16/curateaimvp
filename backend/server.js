const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });

const app = express();

const auctionsRouter = require('./routes/auctions');
const artistRoutes = require('./routes/artist');
const pricingRouter = require('./routes/pricing');
const veniceAIRoute = require('./routes/veniceAI');
app.use('/api/auctions', auctionsRouter);
app.use('/api/artists', artistRoutes);
app.use('/api/venice-ai', veniceAIRoute);
app.use('/api/pricing', pricingRouter);


// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Database connection error');
  }
});

const db = require('./config/db');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  const pool = require('./config/db');
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Database connected. Time:', result.rows[0].now);
    }
  });
});
