CREATE TABLE artworks (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER REFERENCES artists(id),
  image_url VARCHAR(255),
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
