-- Location: supabase/migrations/20250713084616_fix_coin_condition_enum.sql
-- Fix coin condition enum value in mock data with existence checks

-- Check if coins table exists before attempting updates
DO $$
BEGIN
    -- Only proceed if the coins table exists
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'coins') THEN
        
        -- Update any coins that have invalid 'fine' condition to use 'good' instead
        UPDATE public.coins 
        SET condition = 'good'::public.coin_condition 
        WHERE condition::text = 'fine';
        
        -- Safety measure: Update any other coins that might have incorrect condition values
        -- This ensures data consistency by fixing any invalid enum values
        UPDATE public.coins 
        SET condition = 'good'::public.coin_condition 
        WHERE condition::text NOT IN ('poor', 'fair', 'good', 'very_fine', 'extremely_fine', 'uncirculated');
        
        RAISE NOTICE 'Coin condition enum values have been fixed successfully';
        
    ELSE
        RAISE NOTICE 'Coins table does not exist yet - skipping condition fixes';
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error fixing coin conditions: %', SQLERRM;
END $$;