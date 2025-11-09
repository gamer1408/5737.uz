// Simple Express server for user authentication
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const USERS_PATH = path.join(__dirname, 'src', 'db', 'users.json');
const PENDING_USERS_PATH = path.join(__dirname, 'src', 'db', 'pending-users.json');
const VERIFICATION_CODES_PATH = path.join(__dirname, 'src', 'db', 'verification-codes.json');

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

function readPendingUsers() {
  try {
    return JSON.parse(fs.readFileSync(PENDING_USERS_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function writePendingUsers(pendingUsers) {
  fs.writeFileSync(PENDING_USERS_PATH, JSON.stringify(pendingUsers, null, 2));
}

function readVerificationCodes() {
  try {
    return JSON.parse(fs.readFileSync(VERIFICATION_CODES_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function writeVerificationCodes(codes) {
  fs.writeFileSync(VERIFICATION_CODES_PATH, JSON.stringify(codes, null, 2));
}

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(email, code) {
  // Store the verification code
  const codes = readVerificationCodes();
  codes[email] = code;
  writeVerificationCodes(codes);

  // If SMTP credentials are provided, attempt to send a real email.
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;

  if (smtpUser && smtpPass) {
    try {
      const nodemailer = require('nodemailer');
      const port = smtpPort || (smtpHost.includes('gmail') ? 465 : 587);
      const secure = port === 465; // true for 465, false for other ports

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const from = process.env.EMAIL_FROM || smtpUser;
      const info = await transporter.sendMail({
        from,
        to: email,
        subject: 'Your verification code',
        text: `Your verification code is: ${code}`
      });

      console.log('Sent verification email to', email, 'messageId=', info && info.messageId);
      return { delivered: true, method: 'smtp' };
    } catch (err) {
      console.error('Failed to send email via SMTP:', err && err.message ? err.message : err);
      // Fall through to console fallback
    }
  } else {
    console.log('SMTP credentials not configured; using console fallback for verification codes.');
  }

  // Console fallback (development)
  console.log('\n==================================');
  console.log('📧 Verification Code for', email);
  console.log('🔑 Code:', code);
  console.log('==================================\n');

  return { delivered: false, method: 'console' };
}

app.post('/api/signup/initiate', async (req, res) => {
  console.log('Received signup initiation request');
  const { name, email, password } = req.body;
  
  try {
    // Check if user already exists
    const users = readUsers();
    if (users.find(u => u.email === email)) {
      console.log('User already exists:', email);
      return res.status(409).json({ error: 'There is already an account with this email, go sign in.' });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    console.log('Generated verification code for:', email);
    
  // Store verification code and attempt delivery
  const sendResult = await sendVerificationEmail(email, verificationCode);
  console.log('Verification code stored successfully for:', email, 'delivery=', sendResult && sendResult.method);
    
    // Store pending user
    const pendingUsers = readPendingUsers();
    pendingUsers[email] = {
      name,
      password,
      verificationCode,
      timestamp: Date.now()
    };
    writePendingUsers(pendingUsers);
    console.log('Stored pending user data for:', email);

    res.json({ 
      success: true, 
      message: sendResult && sendResult.delivered
        ? 'Verification code sent to your email.'
        : 'Verification code generated. Check the server console for the code.'
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: error.message || 'Failed to process signup' });
  }
});

app.post('/api/signup/verify', async (req, res) => {
  console.log('Received verification request');
  const { email, code } = req.body;
  
  try {
    const pendingUsers = readPendingUsers();
    const pendingUser = pendingUsers[email];

    if (!pendingUser) {
      console.log('No pending verification found for:', email);
      return res.status(404).json({ error: 'No pending verification found' });
    }

    if (Date.now() - pendingUser.timestamp > 10 * 60 * 1000) {
      console.log('Verification code expired for:', email);
      delete pendingUsers[email];
      writePendingUsers(pendingUsers);
      return res.status(410).json({ error: 'Verification code expired' });
    }

    const storedCode = readVerificationCodes()[email];
    if (!storedCode || storedCode !== code) {
      console.log('Invalid verification code for:', email);
      console.log('Expected:', storedCode, 'Received:', code);
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    // Create verified user
    const users = readUsers();
    users.push({
      name: pendingUser.name,
      email,
      password: pendingUser.password
    });
    writeUsers(users);
    console.log('Created new verified user:', email);

    // Cleanup
    delete pendingUsers[email];
    writePendingUsers(pendingUsers);
    const codes = readVerificationCodes();
    delete codes[email];
    writeVerificationCodes(codes);
    console.log('Cleaned up temporary data for:', email);

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

app.post('/api/signup/resend', async (req, res) => {
  console.log('Received resend verification request');
  const { email } = req.body;
  
  try {
    const pendingUsers = readPendingUsers();
    const pendingUser = pendingUsers[email];

    if (!pendingUser) {
      console.log('No pending verification found for resend:', email);
      return res.status(404).json({ error: 'No pending verification found' });
    }

    // Generate new code and attempt delivery
    const newCode = generateVerificationCode();
    const sendResult = await sendVerificationEmail(email, newCode);

    pendingUser.verificationCode = newCode;
    pendingUser.timestamp = Date.now();
    writePendingUsers(pendingUsers);
    console.log('Generated and stored new verification code for:', email, 'delivery=', sendResult && sendResult.method);

    res.json({ 
      success: true, 
      message: sendResult && sendResult.delivered
        ? 'New verification code sent to your email.'
        : 'New verification code generated. Check the server console for the code.'
    });
  } catch (error) {
    console.error('Error during resend:', error);
    res.status(500).json({ error: 'Failed to resend verification code' });
  }
});

app.post('/api/signin', (req, res) => {
  console.log('Received signin request');
  const { email, password } = req.body;
  
  try {
    const users = readUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ error: 'You are not signed up.' });
    }
    
    if (user.password !== password) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    console.log('Successful signin for:', email);
    res.json({ success: true, user: { email: user.email, name: user.name } });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ error: 'Failed to process signin' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});