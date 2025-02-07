CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
    artist_name VARCHAR(255) NOT NULL UNIQUE,
  social_links JSON,
  engagement_score FLOAT,
  hype_score FLOAT,
  rank INTEGER
);
