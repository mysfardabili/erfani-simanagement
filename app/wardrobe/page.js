'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  HiPlus, 
  HiEllipsisVertical, 
  HiOutlineBookmark, 
  HiOutlineSquares2X2, 
  HiOutlineChartBar, 
  HiChevronRight,
  HiMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineEye,
  HiOutlineAdjustmentsHorizontal
} from 'react-icons/hi2';
import styles from '@/styles/Lemari.module.css';
import { wardrobeData } from '../data/items';

export default function WardrobePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Kategori UI mapping ke Data Category
  const categories = [
    { label: 'All', value: 'All', icon: '👜' }, // Icon tas sebagai simbol All/Bag
    { label: 'Bags', value: 'bag', icon: '👜' }, // Karena di data items.js belum ada 'bag', ini placeholder
    { label: 'Bottoms', value: 'bawahan', icon: '👖' },
    { label: 'Footwear', value: 'sepatu', icon: '👟' },
    { label: 'Tops', value: 'atasan', icon: '🧥' },
  ];

  // Filter Logic
  const filteredItems = useMemo(() => {
    return wardrobeData.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className={styles.container}>
      
      {/* 1. Purple Header Background */}
      <div className={styles.purpleHeader}>
        <div className={styles.headerTopRow}>
          <HiEllipsisVertical className={styles.menuDotIcon} />
        </div>
      </div>

      {/* 2. Profile Card (Floating) */}
      <div className={styles.profileSection}>
        {/* Icons Top Right */}

        {/* Avatar with Progress */}
        <div className={styles.avatarContainer}>
          <div className={styles.avatarCircle}>
            <span className={styles.avatarText}>E</span>
          </div>
        </div>

        {/* Info */}
        <h2 className={styles.userName}>Erfani</h2>
        <p className={styles.userHandle}>@fanyzkrf</p>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={`${styles.statItem} ${styles.activeStat}`}>
            <span className={styles.statCount}>{wardrobeData.length}</span>
            <span className={styles.statLabel}>Items</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statCount}>1</span>
            <span className={styles.statLabel}>Outfits</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statCount}>0</span>
            <span className={styles.statLabel}>Lookbooks</span>
          </div>
        </div>
      </div>

      {/* 3. Schedule Banner */}
      <div className={styles.scheduleBanner}>
        <div>
          <div className={styles.bannerTitle}>Schedule an outfit</div>
          <div className={styles.bannerSubtitle}>Set up 50% complete</div>
        </div>
        <HiChevronRight size={20} color="#9ca3af" />
      </div>

      {/* 4. Category Filters (Circles) */}
      <div className={styles.categoriesScroll}>
        {categories.map((cat) => (
          <div 
            key={cat.label} 
            className={`${styles.catItem} ${activeCategory === cat.value ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.value)}
          >
            <div className={styles.catCircle}>
              {/* Gambar Tas di 'All' sesuai desain */}
              {cat.label === 'All' ? (
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2954/2954888.png" 
                  alt="All" width={30} height={30} 
                  style={{opacity: 0.8}}
                />
              ) : (
                <span>{cat.icon}</span>
              )}
            </div>
            <span className={styles.catLabel}>{cat.label}</span>
          </div>
        ))}
      </div>

      {/* 5. Search & Filter Toolbar */}
      <div className={styles.searchToolbar}>
        <div className={styles.searchBox}>
          <HiMagnifyingGlass size={20} color="#9ca3af" />
          <input 
            type="text" 
            placeholder="Search" 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className={styles.squareBtn}><HiOutlineHeart size={22} /></button>
        <button className={styles.squareBtn}><HiOutlineEye size={22} /></button>
        <button className={styles.squareBtn}><HiOutlineAdjustmentsHorizontal size={22} /></button>
      </div>

      {/* 6. Grid Items */}
      <div className={styles.grid}>
        {filteredItems.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image 
                src={item.src} 
                alt={item.name}
                fill
                className={styles.cardImage}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* === MENU POPUP & FAB (Tetap Ada) === */}
      {isMenuOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
          <div className={styles.menuPopup}>
            <button className={styles.menuItem} onClick={() => alert('Add items')}>Add items</button>
            <button className={styles.menuItem} onClick={() => alert('Create outfit')}>Create an outfit</button>
            <button className={styles.menuItem} onClick={() => alert('Create lookbook')}>Create lookbook</button>
          </div>
        </>
      )}

      <button 
        className={styles.fab} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          transform: isMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          backgroundColor: isMenuOpen ? '#374151' : '#1f2937'
        }}
      >
        <HiPlus size={28} />
      </button>

    </div>
  );
}