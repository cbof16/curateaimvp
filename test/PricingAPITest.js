const request = require('supertest');
const app = require('../backend/server');

describe('GET /api/predict-price', () => {
  it('should return a predicted price for a valid artist_id', async () => {
    const response = await request(app).get('/api/predict-price?artist_id=1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('predictedPrice');
    expect(response.body.predictedPrice).toBeGreaterThan(0);
  });

  it('should return an error for missing artist_id', async () => {
    const response = await request(app).get('/api/predict-price');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
