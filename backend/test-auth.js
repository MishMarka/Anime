// Simple test script to verify authentication middleware
const fetch = require('node-fetch');

// Base URL for API
const baseUrl = 'http://localhost:3000';

// Test endpoints
const testEndpoints = [
  { url: '/api/health', name: 'Health Check (Public)' },
  { url: '/api/users', name: 'Get All Users (Protected)' },
  { url: '/api/charts', name: 'Get All Charts (Protected)' },
  { url: '/api/pages/chart/1', name: 'Get Pages by Chart ID (Protected)' },
  { url: '/api/auth/me', name: 'Get Current User (Protected)' }
];

// Test without authentication token
async function testWithoutAuth() {
  console.log('\n--- Testing Endpoints Without Authentication ---');
  
  for (const endpoint of testEndpoints) {
    try {
      const response = await fetch(`${baseUrl}${endpoint.url}`);
      console.log(`${endpoint.name}: ${response.status} ${response.statusText}`);
      
      // For debugging
      if (response.status !== 401 && endpoint.url !== '/api/health') {
        console.log('  Error: Protected endpoint accessible without authentication!');
      }
      
      if (response.status === 401) {
        console.log('  Success: Authentication required as expected');
      }
      
    } catch (error) {
      console.error(`Error testing ${endpoint.name}:`, error.message);
    }
  }
}

// Run tests
async function runTests() {
  await testWithoutAuth();
  console.log('\nTest completed. All protected endpoints should return 401 Unauthorized.');
}

runTests();