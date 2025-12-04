'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi2';
import styles from '@/styles/Styling.module.css';

export default function StylingPage() {
  const router = useRouter();

  return (
    <div className={styles.fullScreenContainer}>
      
      {/* Tombol Kembali ke Beranda (Penting agar user bisa keluar) */}
      <button className={styles.backButton} onClick={() => router.back()}>
        <HiArrowLeft size={24} color="#333" />
      </button>

      {/* Gambar Manekin Full Screen */}
      <div className={styles.imageWrapper}>
        <Image 
          src="/mannequin-full.jpg" // Pastikan nama file ini sesuai dengan yang di folder public
          alt="Full Body Outfit"
          fill // Properti ini membuat gambar mengisi parent div
          className={styles.fullImage}
          priority // Prioritas loading tinggi
        />
      </div>

    </div>
  );
}