# 🔐 Authentication System Setup

## Overview
This is an optimized registration and login system that saves user data in JSON format with comprehensive user management features.

## Features
- ✅ Secure password hashing (SHA-256)
- ✅ User registration with validation
- ✅ User login with error handling
- ✅ User profile management
- ✅ Product interaction tracking (liked, wishlist, purchased)
- ✅ Search history tracking
- ✅ JSON database storage
- ✅ React hooks for easy integration
- ✅ TypeScript support

## Quick Start

### 1. Install Dependencies
```bash
npm install express cors
```

### 2. Start Development Environment
```bash
# Option 1: Use the batch script (Windows)
npm run start-dev

# Option 2: Start manually
# Terminal 1 - Auth Server
npm run auth-server

# Terminal 2 - Frontend
npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:5173
- Auth API: http://localhost:3001

## User Data Structure

Each user is stored with the following comprehensive JSON structure:

```json
{
  "id": "unique_user_id",
  "email": "user@example.com",
  "password": "hashed_password",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+998901234567"
  },
  "status": {
    "current": "active",
    "lastLoginAt": "2024-01-01T00:00:00.000Z"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "basket": [
    {
      "productId": "prod_123",
      "quantity": 2,
      "addedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "wishlist": [
    {
      "productId": "prod_456",
      "addedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "likedProducts": [
    {
      "productId": "prod_789",
      "likedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "searchHistory": [
    {
      "query": "blue shoes",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  ],
  "orderHistory": [
    {
      "orderId": "ord_001",
      "orderDate": "2024-01-01T00:00:00.000Z",
      "totalAmount": 150000,
      "status": "delivered",
      "items": [
        {
          "productId": "prod_123",
          "quantity": 1,
          "price": 150000
        }
      ]
    }
  ],
  "preferences": {
    "language": "uz",
    "currency": "UZS",
    "notifications": true
  }
}
```

## API Endpoints

### Authentication
- `POST /api/signin` - User login
- `POST /api/signup` - User registration

### User Management
- `GET /api/user/:id` - Get user profile
- `PUT /api/user/:id` - Update user profile

## Frontend Integration

### Using the Auth Hook
```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isSignedIn, signIn, signOut, addToLiked } = useAuth();

  const handleLogin = async () => {
    const result = await signIn('user@example.com', 'password');
    if (result.success) {
      console.log('Logged in successfully!');
    }
  };

  return (
    <div>
      {isSignedIn ? (
        <div>Welcome, {user?.name}!</div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Using the Auth Service Directly
```tsx
import { authService } from '@/lib/AuthService';

// Sign in
const result = await authService.signIn('email', 'password');

// Sign up
const result = await authService.signUp({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  phone: '+998901234567'
});

// Add to liked products
await authService.addToLiked('product_id');

// Add to basket
await authService.addToBasket('product_id', 2);

// Add search to history
await authService.addToSearchHistory('blue shoes');

// Add completed order
await authService.addOrder({
  orderId: 'ord_001',
  totalAmount: 150000,
  items: [{ productId: 'prod_123', quantity: 1, price: 150000 }]
});
```

## Database Location
User data is stored in: `src/db/users.json`

## Security Features
- Password hashing using SHA-256
- Input validation and sanitization
- Error handling for all operations
- CORS enabled for cross-origin requests

## Development Notes
- The auth server runs on port 3001
- Frontend development server runs on port 5173
- Status manager runs automated user status updates
- User sessions are managed via localStorage
- All user operations are automatically synced with the JSON database
- Rich user data structure with timestamps and metadata
- Automated status management (active → inactive → poor)

## Status Management
Run the status manager to automatically update user statuses:
```bash
npm run status-manager
```

User statuses:
- **active**: Logged in within 7 days
- **inactive**: Logged in 7-30 days ago
- **poor**: Logged in more than 30 days ago

## Troubleshooting

### Common Issues
1. **Port 3001 already in use**: Kill the existing process or change the port in `auth-server.js`
2. **CORS errors**: Make sure the auth server is running and CORS is properly configured
3. **Database not updating**: Check file permissions for `src/db/users.json`

### Logs
Check the console output of the auth server for detailed error messages and operation logs.