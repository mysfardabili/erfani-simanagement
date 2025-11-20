'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  HiOutlineArchiveBox, 
  HiOutlineSparkles, 
  HiOutlineCamera, 
  HiOutlineBriefcase,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi2';
import styles from '@/styles/Calendar.module.css';

export default function CalendarPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(17);

  // Navigasi Halaman
  const handleNavigation = (path) => {
    // Cek apakah path tersedia (simulasi)
    if (path) {
      router.push(path);
    } else {
      alert("Fitur ini sedang dalam pengembangan!");
    }
  };

  // Simulasi Tanggal
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const days = Array.from({ length: 35 }, (_, i) => {
    const day = i - 1;
    return day > 0 && day <= 31 ? day : ''; 
  });

  // Simulasi Event
  const eventDays = [5, 12, 24]; 

  return (
    <div className={styles.container}>
      {/* Hanya tampil judul di mobile jika perlu, atau hilangkan */}
      
      <div className={styles.contentWrapper}>
        
        {/* Kiri: Kalender Interaktif */}
        <div className={styles.calendarSection}>
          <div className={styles.calendarHeader}>
            <span className={styles.monthTitle}>October 2025</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <HiChevronLeft style={{ cursor: 'pointer' }} />
              <HiChevronRight style={{ cursor: 'pointer' }} />
            </div>
          </div>

          <div className={styles.weekDays}>
            {weekDays.map(day => <div key={day}>{day}</div>)}
          </div>
          <div className={styles.daysGrid}>
            {days.map((day, index) => (
              <div 
                key={index} 
                className={`
                  ${styles.dayCell} 
                  ${day === selectedDate ? styles.active : ''}
                  ${eventDays.includes(day) ? styles.hasEvent : ''}
                `}
                onClick={() => day && setSelectedDate(day)}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Desktop Only: Event List Preview (Opsional) */}
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Schedule for Oct {selectedDate}</h4>
            {eventDays.includes(selectedDate) ? (
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>🎉 Fashion Event: Casual Meetup</p>
            ) : (
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No events planned.</p>
            )}
          </div>
        </div>

        {/* Kanan: Action Buttons Fungsional */}
        <div className={styles.actionSection}>
          <div className={styles.actionGrid}>
            <button 
              className={styles.actionBtn}
              onClick={() => handleNavigation('/wardrobe')}
            >
              <HiOutlineArchiveBox className={styles.btnIcon} />
              <span className={styles.actionLabel}>Add from<br/>Wardrobe</span>
            </button>
            
            <button 
              className={styles.actionBtn}
              onClick={() => handleNavigation('/styling')}
            >
              <HiOutlineSparkles className={styles.btnIcon} />
              <span className={styles.actionLabel}>Create<br/>new outfit</span>
            </button>
            
            <button 
              className={styles.actionBtn}
              onClick={() => alert("Membuka fitur Discover...")}
            >
              <HiOutlineArchiveBox className={styles.btnIcon} />
              <span className={styles.actionLabel}>Discover<br/>new outfit</span>
            </button>
            
            <button 
              className={styles.actionBtn}
              onClick={() => alert("Membuka Kamera...")}
            >
              <HiOutlineCamera className={styles.btnIcon} />
              <span className={styles.actionLabel}>Add outfit<br/>photo</span>
            </button>
          </div>

          <button 
            className={styles.longBtn}
            onClick={() => alert("Membuka Event Manager...")}
          >
            <HiOutlineBriefcase size={20} />
            Add or view events
          </button>
        </div>

      </div>
    </div>
  );
}