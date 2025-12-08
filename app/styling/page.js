'use client';

import Image from 'next/image';
import styles from '@/styles/Styling.module.css';
import { useUser } from '../context/UserContext'; // 1. Import Context
import { useRouter } from 'next/navigation';
import { HiLockClosed } from 'react-icons/hi2';

export default function StylingPage() {
  const { isPremium } = useUser();
  const router = useRouter();

  return (
    <div className={styles.container}>
      
      {/* === OVERLAY PENGUNCI (Hanya muncul jika user FREE) === */}
      {!isPremium && (
        <div style={lockOverlayStyle}>
          <div style={lockCardStyle}>
            <div style={iconCircleStyle}>
              <HiLockClosed size={32} color="#fff" />
            </div>
            <h2 style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem'}}>
              Fitur Premium
            </h2>
            <p style={{color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.4'}}>
              Upgrade ke <strong>PRO</strong> untuk membuka akses ke fitur Styling Manekin dan Mix & Match tanpa batas!
            </p>
            <button 
              onClick={() => router.push('/premium')} 
              style={upgradeButtonStyle}
            >
              Buka Kunci Sekarang 🔓
            </button>
          </div>
        </div>
      )}

      {/* Konten Asli (Diberi efek blur jika free) */}
      <div className={styles.imageWrapper} style={!isPremium ? { filter: 'blur(10px)', pointerEvents: 'none' } : {}}>
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

// Inline Styles untuk Overlay
const lockOverlayStyle = {
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  zIndex: 999,
  backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparan
  backdropFilter: 'blur(5px)', // Efek buram kaca
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '2rem',
};

const lockCardStyle = {
  background: 'white', padding: '2rem', borderRadius: '24px', textAlign: 'center',
  boxShadow: '0 20px 50px rgba(0,0,0,0.15)', maxWidth: '320px', border: '1px solid #f3f4f6',
};

const iconCircleStyle = {
  width: '60px', height: '60px',
  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
  margin: '0 auto 1rem auto', boxShadow: '0 10px 20px rgba(168, 85, 247, 0.3)',
};

const upgradeButtonStyle = {
  width: '100%', padding: '0.8rem',
  background: '#1f2937', color: 'white', border: 'none', borderRadius: '12px',
  fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer',
  transition: 'transform 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};