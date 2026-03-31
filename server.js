import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('combined'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  // GoHighLevel webhook integration
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message }),
    }).catch(err => console.error('GHL webhook error:', err));
  }
  res.json({ success: true });
});

app.post('/api/financing', (req, res) => {
  const webhookUrl = process.env.GHL_FINANCING_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    }).catch(err => console.error('GHL financing webhook error:', err));
  }
  res.json({ success: true });
});

// Serve static files in production
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
