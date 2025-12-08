'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiCheckCircle } from 'react-icons/hi2';
import { useUser } from '../context/UserContext'; // Import Context

export default function PremiumPage() {
  const router = useRouter();
  const { upgradeToPremium } = useUser(); // Ambil fungsi upgrade
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const handleSubscribe = () => {
    // Jalankan fungsi upgrade di context
    upgradeToPremium();
    // Kembali ke halaman utama
    router.push('/');
  };

  return (
    <div style={styles.container}>
      
      {/* Header Logo */}
      <div style={styles.header}>
        <Image 
          src="/logo-final.png" 
          alt="RupaRapi Logo" 
          width={120} height={80} 
          style={{objectFit: 'contain'}} 
        />
        <h1 style={styles.title}>RupaRapi <span style={{color: '#f97316'}}>Super</span></h1>
      </div>

      <p style={styles.description}>
        <strong>Unlock your style potential!</strong><br/>
        Pilih paket langganan untuk akses tanpa batas ke semua fitur styling dan lemari.
      </p>

      {/* Pilihan Paket */}
      <div style={styles.plansContainer}>
        
        {/* PAKET PRO */}
        <div 
          onClick={() => setSelectedPlan('pro')}
          style={{
            ...styles.planCard,
            ...(selectedPlan === 'pro' ? styles.activeCard : {})
          }}
        >
          <div style={styles.badgeWrapper}>
            <span style={styles.planName}>Paket Pro</span>
            <span style={{...styles.badge, background: '#a855f7'}}>BEST SELLER</span>
          </div>
          {selectedPlan === 'pro' && (
            <div style={styles.checkIcon}><HiCheckCircle size={32} color="#a855f7" /></div>
          )}
          <div style={styles.planDetails}>
            <ul style={styles.featuresList}>
              <li>• Akses Styling Manekin</li>
              <li>• Unlimited Item Lemari</li>
              <li>• Bebas Iklan</li>
            </ul>
            <div style={styles.priceWrapper}>
              <span style={styles.oldPrice}>Rp 69.999</span>
              <div style={styles.mainPrice}>
                Rp 17.500 <span style={styles.period}>/Minggu</span>
              </div>
            </div>
          </div>
        </div>

        {/* PAKET ULTRA */}
        <div 
          onClick={() => setSelectedPlan('ultra')}
          style={{
            ...styles.planCard,
            ...(selectedPlan === 'ultra' ? styles.activeCard : {})
          }}
        >
          <div style={styles.badgeWrapper}>
            <span style={styles.planName}>Paket Ultra</span>
            <span style={{...styles.badge, background: '#ec4899'}}>HEMAT</span>
          </div>
          {selectedPlan === 'ultra' && (
            <div style={styles.checkIcon}><HiCheckCircle size={32} color="#ec4899" /></div>
          )}
          <div style={styles.planDetails}>
            <ul style={styles.featuresList}>
              <li>• Semua Fitur Pro</li>
              <li>• Prioritas Support</li>
              <li>• Akses Lookbook Eksklusif</li>
            </ul>
            <div style={styles.priceWrapper}>
              <span style={styles.oldPrice}>Rp 19.999</span>
              <div style={styles.mainPrice}>
                Rp 2.857 <span style={styles.period}>/Hari</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Tombol Subscribe */}
      <div style={styles.bottomAction}>
        <p style={styles.trialText}>Free 3-day trial</p>
        <button style={styles.subscribeButton} onClick={handleSubscribe}>
          Start Free trial
        </button>
      </div>

    </div>
  );
}

// ... (Kode komponen React di atas tetap sama, cukup ganti bagian styles di bawah ini)

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    /* Tambahkan padding bawah yang cukup besar agar tombol tidak ketutup */
    padding: '2rem 1.5rem 120px 1.5rem', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    overflowY: 'auto', /* Pastikan bisa discroll */
  },
  header: {
    textAlign: 'center',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#a855f7',
    marginTop: '0.5rem',
    fontFamily: 'Comic Sans MS, cursive', 
  },
  description: {
    fontSize: '0.85rem',
    color: '#888',
    textAlign: 'center',
    lineHeight: '1.4',
    marginBottom: '2rem',
    maxWidth: '350px',
  },
  plansContainer: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  planCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '1.5rem',
    position: 'relative',
    cursor: 'pointer',
    border: '2px solid white', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: 'all 0.2s',
  },
  activeCard: {
    borderImage: 'linear-gradient(to right, #a855f7, #f97316) 1',
    boxShadow: '0 8px 25px rgba(168, 85, 247, 0.15)',
    border: '2px solid #a855f7',
  },
  badgeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '1rem',
  },
  planName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#555',
  },
  badge: {
    color: 'white',
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  checkIcon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },
  planDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontSize: '0.8rem',
    color: '#777',
    lineHeight: '1.6',
    maxWidth: '60%',
  },
  priceWrapper: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  oldPrice: {
    fontSize: '0.75rem',
    color: '#999',
    textDecoration: 'line-through',
  },
  mainPrice: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: '#444',
  },
  period: {
    fontSize: '0.7rem',
    fontWeight: '400',
    color: '#888',
  },
  
  /* Area Bawah (Tombol Subscribe) */
  bottomAction: {
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    marginTop: 'auto', /* Dorong ke bawah */
    paddingBottom: '2rem', /* Jarak aman tambahan */
  },
  trialText: {
    fontSize: '1.1rem',
    fontWeight: '700',
    background: 'linear-gradient(to right, #a855f7, #f97316)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.8rem',
  },
  subscribeButton: {
    width: '100%',
    padding: '1.2rem',
    borderRadius: '50px',
    border: 'none',
    background: 'linear-gradient(to right, #a855f7, #f97316)',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)',
    marginBottom: '20px' /* Pastikan ada ruang di bawah tombol */
  }
};