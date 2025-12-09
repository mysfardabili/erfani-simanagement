'use client';

import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function HomePage() {
  
  // Data Banner Iklan (Bisa ditambah/dikurangi)
  const banners = [
    { 
      id: 1, 
      alt: "Promo Pakaian Wanita 50%", 
      // Menggunakan gambar placeholder berkualitas tinggi tema fashion
      src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
      title: "Flash Sale 50%" 
    },
    { 
      id: 2, 
      alt: "Fashion Local Fest", 
      // Menggunakan gambar placeholder lain
      src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
      title: "Local Fashion Week" 
    }
  ];

  return (
    <div className={styles.container}>
      
      {/* 1. Header Section */}
      <header className={styles.header}>
        <div className={styles.leftSection}>
          {/* Avatar User */}
          <div className={styles.avatarWrapper}>
            {/* Ganti dengan <Image /> jika ada foto profil asli */}
            <span>👩🏻</span> 
          </div>
          <h1 className={styles.greetingText}>Hallo, Erfani</h1>
        </div>

        {/* Dekorasi Baju di Kanan (Opsional) */}
        {/* Jika Anda punya gambar ilustrasi baju tumpuk, masukkan di folder public dan uncomment ini */}
        {/* <Image 
          src="/decoration-clothes.png" 
          alt="Clothes" 
          width={80} 
          height={80} 
          className={styles.headerDecoration} 
        /> 
        */}
      </header>

      {/* 2. Hero Pill (Search/Action Button) */}
      <div className={styles.heroPill} onClick={() => alert("Mencari outfit stylish...")}>
        <h2 className={styles.heroText}>Are you ready stylish outfit now?</h2>
      </div>

      {/* 3. Banner Iklan (Bebas diatur) */}
      <div className={styles.bannerContainer}>
        {banners.map((banner) => (
          <div key={banner.id} className={styles.bannerCard}>
            {/* Overlay Teks Promo (Opsional agar terlihat seperti Iklan) */}
            <div style={{
              position: 'absolute', 
              bottom: '20px', 
              left: '20px', 
              background: 'rgba(255,255,255,0.9)', 
              padding: '5px 15px', 
              borderRadius: '20px',
              fontWeight: 'bold',
              color: '#333',
              fontSize: '0.9rem'
            }}>
              {banner.title}
            </div>

            <img 
              src={banner.src} 
              alt={banner.alt} 
              className={styles.bannerImage}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
