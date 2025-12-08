'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  HiPlus, HiEllipsisVertical, HiOutlineBookmark, HiOutlineSquares2X2, 
  HiOutlineChartBar, HiChevronRight, HiMagnifyingGlass, HiOutlineHeart, 
  HiOutlineEye, HiOutlineAdjustmentsHorizontal, HiLockClosed 
} from 'react-icons/hi2';
import styles from '@/styles/Lemari.module.css';
import { wardrobeData } from '../data/items';
import { useUser } from '../context/UserContext'; // Import Context

export default function WardrobePage() {
  const { isPremium } = useUser(); // Cek status
  const router = useRouter();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    let result = wardrobeData.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    // === LOGIKA PREMIUM: BATASI 5 ITEM UNTUK FREE USER ===
    if (!isPremium) {
      return result.slice(0, 5);
    }
    return result;
  }, [activeCategory, searchQuery, isPremium]);

  const categories = [
    { label: 'All', value: 'All', icon: '👜' },
    { label: 'Bags', value: 'bag', icon: '👜' },
    { label: 'Bottoms', value: 'bawahan', icon: '👖' },
    { label: 'Footwear', value: 'sepatu', icon: '👟' },
    { label: 'Tops', value: 'atasan', icon: '🧥' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.purpleHeader}>
        <div className={styles.headerTopRow}><HiEllipsisVertical className={styles.menuDotIcon} /></div>
      </div>

      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarCircle}><span className={styles.avatarText}>E</span></div>
          {/* Badge berubah jika Premium */}
          <div className={styles.completeBadge} style={isPremium ? {background: '#a855f7'} : {}}>
            {isPremium ? 'PRO MEMBER' : '50% complete'}
          </div>
        </div>
        <h2 className={styles.userName}>Erfani {isPremium && '⭐'}</h2>
        <p className={styles.userHandle}>@fanyzkrf</p>
        
        <div className={styles.statsRow}>
          <div className={`${styles.statItem} ${styles.activeStat}`}>
            <span className={styles.statCount}>{isPremium ? wardrobeData.length : 5}</span>
            <span className={styles.statLabel}>Items</span>
          </div>
          {/* ... stats lainnya ... */}
        </div>
      </div>

      {/* Banner Upgrade untuk Free User */}
      {!isPremium && (
        <div className={styles.scheduleBanner} onClick={() => router.push('/premium')}>
          <div>
            <div className={styles.bannerTitle} style={{color: '#a855f7'}}>Upgrade to PRO</div>
            <div className={styles.bannerSubtitle}>Unlock unlimited items</div>
          </div>
          <HiChevronRight size={20} color="#a855f7" />
        </div>
      )}

      {/* Categories & Search (Kode sama seperti sebelumnya, dipersingkat) */}
      <div className={styles.categoriesScroll}>
        {categories.map((cat) => (
           <div key={cat.label} className={`${styles.catItem} ${activeCategory === cat.value ? styles.active : ''}`} onClick={() => setActiveCategory(cat.value)}>
             <div className={styles.catCircle}><span>{cat.icon}</span></div>
             <span className={styles.catLabel}>{cat.label}</span>
           </div>
        ))}
      </div>

      <div className={styles.searchToolbar}>
         {/* ... search input code ... */}
      </div>

      {/* Grid Items */}
      <div className={styles.grid}>
        {filteredItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image src={item.src} alt={item.name} fill className={styles.cardImage} sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          </div>
        ))}
        
        {/* Card Terkunci untuk Free User */}
        {!isPremium && (
          <div className={styles.card} onClick={() => router.push('/premium')} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', border: '2px dashed #d1d5db', minHeight: '150px', cursor: 'pointer'}}>
             <HiLockClosed size={30} color="#9ca3af" />
             <p style={{fontSize: '0.8rem', color: '#9ca3af', marginTop: '10px', fontWeight: '600'}}>+ More Items</p>
             <span style={{fontSize: '0.7rem', color: '#a855f7', fontWeight: 'bold'}}>Tap to Unlock</span>
          </div>
        )}
      </div>

      {/* ... FAB & Menu Popup code ... */}
    </div>
  );
}