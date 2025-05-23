const request = require('supertest');
const app = require('../app');

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: 'password123' });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('session');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should return 400 if email or password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' }); // Missing password
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('session');
      expect(response.body.session).toHaveProperty('access_token');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'fail@example.com', password: 'wrongpassword' });
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if email or password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' }); // Missing password
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return current user with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', '******');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('created_at');
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', '******');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 with no token', async () => {
      const response = await request(app)
        .get('/api/auth/me');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 with malformed authorization header', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Malformed-Header');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});
