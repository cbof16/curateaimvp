export interface Artist {
  id: string;
  name: string;
  twitterHandle?: string;
  discordId?: string;
  engagementScore: number;
  hypeScore: number;
  rank: number;
  artworkUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ArtistMetrics {
  id: string;
  artistId: string;
  twitterFollowers: number;
  twitterMentions: number;
  discordMentions: number;
  sentimentScore: number;
  recordedAt: string;
}