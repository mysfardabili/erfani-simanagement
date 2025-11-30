'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div style={styles.container}>
      <div style={styles.logoWrapper}>
        {/* Pastikan nama file di folder public adalah 'logo-final.png' */}
        <Image 
          src="/logo-final.png" 
          alt="Logo SIManagement"
          width={180} 
          height={180}
          style={styles.logoImage}
          priority 
        />
      </div>
      
      <h1 style={styles.title}>RupaRapi</h1>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Warna background ini harus COCOK dengan warna background gambar logo Anda
    // Jika masih belang, ganti kode warna ini agar sama dengan gambar
    backgroundColor: '#13142b', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
  },
  logoWrapper: {
    width: '180px',
    maxWidth: '50%', 
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  title: {
    color: 'white',
    fontSize: '1.8rem', 
    fontWeight: '700', 
    letterSpacing: '1px', 
    marginTop: '10px',
    fontFamily: 'sans-serif',
  }
};