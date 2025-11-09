import { useEffect } from 'react';
import { dualModeService } from '@/lib/DualModeService';

export function useWindowSync(onUserUpdate: () => void) {
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentUser' && e.newValue) {
        // User data updated in another window
        const updatedUser = JSON.parse(e.newValue);
        (dualModeService as any).currentUser = updatedUser;
        onUserUpdate();
      }
    };

    const handleFocus = () => {
      // Window regained focus - check for updates
      const currentUser = dualModeService.getCurrentUser();
      if (currentUser) {
        // Refresh user data from server
        fetch(`http://localhost:3001/api/user/${currentUser.LPID}`)
          .then(res => res.json())
          .then(data => {
            if (data.user) {
              localStorage.setItem('currentUser', JSON.stringify(data.user));
              (dualModeService as any).currentUser = data.user;
              onUserUpdate();
            }
          })
          .catch(() => {});
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [onUserUpdate]);
}