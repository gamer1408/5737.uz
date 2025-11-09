import React from 'react';
import { useDualMode } from '@/hooks/useDualMode';

export default function UserInfo() {
  const { user, isSignedIn } = useDualMode();

  if (!isSignedIn) {
    return <div>Guest Mode - No Data Saved</div>;
  }

  return (
    <div className="p-4 border rounded">
      <h3>User Information</h3>
      <p>LPID: {user?.LPID}</p>
      <p>Email: {user?.email}</p>
      <p>Name: {user?.profile?.firstName} {user?.profile?.lastName}</p>
      <p>Liked Products: {user?.likedProducts?.length || 0}</p>
      <p>Cart Items: {user?.cart?.length || 0}</p>
      <p>Search History: {user?.searchHistory?.length || 0}</p>
      <p>View History: {user?.viewHistory?.length || 0}</p>
    </div>
  );
}