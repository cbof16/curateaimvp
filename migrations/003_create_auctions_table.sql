CREATE TABLE auctions (
  id SERIAL PRIMARY KEY,
  nft_contract VARCHAR(255),
  token_id VARCHAR(255),
  seller VARCHAR(255),
  start_price FLOAT,
  reserve_price FLOAT
);
