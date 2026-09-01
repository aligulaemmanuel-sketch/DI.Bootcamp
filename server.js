require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  try {
    const possiblePaths = [
      path.join(process.cwd(), 'index.html'),
      path.join(__dirname, 'index.html'),
      path.join(__dirname, '..', 'index.html'),
      'index.html'
    ];
    
    let indexContent = null;
    for (const filePath of possiblePaths) {
      try {
        if (fs.existsSync(filePath)) {
          indexContent = fs.readFileSync(filePath, 'utf8');
          console.log(`Loaded index.html from: ${filePath}`);\n          break;
        }
      } catch (e) {
        // Try next path
      }
    }
    
    if (!indexContent) {
      throw new Error('Could not find index.html in any expected path');
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.send(indexContent);
  } catch (err) {
    console.error('Error serving index.html:', err);
    res.status(500).json({ error: 'Unable to load application', details: err.message });
  }
});

app.listen(port, () => console.log(`RYSA server running at http://localhost:${port}`));
