const axios = require('axios');
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const { URL } = require('url');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const fetchTrendingTweets = async () => {
  try {
    const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
      headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
      },
      params: {
        'query': '#NFTArtist OR #EmergingArtist OR #AIArt',
        'tweet.fields': 'author_id,public_metrics',
        'expansions': 'author_id',
        'user.fields': 'username,profile_image_url,public_metrics'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    throw error;
  }
};

const calculateHypeScore = (publicMetrics) => {
  const { like_count, retweet_count, reply_count } = publicMetrics;
  return (like_count + retweet_count + reply_count) / 3;
};

const storeArtistData = async (artistData) => {
  const query = `
    INSERT INTO artists (artist_name, social_links, engagement_score, hype_score, rank)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (artist_name) DO UPDATE
    SET social_links = EXCLUDED.social_links,
        engagement_score = EXCLUDED.engagement_score,
        hype_score = EXCLUDED.hype_score,
        rank = EXCLUDED.rank;
  `;

  const values = [
    artistData.username,
    artistData.profile_link,
    artistData.engagement_score,
    artistData.hype_score,
    artistData.rank
  ];

  try {
    await client.query(query, values);
  } catch (error) {
    console.error('Error storing artist data:', error);
    throw error;
  }
};

const scoutArtists = async () => {
  try {
    const tweets = await fetchTrendingTweets();
    const artists = tweets.includes.users.map(user => {
      const hypeScore = calculateHypeScore(user.public_metrics);
      return {
        username: user.username,
        profile_link: `https://twitter.com/${user.username}`,
        engagement_score: user.public_metrics.followers_count,
        hype_score,
        rank: 0 // Placeholder for rank calculation logic
      };
    });

    for (const artist of artists) {
      await storeArtistData(artist);
    }

    console.log('Artist scouting completed successfully.');
  } catch (error) {
    console.error('Error in artist scouting:', error);
  } finally {
    client.end();
  }
};

scoutArtists();
