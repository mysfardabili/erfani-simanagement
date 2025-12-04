'use client';

import Image from 'next/image';
import styles from '@/styles/Styling.module.css';

export default function StylingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {/* Ganti '/styling-full.jpg' dengan nama file gambar Anda di folder public */}
        <Image 
          src="/styling-pangkas.jpg" 
          alt="Styling Outfit"
          fill 
          className={styles.fullImage}
          priority 
        />
      </div>
    </div>
  );
}