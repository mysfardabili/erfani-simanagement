'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/Styling.module.css';
import { wardrobeData } from '../data/items';

export default function StylingPage() {
  const [activeTab, setActiveTab] = useState('atasan');
  
  // State untuk outfit yang dipilih (INDIVIDUAL per kategori)
  const defaultTop = wardrobeData.find(i => i.category === 'atasan') || {};
  const defaultBottom = wardrobeData.find(i => i.category === 'bawahan') || {};
  const defaultShoes = wardrobeData.find(i => i.category === 'sepatu') || {};

  const [selectedOutfit, setSelectedOutfit] = useState({
    atasan: defaultTop,
    bawahan: defaultBottom,
    sepatu: defaultShoes,
  });

  const [savedDesigns, setSavedDesigns] = useState([]);

  // Handler: Pilih Item INDIVIDUAL
  const handleSelectItem = (item) => {
    setSelectedOutfit(prev => ({
      ...prev,
      [activeTab]: item // Update HANYA kategori yang aktif
    }));
  };

  // Handler: Simpan Design
  const handleSaveDesign = () => {
    if (selectedOutfit.atasan.id && selectedOutfit.bawahan.id && selectedOutfit.sepatu.id) {
      const newDesign = {
        id: Date.now(),
        ...selectedOutfit,
        timestamp: new Date().toLocaleString('id-ID')
      };
      setSavedDesigns([newDesign, ...savedDesigns]);
      alert('✅ Outfit berhasil disimpan!');
    } else {
      alert('⚠️ Pilih outfit lengkap dulu!');
    }
  };

  // Filter data berdasarkan tab aktif
  const filteredItems = wardrobeData.filter(item => item.category === activeTab);

  const tabs = [
    { id: 'atasan', label: 'Atasan', icon: '👕' },
    { id: 'bawahan', label: 'Bawahan', icon: '👖' },
    { id: 'sepatu', label: 'Sepatu', icon: '👞' },
  ];

  return (
    <div className={styles.container}>
      
      {/* === MANNEQUIN SECTION === */}
      <div className={styles.mannequinSection}>
        
        {/* Info Chips (TB/BB/Custom) */}
        <div className={styles.infoChips}>
          <div className={styles.chip}>TB 170</div>
          <div className={styles.chip}>BB 60</div>
          <div className={styles.chip}>Custom</div>
        </div>

        {/* Mannequin Display */}
        <div className={styles.mannequinContainer}>
          {/* Head */}
          <div className={styles.mannequinHead}></div>

          {/* Body with Layered Outfit */}
          <div className={styles.bodyWrapper}>
            
            {/* Layer 1: ATASAN */}
            <div className={styles.layerTop}>
              {selectedOutfit.atasan.src ? (
                <Image
                  src={selectedOutfit.atasan.src}
                  alt={selectedOutfit.atasan.name}
                  width={280}
                  height={280}
                  className={styles.outfitImage}
                  priority
                />
              ) : (
                <div className={styles.placeholder}>Pilih Atasan</div>
              )}
            </div>

            {/* Layer 2: BAWAHAN */}
            <div className={styles.layerBottom}>
              {selectedOutfit.bawahan.src ? (
                <Image
                  src={selectedOutfit.bawahan.src}
                  alt={selectedOutfit.bawahan.name}
                  width={280}
                  height={300}
                  className={styles.outfitImage}
                />
              ) : (
                <div className={styles.placeholder}>Pilih Bawahan</div>
              )}
            </div>

            {/* Layer 3: SEPATU */}
            <div className={styles.layerShoes}>
              {selectedOutfit.sepatu.src ? (
                <Image
                  src={selectedOutfit.sepatu.src}
                  alt={selectedOutfit.sepatu.name}
                  width={200}
                  height={120}
                  className={styles.outfitImage}
                />
              ) : (
                <div className={styles.placeholder}>Pilih Sepatu</div>
              )}
            </div>
          </div>

          {/* Current Outfit Labels */}
          <div className={styles.outfitLabel}>
            <div className={styles.labelItem}>
              <span className={styles.labelIcon}>👕</span>
              <span className={styles.labelText}>
                {selectedOutfit.atasan.name || 'Belum dipilih'}
              </span>
            </div>
            <div className={styles.labelItem}>
              <span className={styles.labelIcon}>👖</span>
              <span className={styles.labelText}>
                {selectedOutfit.bawahan.name || 'Belum dipilih'}
              </span>
            </div>
            <div className={styles.labelItem}>
              <span className={styles.labelIcon}>👞</span>
              <span className={styles.labelText}>
                {selectedOutfit.sepatu.name || 'Belum dipilih'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* === CONTROL PANEL === */}
      <div className={styles.controlPanel}>
        
        {/* Tab Navigation */}
        <div className={styles.tabsContainer}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabActive : ''}`}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Items Grid (Pilihan Outfit per Kategori) */}
        <div className={styles.itemsGrid}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => handleSelectItem(item)}
              className={`${styles.itemCard} ${
                selectedOutfit[activeTab]?.id === item.id ? styles.itemSelected : ''
              }`}
            >
              <Image
                src={item.src}
                alt={item.name}
                width={100}
                height={100}
                className={styles.itemThumb}
              />
              <span className={styles.itemName}>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button 
            className={styles.btnSecondary}
            onClick={() => alert('Fitur Lihat Semua (Coming Soon)')}
          >
            Lihat Semua
          </button>
          <button 
            className={styles.btnPrimary}
            onClick={handleSaveDesign}
          >
            Simpan Design
          </button>
        </div>

        {/* Saved Designs History */}
        {savedDesigns.length > 0 && (
          <div className={styles.historySection}>
            <h4 className={styles.historyTitle}>Design Terakhir</h4>
            <div className={styles.historyScroll}>
              {savedDesigns.map(design => (
                <div 
                  key={design.id} 
                  className={styles.historyCard}
                  onClick={() => setSelectedOutfit({
                    atasan: design.atasan,
                    bawahan: design.bawahan,
                    sepatu: design.sepatu
                  })}
                >
                  <Image
                    src={design.atasan.src}
                    alt="Design"
                    width={60}
                    height={60}
                    className={styles.historyThumb}
                  />
                  <span className={styles.historyTime}>{design.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}