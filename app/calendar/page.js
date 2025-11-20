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
  
  // State untuk tanggal & bulan
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // --- DATA ---
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Simulasi Event (Format YYYY-MM-DD)
  const events = [
    "2025-10-05",
    "2025-10-12",
    "2025-11-24",
    new Date().toISOString().split('T')[0] // Hari ini
  ];

  // --- LOGIKA HELPER ---
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleNavigation = (path) => {
    if (path) router.push(path);
    else alert("Fitur ini akan segera hadir!");
  };

  // Generate Grid Tanggal
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarDays = [...blanks, ...days];

  // --- LOGIKA CHECKER (Dipisah agar JSX rapi) ---
  
  // Cek apakah ada event di tanggal tertentu (untuk dot merah di kalender)
  const hasEvent = (day) => {
    if (!day) return false;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.includes(dateStr);
  };

  // Cek apakah tanggal dipilih (untuk highlight biru tua)
  const isSelected = (day) => {
    if (!day) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Cek apakah hari ini (untuk border biru)
  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // Format string tanggal terpilih untuk preview event
  const selectedDateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const isSelectedDateHasEvent = events.includes(selectedDateString);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        
        {/* === BAGIAN KIRI: KALENDER === */}
        <div className={styles.calendarSection}>
          
          {/* Header */}
          <div className={styles.calendarHeader}>
            <span className={styles.monthTitle}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={prevMonth} className={styles.navBtn}>
                <HiChevronLeft size={20} />
              </button>
              <button onClick={nextMonth} className={styles.navBtn}>
                <HiChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Nama Hari */}
          <div className={styles.weekDays}>
            {weekDays.map(day => <div key={day}>{day}</div>)}
          </div>

          {/* Grid Tanggal */}
          <div className={styles.daysGrid}>
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`
                  ${styles.dayCell} 
                  ${!day ? styles.empty : ''}
                  ${isSelected(day) ? styles.active : ''}
                  ${isToday(day) ? styles.today : ''}
                  ${hasEvent(day) ? styles.hasEvent : ''}
                `}
                onClick={() => {
                  if (day) {
                    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
                  }
                }}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Preview Event Panel */}
          <div className={styles.eventPreview}>
            <h4 className={styles.eventDateTitle}>
              Schedule for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h4>
            
            {isSelectedDateHasEvent ? (
              <div className={styles.eventItem}>
                <span style={{fontSize: '1.2rem'}}>🎉</span>
                <div>
                  <p style={{fontWeight: '600', color: '#334155'}}>Fashion Meetup</p>
                  <p style={{fontSize: '0.8rem', color: '#64748b'}}>10:00 AM - Central Park</p>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic' }}>
                No events planned for this day.
              </p>
            )}
          </div>
        </div>

        {/* === BAGIAN KANAN: TOMBOL AKSI === */}
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
              onClick={() => alert("Fitur Discover...")}
            >
              <HiOutlineArchiveBox className={styles.btnIcon} />
              <span className={styles.actionLabel}>Discover<br/>new outfit</span>
            </button>
            
            <button 
              className={styles.actionBtn}
              onClick={() => alert("Fitur Kamera...")}
            >
              <HiOutlineCamera className={styles.btnIcon} />
              <span className={styles.actionLabel}>Add outfit<br/>photo</span>
            </button>
          </div>

          <button 
            className={styles.longBtn}
            onClick={() => alert("Event Manager...")}
          >
            <HiOutlineBriefcase size={20} />
            Add or view events
          </button>
        </div>

      </div>
    </div>
  );
}