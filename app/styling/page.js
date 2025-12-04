'use client';

import Image from 'next/image';
import styles from '@/styles/Styling.module.css';

export default function StylingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {/* Gunakan trik ini untuk Next.js Image:
           width={0} height={0} sizes="100vw" + style width: 100%, height: auto
           Ini membuat gambar selebar layar HP, dan tingginya mengikuti proporsi asli (tidak gepeng/terpotong).
        */}
        <Image 
          src="/styling-pangkas.jpg" 
          alt="Styling Outfit"
          width={0}
          height={0}
          sizes="100vw"
          className={styles.scrollableImage}
          style={{ width: '100%', height: 'auto' }} 
          priority 
        />
      </div>
    </div>
  );
}