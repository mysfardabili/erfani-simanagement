'use client';

import { useState } from 'react';
import { 
  HiOutlineHeart, 
  HiHeart,
  HiOutlineAdjustmentsHorizontal, 
  HiPlus,
  HiMagnifyingGlass
} from 'react-icons/hi2';
import styles from '@/styles/Lemari.module.css';

// Data Dummy dengan Gambar Asli (Unsplash)
const initialItems = [
  { id: 1, title: 'Wide Leg Trousers', category: 'Pants', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80', type: 'pants', liked: false },
  { id: 2, title: 'Casual Striped Shirt', category: 'Top', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80', type: 'top', liked: true },
  { id: 3, title: 'White Sneakers', category: 'Shoes', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&q=80', type: 'shoes', liked: false },
  { id: 4, title: 'Leather Handbag', category: 'Bag', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80', type: 'bag', liked: false },
  { id: 5, title: 'Denim Jacket', category: 'Outer', image: 'https://images.unsplash.com/photo-1523205565295-f8e91625443b?w=500&q=80', type: 'outer', liked: false },
  { id: 6, title: 'Summer Hat', category: 'Accessories', image: 'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=500&q=80', type: 'hat', liked: false },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState(initialItems);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { label: 'All', id: 'All', icon: '⚡' },
    { label: 'Outer', id: 'outer', icon: '🧥' },
    { label: 'Pants', id: 'pants', icon: '👖' },
    { label: 'Bags', id: 'bag', icon: '👜' },
    { label: 'Shoes', id: 'shoes', icon: '👟' },
    { label: 'Hats', id: 'hat', icon: '🧢' },
  ];

  // Fungsi Filter
  const filteredItems = items.filter(item => {
    const matchCategory = activeCategory === 'All' || item.type === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Fungsi Toggle Like
  const toggleLike = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, liked: !item.liked } : item
    ));
  };

  // Fungsi Alert Mock
  const handleAction = (action) => {
    alert(`Fitur "${action}" akan segera hadir!`);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.greeting}>
          <h1>Hallo, Erfani 👋</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Siap untuk tampil keren hari ini?</p>
        </div>
        <div className={styles.avatar} onClick={() => handleAction('Profile Settings')}>👩🏻</div>
      </header>

      {/* Statistics Cards */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{items.length}</span>
          <span className={styles.statLabel}>Total Items</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>5</span>
          <span className={styles.statLabel}>Outfits Created</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{categories.length - 1}</span>
          <span className={styles.statLabel}>Categories</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <HiMagnifyingGlass className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="Cari pakaianmu..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className={styles.iconBtn} onClick={() => handleAction('Filter Favorites')}>
          <HiOutlineHeart size={24} />
        </button>
        <button className={styles.iconBtn} onClick={() => handleAction('Advanced Filter')}>
          <HiOutlineAdjustmentsHorizontal size={24} />
        </button>
      </div>

      {/* Category Pills */}
      <div className={styles.categoriesRow}>
        {categories.map((cat) => (
          <button 
            key={cat.id} 
            className={`${styles.catBtn} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className={styles.productGrid}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className={styles.card} onClick={() => handleAction(`View ${item.title}`)}>
              <div className={styles.imageWrapper}>
                 <button 
                   className={`${styles.heartBtn} ${item.liked ? styles.liked : ''}`}
                   onClick={(e) => {
                     e.stopPropagation();
                     toggleLike(item.id);
                   }}
                 >
                   {item.liked ? <HiHeart size={20} /> : <HiOutlineHeart size={20} />}
                 </button>
                 <img src={item.image} alt={item.title} className={styles.cardImage} />
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardCategory}>{item.category}</p>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <p>Tidak ada item yang ditemukan 😔</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <button className={styles.fab} onClick={() => handleAction('Add New Item')}>
        <HiPlus size={28} />
      </button>
    </div>
  );
}