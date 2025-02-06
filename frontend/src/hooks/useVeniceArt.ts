import { useState, useEffect } from 'react';
import { VeniceArtwork } from '../types/venice';
import { fetchTrendingArtworks } from '../services/veniceService';
import { demoArtworks } from '../data/demoArtworks';

export const useVeniceArt = () => {
  const [artworks, setArtworks] = useState<VeniceArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingArtworks();
        setArtworks(data);
        setError(null);
        setIsUsingDemoData(false);
      } catch (err) {
        // Use demo data for network errors
        const errorMessage = err instanceof Error ? err.message : 'Failed to load artworks';
        setError(errorMessage);
        setArtworks(demoArtworks);
        setIsUsingDemoData(true);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  return { artworks, loading, error, isUsingDemoData };
};