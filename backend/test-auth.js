/**
 * Simple test script to verify authentication middleware
 * 
 * This script tests API endpoints to ensure that:
 * 1. Public endpoints remain accessible
 * 2. Protected endpoints return 401 Unauthorized when no token is provided
 * 
 * To run this test:
 * 1. Start the server: node app.js
 * 2. In a separate terminal: node test-auth.js
 */
const http = require('http');

// Base URL for API - for local testing
const host = 'localhost';
const port = 3000;

// Test endpoints
const testEndpoints = [
  { url: '/api/health', name: 'Health Check (Public)' },
  { url: '/api/users', name: 'Get All Users (Protected)' },
  { url: '/api/charts', name: 'Get All Charts (Protected)' },
  { url: '/api/pages/chart/1', name: 'Get Pages by Chart ID (Protected)' },
  { url: '/api/auth/me', name: 'Get Current User (Protected)' }
];

// Test without authentication token
function testEndpoint(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port: port,
      path: endpoint.url,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const response = {
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          data: data
        };
        resolve(response);
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// Test without authentication
async function runTests() {
  console.log('\n--- Testing Endpoints Without Authentication ---');
  
  for (const endpoint of testEndpoints) {
    try {
      const response = await testEndpoint(endpoint);
      console.log(`${endpoint.name}: ${response.statusCode} ${response.statusMessage}`);
      
      if (response.statusCode !== 401 && endpoint.url !== '/api/health') {
        console.log('  Error: Protected endpoint accessible without authentication!');
      }
      
      if (response.statusCode === 401) {
        console.log('  Success: Authentication required as expected');
      }
      
    } catch (error) {
      console.error(`Error testing ${endpoint.name}:`, error.message);
    }
  }
  
  console.log('\nTest completed. All protected endpoints should return 401 Unauthorized.');
}

// Run tests
runTests();