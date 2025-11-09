const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const USERS_PATH = path.join(__dirname, 'src', 'db', 'users.json');

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email);
  
  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({ error: 'Email yoki parol noto\'g\'ri' });
  }
  
  user.status.lastLoginAt = new Date().toISOString();
  user.status.current = 'active';
  writeUsers(users);
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ success: true, user: userWithoutPassword });
});

app.post('/api/signup', (req, res) => {
  const { name, email, password, phone, LPID } = req.body;
  const users = readUsers();
  
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
  }

  const newUser = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    password: hashPassword(password),
    LPID: LPID || 'LPID_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    profile: {
      firstName: name.split(' ')[0] || '',
      lastName: name.split(' ').slice(1).join(' ') || '',
      phone: phone || ''
    },
    status: { current: 'active', lastLoginAt: new Date().toISOString() },
    createdAt: new Date().toISOString(),
    likedProducts: [],
    viewHistory: [],
    searchHistory: [],
    cart: [],
    orderHistory: [],
    preferences: { language: 'uz', currency: 'UZS', notifications: true }
  };

  users.push(newUser);
  writeUsers(users);
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.json({ success: true, user: userWithoutPassword });
});

app.put('/api/user/:lpid', (req, res) => {
  const { lpid } = req.params;
  const updates = req.body;
  const users = readUsers();
  const userIndex = users.findIndex(u => u.LPID === lpid);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
  }
  
  delete updates.password;
  delete updates.id;
  delete updates.LPID;
  
  users[userIndex] = { ...users[userIndex], ...updates };
  writeUsers(users);
  
  const { password: _, ...userWithoutPassword } = users[userIndex];
  res.json({ success: true, user: userWithoutPassword });
});

app.get('/api/user/:lpid', (req, res) => {
  const { lpid } = req.params;
  const users = readUsers();
  const user = users.find(u => u.LPID === lpid);
  
  if (!user) {
    return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', users: readUsers().length });
});

app.listen(PORT, () => {
  console.log(`🚀 Production JSON server running on port ${PORT}`);
  console.log(`📁 Data stored in: ${USERS_PATH}`);
});