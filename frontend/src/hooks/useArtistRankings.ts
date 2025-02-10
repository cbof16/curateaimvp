import { useState, useEffect } from 'react';
import { Artist } from '../types/artist';
import { fetchTopArtists } from '../services/artistService';

export const useArtistRankings = (limit = 10) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        setLoading(true);
        const data = await fetchTopArtists(limit);
        setArtists(data);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load artists';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, [limit]);

  return { artists, loading, error };
};