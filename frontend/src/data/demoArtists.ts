export interface DemoArtist {
  id: string;
  name: string;
  imageUrl: string;
  hypeScore: number;
  twitterHandle: string;
  instagramHandle: string;
  engagementScore: number;
  rank: number;
}

export const demoArtists: DemoArtist[] = [
  {
    id: '1',
    name: 'NeonDreamer',
    imageUrl: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&q=80',
    hypeScore: 98,
    twitterHandle: '@neondreamer',
    instagramHandle: '@neondreamer.art',
    engagementScore: 15,
    rank: 1
  },
  {
    id: '2',
    name: 'CyberMuse',
    imageUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80',
    hypeScore: 95,
    twitterHandle: '@cybermuse',
    instagramHandle: '@cybermuse.nft',
    engagementScore: 12,
    rank: 2
  },
  {
    id: '3',
    name: 'PixelProphet',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80',
    hypeScore: 92,
    twitterHandle: '@pixelprophet',
    instagramHandle: '@pixelprophet.art',
    engagementScore: 8,
    rank: 3
  },
  {
    id: '4',
    name: 'VirtualVanguard',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80',
    hypeScore: 89,
    twitterHandle: '@virtualvanguard',
    instagramHandle: '@virtualvanguard.nft',
    engagementScore: 5,
    rank: 4
  },
  {
    id: '5',
    name: 'DigitalDreams',
    imageUrl: 'https://images.unsplash.com/photo-1633186710895-309db2eca9e4?auto=format&fit=crop&q=80',
    hypeScore: 87,
    twitterHandle: '@digitaldreams',
    instagramHandle: '@digitaldreams.art',
    engagementScore: 3,
    rank: 5
  },
  {
    id: '6',
    name: 'SynthSage',
    imageUrl: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&q=80',
    hypeScore: 85,
    twitterHandle: '@synthsage',
    instagramHandle: '@synthsage.nft',
    engagementScore: 2,
    rank: 6
  }
];