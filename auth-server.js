const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const USERS_PATH = path.join(__dirname, 'src', 'db', 'users.json');

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Creating new users.json file');
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
  }
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateUserId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

app.post('/api/signin', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email va parol talab qilinadi' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(404).json({ error: 'Bunday email bilan foydalanuvchi topilmadi' });
    }
    
    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return res.status(401).json({ error: 'Parol noto\'g\'ri' });
    }

    // Update last login
    user.status.lastLoginAt = new Date().toISOString();
    user.status.current = 'active';
    writeUsers(users);
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

app.post('/api/signup', (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Ism, email va parol talab qilinadi' });
    }

    const users = readUsers();
    
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: 'Bu email allaqachon ro\'yxatdan o\'tgan' });
    }

    const newUser = {
      id: generateUserId(),
      email: email.toLowerCase().trim(),
      password: hashPassword(password),
      profile: {
        firstName: name.split(' ')[0] || '',
        lastName: name.split(' ').slice(1).join(' ') || '',
        phone: phone || ''
      },
      status: {
        current: 'active',
        lastLoginAt: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      basket: [],
      wishlist: [],
      likedProducts: [],
      searchHistory: [],
      orderHistory: [],
      preferences: {
        language: 'uz',
        currency: 'UZS',
        notifications: true
      }
    };

    users.push(newUser);
    writeUsers(users);
    
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

app.get('/api/user/:id', (req, res) => {
  try {
    const { id } = req.params;
    const users = readUsers();
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

app.put('/api/user/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    }
    
    // Don't allow password updates through this endpoint
    delete updates.password;
    delete updates.id;
    
    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() };
    writeUsers(users);
    
    const { password: _, ...userWithoutPassword } = users[userIndex];
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Auth server running on http://localhost:${PORT}`);
  console.log(`📁 Users database: ${USERS_PATH}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});
