const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables or sensible defaults for local testing
const APP_COLOR = process.env.APP_COLOR || 'blue';
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const HOSTNAME = os.hostname();

let requestCount = 0;

// Serve static UI assets
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint for health checks and pipeline smoke tests
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    color: APP_COLOR,
    version: APP_VERSION,
    hostname: HOSTNAME,
    uptime: process.uptime()
  });
});

// Metrics / status endpoint
app.get('/api/status', (req, res) => {
  requestCount++;
  res.json({
    color: APP_COLOR,
    version: APP_VERSION,
    hostname: HOSTNAME,
    requests: requestCount,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [Color: ${APP_COLOR}, Version: ${APP_VERSION}]`);
});
