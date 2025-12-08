'use client';

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  // Default: User adalah FREE (false)
  const [isPremium, setIsPremium] = useState(false);

  // Fungsi simulasi pembayaran sukses
  const upgradeToPremium = () => {
    setIsPremium(true);
    alert("🎉 Selamat! Akun Anda sekarang PREMIUM.");
  };

  return (
    <UserContext.Provider value={{ isPremium, upgradeToPremium }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}