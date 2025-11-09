const fs = require('fs');
const path = require('path');

const USERS_PATH = path.join(__dirname, 'src', 'db', 'users.json');

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('No users file found');
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

function updateUserStatuses() {
  const users = readUsers();
  const now = new Date();
  let updatedCount = 0;

  users.forEach(user => {
    if (!user.status || !user.status.lastLoginAt) return;

    const lastLogin = new Date(user.status.lastLoginAt);
    const daysSinceLogin = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));

    let newStatus = user.status.current;

    if (daysSinceLogin >= 30 && user.status.current !== 'poor') {
      newStatus = 'poor';
      updatedCount++;
    } else if (daysSinceLogin >= 7 && user.status.current === 'active') {
      newStatus = 'inactive';
      updatedCount++;
    }

    if (newStatus !== user.status.current) {
      user.status.current = newStatus;
      console.log(`Updated user ${user.email} status to ${newStatus} (${daysSinceLogin} days since login)`);
    }
  });

  if (updatedCount > 0) {
    writeUsers(users);
    console.log(`✅ Updated ${updatedCount} user statuses`);
  } else {
    console.log('📊 No status updates needed');
  }
}

// Run immediately
console.log('🔄 Starting user status update...');
updateUserStatuses();

// Schedule to run every hour
setInterval(() => {
  console.log('🔄 Running scheduled user status update...');
  updateUserStatuses();
}, 60 * 60 * 1000); // 1 hour

console.log('📅 Status manager running - will check user statuses every hour');