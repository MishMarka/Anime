-- Create users table for user accounts
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    username TEXT NOT NULL,
    avatar_url TEXT,
    language_preference TEXT NOT NULL DEFAULT 'en'
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON users(email);