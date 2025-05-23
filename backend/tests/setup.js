// Setup file for Jest tests

// Mock environment variables before any imports
process.env.SUPABASE_URL = 'https://test-project.supabase.co';
process.env.SUPABASE_KEY = 'test-key-123456789';
process.env.PORT = '3001'; // Use a different port for tests

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => {
  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com',
    created_at: '2023-01-01T00:00:00.000Z',
    email_confirmed_at: '2023-01-01T00:00:00.000Z'
  };

  const mockSession = {
    access_token: 'test-access-token',
    refresh_token: 'test-refresh-token',
    expires_at: 9999999999
  };

  return {
    createClient: jest.fn(() => ({
      auth: {
        signUp: jest.fn(() => ({
          data: { user: mockUser, session: mockSession },
          error: null
        })),
        signInWithPassword: jest.fn(({ email, password }) => {
          // Mock authentication failure for specific test case
          if (email === 'fail@example.com') {
            return { data: null, error: { message: 'Invalid login credentials' } };
          }
          return {
            data: { user: mockUser, session: mockSession },
            error: null
          };
        }),
        getUser: jest.fn((token) => {
          // Mock invalid token for specific test case
          if (token === 'invalid-token') {
            return { data: null, error: { message: 'Invalid token' } };
          }
          return { data: { user: mockUser }, error: null };
        })
      },
      from: jest.fn((table) => ({
        insert: jest.fn(() => ({
          select: jest.fn(() => ({
            data: [{ id: 'test-id', email: 'test@example.com', username: 'testuser' }],
            error: null
          }))
        })),
        select: jest.fn(() => ({
          data: [
            { id: 'test-id', email: 'test@example.com', username: 'testuser' },
            { id: 'test-id-2', email: 'test2@example.com', username: 'testuser2' }
          ],
          error: null,
          eq: jest.fn(() => ({
            single: jest.fn(() => ({
              data: { id: 'test-id', email: 'test@example.com', username: 'testuser' },
              error: null
            }))
          }))
        })),
        delete: jest.fn(() => ({
          eq: jest.fn(() => ({
            data: null,
            error: null
          }))
        })),
        update: jest.fn(() => ({
          eq: jest.fn(() => ({
            select: jest.fn(() => ({
              data: [{ id: 'test-id', username: 'updated-username' }],
              error: null
            }))
          }))
        })),
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: { id: 'test-id', email: 'test@example.com', username: 'testuser' },
            error: null
          }))
        }))
      }))
    }))
  };
});