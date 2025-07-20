-- Location: supabase/migrations/20250713084218_auth_and_coins.sql
-- Authentication and Coin Collection System

-- 1. Custom Types
CREATE TYPE public.user_role AS ENUM ('admin', 'collector', 'viewer');
CREATE TYPE public.coin_condition AS ENUM ('poor', 'fair', 'good', 'very_fine', 'extremely_fine', 'uncirculated');
CREATE TYPE public.coin_category AS ENUM ('special', 'modern', 'historical', 'commemorative', 'foreign');

-- 2. User Profiles Table (PostgREST compatibility)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE,
    role public.user_role DEFAULT 'collector'::public.user_role,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Coin Collections Table
CREATE TABLE public.coin_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Coins Table
CREATE TABLE public.coins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    collection_id UUID REFERENCES public.coin_collections(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    denomination TEXT NOT NULL,
    year INTEGER NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    mint_mark TEXT,
    condition public.coin_condition DEFAULT 'good'::public.coin_condition,
    category public.coin_category DEFAULT 'modern'::public.coin_category,
    rarity_score INTEGER DEFAULT 1 CHECK (rarity_score >= 1 AND rarity_score <= 10),
    estimated_value_min DECIMAL(10,2),
    estimated_value_max DECIMAL(10,2),
    currency TEXT DEFAULT 'INR',
    acquisition_date DATE,
    acquisition_price DECIMAL(10,2),
    front_image_url TEXT,
    back_image_url TEXT,
    notes TEXT,
    tags TEXT[],
    is_special BOOLEAN DEFAULT false,
    is_for_sale BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX idx_coin_collections_user_id ON public.coin_collections(user_id);
CREATE INDEX idx_coins_user_id ON public.coins(user_id);
CREATE INDEX idx_coins_collection_id ON public.coins(collection_id);
CREATE INDEX idx_coins_category ON public.coins(category);
CREATE INDEX idx_coins_year ON public.coins(year);
CREATE INDEX idx_coins_country ON public.coins(country);
CREATE INDEX idx_coins_is_special ON public.coins(is_special);
CREATE INDEX idx_coins_created_at ON public.coins(created_at);

-- 6. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coin_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coins ENABLE ROW LEVEL SECURITY;

-- 7. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.owns_collection(collection_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.coin_collections cc
    WHERE cc.id = collection_uuid AND cc.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_collection(collection_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.coin_collections cc
    WHERE cc.id = collection_uuid AND (
        cc.user_id = auth.uid() OR 
        cc.is_public = true OR
        public.is_admin()
    )
)
$$;

CREATE OR REPLACE FUNCTION public.owns_coin(coin_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.coins c
    WHERE c.id = coin_uuid AND c.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_coin(coin_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.coins c
    WHERE c.id = coin_uuid AND (
        c.user_id = auth.uid() OR 
        c.is_public = true OR
        public.is_admin()
    )
)
$$;

-- 8. User Profile Auto-Creation Function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, username, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'collector'::public.user_role)
    );
    
    -- Create default collection for new user
    INSERT INTO public.coin_collections (user_id, name, description)
    VALUES (NEW.id, 'My Collection', 'Default coin collection');
    
    RETURN NEW;
END;
$$;

-- 9. Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Updated Timestamp Function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 11. Updated Timestamp Triggers
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coin_collections_updated_at
    BEFORE UPDATE ON public.coin_collections
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_coins_updated_at
    BEFORE UPDATE ON public.coins
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 12. RLS Policies for User Profiles
CREATE POLICY "users_view_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "public_view_profiles"
ON public.user_profiles
FOR SELECT
TO public
USING (true);

-- 13. RLS Policies for Collections
CREATE POLICY "users_crud_own_collections"
ON public.coin_collections
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "public_view_collections"
ON public.coin_collections
FOR SELECT
TO authenticated
USING (public.can_access_collection(id));

-- 14. RLS Policies for Coins
CREATE POLICY "users_crud_own_coins"
ON public.coins
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "public_view_coins"
ON public.coins
FOR SELECT
TO authenticated
USING (public.can_access_coin(id));

-- 15. Mock Data for Testing
DO $$
DECLARE
    collector1_uuid UUID := gen_random_uuid();
    collector2_uuid UUID := gen_random_uuid();
    collection1_uuid UUID := gen_random_uuid();
    collection2_uuid UUID := gen_random_uuid();
BEGIN
    -- Create test auth users
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (collector1_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'collector@rarerupees.com', crypt('collect123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Rajesh Kumar", "username": "rajesh_collector"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (collector2_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'priya@rarerupees.com', crypt('collect456', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Priya Sharma", "username": "priya_coins"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Collections are auto-created by trigger, get their IDs
    SELECT id INTO collection1_uuid FROM public.coin_collections WHERE user_id = collector1_uuid LIMIT 1;
    SELECT id INTO collection2_uuid FROM public.coin_collections WHERE user_id = collector2_uuid LIMIT 1;

    -- Create additional specialized collections
    INSERT INTO public.coin_collections (id, user_id, name, description, is_public) VALUES
        (gen_random_uuid(), collector1_uuid, 'Rare Historical Coins', 'Pre-independence and special historical coins', true),
        (gen_random_uuid(), collector2_uuid, 'Modern Commemoratives', 'Post-2000 commemorative coin collection', false);

    -- Create sample coins
    INSERT INTO public.coins (
        user_id, collection_id, name, denomination, year, country, mint_mark,
        condition, category, rarity_score, estimated_value_min, estimated_value_max,
        acquisition_date, front_image_url, back_image_url, notes, tags, is_special, is_public
    ) VALUES
        (collector1_uuid, collection1_uuid, '1947 Indian One Rupee', '₹1', 1947, 'India', 'B',
         'very_fine'::public.coin_condition, 'historical'::public.coin_category, 8, 2000.00, 3000.00,
         '2024-07-10', 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400',
         'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400',
         'First year of independence. Excellent condition with clear mint marks.',
         ARRAY['independence', 'historical', 'rare'], true, true),
        
        (collector1_uuid, collection1_uuid, '2019 New ₹20 Coin', '₹20', 2019, 'India', null,
         'uncirculated'::public.coin_condition, 'modern'::public.coin_category, 3, 20.00, 30.00,
         '2024-07-08', 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?w=400',
         'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?w=400',
         'Fresh mint condition. Part of modern circulation series.',
         ARRAY['modern', 'circulation'], false, false),
        
        (collector1_uuid, collection1_uuid, '1950 Two Annas', '2 Annas', 1950, 'India', 'C',
         'good'::public.coin_condition, 'historical'::public.coin_category, 7, 120.00, 180.00,
         '2024-07-05', 'https://images.pixabay.com/photo-2016/12/06/18/27/coins-1887414_1280.jpg?w=400',
         'https://images.pixabay.com/photo-2016/12/06/18/27/coins-1887414_1280.jpg?w=400',
         'Early republic period coin. Nice patina and readable details.',
         ARRAY['republic', 'annas', 'vintage'], true, true),
         
        (collector2_uuid, collection2_uuid, '2011 ₹5 Coin', '₹5', 2011, 'India', null,
         'very_fine'::public.coin_condition, 'modern'::public.coin_category, 2, 5.00, 10.00,
         '2024-07-03', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
         'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
         'Standard circulation coin in good condition.',
         ARRAY['modern', 'circulation', 'common'], false, false),
         
        (collector2_uuid, collection2_uuid, '2016 ₹2 Coin', '₹2', 2016, 'India', null,
         'extremely_fine'::public.coin_condition, 'modern'::public.coin_category, 2, 2.00, 4.00,
         '2024-07-01', 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?w=400',
         'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?w=400',
         'Recently acquired. Minimal wear and excellent details.',
         ARRAY['modern', 'recent'], false, false),
         
        (collector2_uuid, collection2_uuid, '2018 ₹1 Coin', '₹1', 2018, 'India', null,
         'uncirculated'::public.coin_condition, 'modern'::public.coin_category, 1, 1.00, 2.00,
         '2024-06-28', 'https://images.pixabay.com/photo/2017/08/30/07/56/money-2696229_1280.jpg?w=400',
         'https://images.pixabay.com/photo/2017/08/30/07/56/money-2696229_1280.jpg?w=400',
         'Fresh from bank roll. Perfect mint state.',
         ARRAY['modern', 'mint-state'], false, false);
         
END $$;

-- 16. Cleanup Function for Testing
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    test_user_ids UUID[];
BEGIN
    -- Get test user IDs
    SELECT ARRAY_AGG(id) INTO test_user_ids
    FROM auth.users
    WHERE email LIKE '%@rarerupees.com';

    -- Delete in dependency order
    DELETE FROM public.coins WHERE user_id = ANY(test_user_ids);
    DELETE FROM public.coin_collections WHERE user_id = ANY(test_user_ids);
    DELETE FROM public.user_profiles WHERE id = ANY(test_user_ids);
    DELETE FROM auth.users WHERE id = ANY(test_user_ids);
    
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;

COMMENT ON TABLE public.user_profiles IS 'User profiles for coin collectors and enthusiasts';
COMMENT ON TABLE public.coin_collections IS 'Organized collections of coins owned by users';
COMMENT ON TABLE public.coins IS 'Individual coin records with detailed metadata and images';