const http = require('http');

const data = JSON.stringify({ role: 'Software Engineer' });

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/ai/interview/start',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let responseBody = '';
  res.on('data', chunk => { responseBody += chunk; });
  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Response: ${responseBody}`);
  });
});

req.on('error', error => { console.error('Error:', error); });
req.write(data);
req.end();
