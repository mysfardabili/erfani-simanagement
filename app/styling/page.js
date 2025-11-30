'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import styles from '@/styles/Styling.module.css';
import { wardrobeData } from '../data/items';

export default function StylingPage() {
  const [activeTab, setActiveTab] = useState('atasan');
  
  // --- STATE SAFE INITIALIZATION (Mencegah White Screen) ---
  // Cari item pertama untuk setiap kategori sebagai default. 
  // Jika tidak ketemu, pakai fallback object kosong agar tidak crash.
  const defaultTop = wardrobeData.find(i => i.category === 'atasan') || {};
  const defaultBottom = wardrobeData.find(i => i.category === 'bawahan') || {};
  const defaultShoes = wardrobeData.find(i => i.category === 'sepatu') || {};

  const [currentOutfit, setCurrentOutfit] = useState({
    atasan: defaultTop,
    bawahan: defaultBottom,
    sepatu: defaultShoes
  });

  // State Riwayat Design
  const [savedDesigns, setSavedDesigns] = useState([]);

  // Filter data untuk Grid di bawah
  const filteredItems = useMemo(() => {
    return wardrobeData.filter(item => item.category === activeTab);
  }, [activeTab]);

  const handleSelectItem = (item) => {
    setCurrentOutfit(prev => ({ ...prev, [activeTab]: item }));
  };

  const handleSaveDesign = () => {
    // Validasi sederhana: pastikan outfit lengkap sebelum simpan
    if(currentOutfit.atasan.id && currentOutfit.bawahan.id && currentOutfit.sepatu.id) {
        setSavedDesigns([{ id: Date.now(), ...currentOutfit }, ...savedDesigns]);
        alert("Outfit berhasil disimpan ke 'Design Terakhir'!");
    } else {
        alert("Pilih outfit lengkap dulu!");
    }
  };

  const handleLoadDesign = (design) => {
    setCurrentOutfit({
      atasan: design.atasan,
      bawahan: design.bawahan,
      sepatu: design.sepatu
    });
  };

  const tabs = [
    { id: 'atasan', label: 'Atasan' },
    { id: 'bawahan', label: 'Bawahan' },
    { id: 'sepatu', label: 'Sepatu' },
  ];

  return (
    <div className={styles.container}>
      
      {/* === VISUAL AREA === */}
      <div className={styles.canvasSection}>
        <div className={styles.infoButtons}>
          <button className={styles.infoChip}>TB 170</button>
          <button className={styles.infoChip}>BB 60</button>
        </div>

        <div className={styles.mannequinStage}>
          {/* Layer Atasan */}
          <div className={styles.slotItem + ' ' + styles.slotTop}>
            {currentOutfit.atasan.src ? (
              <Image 
                src={currentOutfit.atasan.src} 
                alt="Atasan" 
                width={300} height={300} 
                className={styles.itemImage} 
                priority
              />
            ) : <div className={styles.placeholder}>Pilih Atasan</div>}
          </div>

          {/* Layer Bawahan */}
          <div className={styles.slotItem + ' ' + styles.slotBottom}>
            {currentOutfit.bawahan.src ? (
              <Image 
                src={currentOutfit.bawahan.src} 
                alt="Bawahan" 
                width={300} height={300} 
                className={styles.itemImage}
              />
            ) : <div className={styles.placeholder}>Pilih Bawahan</div>}
          </div>

          {/* Layer Sepatu */}
          <div className={styles.slotItem + ' ' + styles.slotShoes}>
            {currentOutfit.sepatu.src ? (
              <Image 
                src={currentOutfit.sepatu.src} 
                alt="Sepatu" 
                width={300} height={200} 
                className={styles.itemImage}
              />
            ) : <div className={styles.placeholder}>Pilih Sepatu</div>}
          </div>
        </div>
      </div>

      {/* === CONTROL PANEL === */}
      <div className={styles.controlPanel}>
        <div className={styles.handleBar}></div>
        
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Mix & Match</h2>
          <button className={styles.saveButton} onClick={handleSaveDesign}>Simpan</button>
        </div>

        {/* Tab Kategori */}
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid Item Pilihan */}
        <div className={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className={`${styles.itemCard} ${currentOutfit[activeTab]?.id === item.id ? styles.selected : ''}`}
              onClick={() => handleSelectItem(item)}
            >
              <Image 
                src={item.src} 
                alt={item.name} 
                width={100} height={100} 
                className={styles.itemThumbnail}
              />
            </div>
          ))}
        </div>

        {/* Design Terakhir (Horizontal Scroll) */}
        {savedDesigns.length > 0 && (
            <div className={styles.historySection}>
                <div className={styles.historyTitle}>Design Terakhir</div>
                <div className={styles.historyList}>
                    {savedDesigns.map((design) => (
                        <div 
                            key={design.id} 
                            className={styles.historyCard}
                            onClick={() => handleLoadDesign(design)}
                        >
                            <Image 
                                src={design.atasan.src} 
                                alt="saved" 
                                width={60} height={60} 
                                style={{objectFit:'contain'}} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
}