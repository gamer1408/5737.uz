# 🔄 Dual-Mode User System

## System Overview

Complete implementation of dual-mode e-commerce system with LPID-based user identification.

## 🎯 Mode Behaviors

### GUEST MODE (No Registration)
- ✅ Browse products immediately
- ✅ Temporary session storage only
- ✅ No database persistence
- ✅ Fresh data on each refresh
- ✅ Generic market view

### REGISTERED USER MODE  
- ✅ LPID-based identification
- ✅ Database persistence
- ✅ Personalized recommendations
- ✅ Cross-session data retention
- ✅ Complete user history

## 🔧 Technical Implementation

### Data Storage Strategy
```javascript
// Guest Mode
sessionStorage.setItem('guest_cart', data);     // Temporary
sessionStorage.setItem('guest_liked', data);    // Lost on refresh

// User Mode  
PUT /api/user/LPID_123 { likedProducts: [...] } // Permanent
```

### LPID System
- Format: `LPID_timestamp_randomstring`
- Unique per registered user
- Links all user actions
- Database key for retrieval

## 🚀 Usage Examples

### Basic Integration
```javascript
import { useDualMode } from '@/hooks/useDualMode';

function ProductCard({ productId }) {
  const { isSignedIn, addToLiked, userLPID } = useDualMode();
  
  const handleLike = () => {
    addToLiked(productId); // Works in both modes
  };
  
  return (
    <div>
      {isSignedIn ? `User: ${userLPID}` : 'Guest Mode'}
      <button onClick={handleLike}>Like</button>
    </div>
  );
}
```

### Data Retrieval
```javascript
const { getLikedProducts, getCart, getSearchHistory } = useDualMode();

// Returns user data or guest session data automatically
const liked = getLikedProducts();
const cart = getCart();
const searches = getSearchHistory();
```

## 📊 Components Created

1. **DualModeService** - Core service handling both modes
2. **useDualMode** - React hook for easy integration  
3. **ModeIndicator** - Visual indicator of current mode
4. **ProductInteraction** - Demo component showing dual behavior

## 🔄 Mode Switching

When user signs in:
1. Guest session data cleared
2. User data loaded from database via LPID
3. All future actions saved permanently

When user signs out:
1. User data cleared from memory
2. System switches to guest mode
3. New session storage initialized

## 🎯 Key Features

- **Seamless Experience** - Same interface, different persistence
- **LPID Tracking** - Unique identifier per user
- **Automatic Fallback** - Works offline in guest mode
- **Data Migration** - Guest to user transition
- **Performance Optimized** - Session vs database calls