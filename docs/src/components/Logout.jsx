import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logout successful!');
    } catch (error) {
      alert(error.message);
    }
  };

  return currentUser ? <button onClick={handleLogout}>Logout</button> : null;
};

export default Logout;
