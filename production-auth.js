const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// In production, replace this with MongoDB/PostgreSQL
const users = new Map(); // Temporary in-memory storage

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + process.env.JWT_SECRET).digest('hex');
}

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;
  const user = users.get(email);
  
  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({ error: 'Email yoki parol noto\'g\'ri' });
  }
  
  user.status.lastLoginAt = new Date().toISOString();
  user.status.current = 'active';
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ success: true, user: userWithoutPassword });
});

app.post('/api/signup', (req, res) => {
  const { name, email, password, phone } = req.body;
  
  if (users.has(email)) {
    return res.status(409).json({ error: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
  }

  const newUser = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    password: hashPassword(password),
    profile: {
      firstName: name.split(' ')[0] || '',
      lastName: name.split(' ').slice(1).join(' ') || '',
      phone: phone || ''
    },
    status: { current: 'active', lastLoginAt: new Date().toISOString() },
    createdAt: new Date().toISOString(),
    basket: [],
    wishlist: [],
    likedProducts: [],
    searchHistory: [],
    orderHistory: [],
    preferences: { language: 'uz', currency: 'UZS', notifications: true }
  };

  users.set(email, newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.json({ success: true, user: userWithoutPassword });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Production server running on port ${PORT}`);
});