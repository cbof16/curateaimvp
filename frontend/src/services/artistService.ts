import { createClient } from '@supabase/supabase-js';
import { Artist, ArtistMetrics } from '../types/artist';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchTopArtists = async (limit = 10): Promise<Artist[]> => {
  try {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .order('rank', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching top artists:', error);
    throw error;
  }
};

export const fetchArtistMetrics = async (artistId: string): Promise<ArtistMetrics[]> => {
  try {
    const { data, error } = await supabase
      .from('artist_metrics')
      .select('*')
      .eq('artist_id', artistId)
      .order('recorded_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching artist metrics:', error);
    throw error;
  }
};