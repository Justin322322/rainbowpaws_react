-- Drop existing triggers first (only if the tables exist)
DO $$ 
BEGIN
    -- Drop trigger from auth.users (this always exists)
    IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    END IF;

    -- Drop triggers and policies only if their tables exist
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_documents') THEN
        DROP TRIGGER IF EXISTS set_business_documents_timestamp ON business_documents;
        DROP POLICY IF EXISTS "Service providers can manage own documents" ON business_documents;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'businesses') THEN
        DROP TRIGGER IF EXISTS set_businesses_timestamp ON businesses;
        DROP POLICY IF EXISTS "Public can view verified businesses" ON businesses;
        DROP POLICY IF EXISTS "Service providers can manage own business" ON businesses;
    END IF;

    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
        DROP TRIGGER IF EXISTS set_profiles_timestamp ON profiles;
        DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
        DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
        DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
    END IF;

    -- Drop storage policies if they exist
    DROP POLICY IF EXISTS "Users can upload their own business documents" ON storage.objects;
    DROP POLICY IF EXISTS "Users can view their own business documents" ON storage.objects;
END $$;

-- Drop existing functions
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS handle_updated_at();

-- Drop existing tables in correct order (child tables first)
DROP TABLE IF EXISTS business_documents;
DROP TABLE IF EXISTS businesses;
DROP TABLE IF EXISTS profiles;

-- Drop existing types
DROP TYPE IF EXISTS user_role;

-- Create storage bucket for business documents
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM storage.buckets WHERE id = 'business-documents'
    ) THEN
        INSERT INTO storage.buckets (id, name)
        VALUES ('business-documents', 'business-documents');
    END IF;
END $$;

-- Create storage policy for business documents
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Users can upload their own business documents'
    ) THEN
        CREATE POLICY "Users can upload their own business documents"
            ON storage.objects FOR INSERT
            WITH CHECK (bucket_id = 'business-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Users can view their own business documents'
    ) THEN
        CREATE POLICY "Users can view their own business documents"
            ON storage.objects FOR SELECT
            USING (bucket_id = 'business-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
    END IF;
END $$;

-- Create an enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'furParent', 'serviceProvider');

-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'furParent',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create businesses table for service providers
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    description TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create business documents table
CREATE TABLE business_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('bir_certificate', 'business_permit', 'government_id')),
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Function to handle timestamp updates
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating timestamps
CREATE TRIGGER set_profiles_timestamp
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_businesses_timestamp
    BEFORE UPDATE ON businesses
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_business_documents_timestamp
    BEFORE UPDATE ON business_documents
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_documents ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Allow trigger to insert profiles"
    ON profiles FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow trigger to select profiles"
    ON profiles FOR SELECT
    USING (true);

-- Businesses policies
CREATE POLICY "Public can view verified businesses"
    ON businesses FOR SELECT
    USING (is_verified = true OR auth.uid() = user_id);

CREATE POLICY "Service providers can manage own business"
    ON businesses FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Business documents policies
CREATE POLICY "Service providers can manage own documents"
    ON business_documents FOR ALL
    USING (EXISTS (
        SELECT 1 FROM businesses
        WHERE businesses.id = business_documents.business_id
        AND businesses.user_id = auth.uid()
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM businesses
        WHERE businesses.id = business_documents.business_id
        AND businesses.user_id = auth.uid()
    ));

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    role_value text;
BEGIN
    -- Log the incoming data
    RAISE LOG 'Creating new user with metadata: %', NEW.raw_user_meta_data;
    
    -- Get the role from metadata and handle case
    role_value := LOWER(COALESCE(NEW.raw_user_meta_data->>'role', 'furparent'));
    RAISE LOG 'Role value after lowercase: %', role_value;
    
    -- Map the role value to the correct enum case
    role_value := 
        CASE role_value
            WHEN 'furparent' THEN 'furParent'
            WHEN 'serviceprovider' THEN 'serviceProvider'
            WHEN 'admin' THEN 'admin'
            ELSE 'furParent' -- Default to furParent if invalid role
        END;
    RAISE LOG 'Final role value: %', role_value;

    -- Insert the new profile with security definer context
    BEGIN
        INSERT INTO profiles (
            id,
            first_name,
            last_name,
            email,
            role
        )
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
            COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
            NEW.email,
            role_value::user_role
        );
    EXCEPTION
        WHEN others THEN
            RAISE LOG 'Error inserting profile: %, SQLSTATE: %', SQLERRM, SQLSTATE;
            RAISE;
    END;

    RETURN NEW;
EXCEPTION
    WHEN others THEN
        RAISE LOG 'Error in handle_new_user: %, SQLSTATE: %', SQLERRM, SQLSTATE;
        RAISE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();
