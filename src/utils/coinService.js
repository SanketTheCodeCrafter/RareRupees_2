import { supabase } from './supabase';

const coinService = {
  // Get all coins for the current user
  getUserCoins: async (userId, filters = {}) => {
    try {
      let query = supabase
        .from('coins')
        .select(`
          *,
          coin_collections (
            id,
            name
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.category && filters.category !== 'all') {
        if (filters.category === 'special') {
          query = query.eq('is_special', true);
        } else if (filters.category === 'modern') {
          query = query.gte('year', 2000);
        } else {
          query = query.eq('category', filters.category);
        }
      }

      if (filters.searchQuery) {
        query = query.or(`
          name.ilike.%${filters.searchQuery}%,
          denomination.ilike.%${filters.searchQuery}%,
          year.eq.${filters.searchQuery},
          country.ilike.%${filters.searchQuery}%,
          notes.ilike.%${filters.searchQuery}%
        `);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load coins.' };
    }
  },

  // Get single coin by ID
  getCoinById: async (coinId) => {
    try {
      const { data, error } = await supabase
        .from('coins')
        .select(`
          *,
          coin_collections (
            id,
            name
          ),
          user_profiles (
            id,
            full_name,
            username
          )
        `)
        .eq('id', coinId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load coin details.' };
    }
  },

  // Create new coin
  createCoin: async (coinData) => {
    try {
      const { data, error } = await supabase
        .from('coins')
        .insert([coinData])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to create coin.' };
    }
  },

  // Update existing coin
  updateCoin: async (coinId, updates) => {
    try {
      const { data, error } = await supabase
        .from('coins')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', coinId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to update coin.' };
    }
  },

  // Delete coin
  deleteCoin: async (coinId) => {
    try {
      const { error } = await supabase
        .from('coins')
        .delete()
        .eq('id', coinId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to delete coin.' };
    }
  },

  // Get user collections
  getUserCollections: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('coin_collections')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load collections.' };
    }
  },

  // Get coin statistics
  getCoinStats: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('coins')
        .select('id, is_special, created_at')
        .eq('user_id', userId);

      if (error) {
        return { success: false, error: error.message };
      }

      const totalCoins = data?.length || 0;
      const specialCoins = data?.filter(coin => coin.is_special)?.length || 0;
      
      // Calculate recent additions (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentAdditions = data?.filter(coin => {
        return new Date(coin.created_at) >= thirtyDaysAgo;
      })?.length || 0;

      return {
        success: true,
        data: {
          totalCoins,
          specialCoins,
          recentAdditions
        }
      };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load statistics.' };
    }
  }
};

export default coinService;