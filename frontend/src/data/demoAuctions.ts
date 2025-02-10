export interface DemoAuction {
  id: string;
  title: string;
  artist: string;
  currentPrice: string;
  startPrice: string;
  reservePrice: string;
  imageUrl: string;
  endTime: string;
  bidCount: number;
  lastBidTime: string;
}

export const demoAuctions: DemoAuction[] = [
  {
    id: '1',
    title: 'Cyberpunk Dreams #137',
    artist: 'NeonDreamer',
    currentPrice: '8.5 AVAX',
    startPrice: '12 AVAX',
    reservePrice: '5 AVAX',
    imageUrl: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&q=80',
    endTime: '2025-03-01T15:00:00Z',
    bidCount: 7,
    lastBidTime: '2025-02-28T10:30:00Z'
  },
  {
    id: '2',
    title: 'Neon Cityscape #42',
    artist: 'CyberMuse',
    currentPrice: '5.0 AVAX',
    startPrice: '8 AVAX',
    reservePrice: '3 AVAX',
    imageUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80',
    endTime: '2025-03-02T18:00:00Z',
    bidCount: 5,
    lastBidTime: '2025-02-28T12:15:00Z'
  },
  {
    id: '3',
    title: 'Digital Dystopia #89',
    artist: 'PixelProphet',
    currentPrice: '3.8 AVAX',
    startPrice: '6 AVAX',
    reservePrice: '2 AVAX',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80',
    endTime: '2025-03-03T20:00:00Z',
    bidCount: 3,
    lastBidTime: '2025-02-28T14:45:00Z'
  },
  {
    id: '4',
    title: 'Synthetic Reality #21',
    artist: 'VirtualVanguard',
    currentPrice: '6.2 AVAX',
    startPrice: '10 AVAX',
    reservePrice: '4 AVAX',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80',
    endTime: '2025-03-04T22:00:00Z',
    bidCount: 4,
    lastBidTime: '2025-02-28T16:20:00Z'
  }
];