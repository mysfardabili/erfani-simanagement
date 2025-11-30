'use client'; 

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import { useState, useEffect } from 'react'; // Import React Hooks
import {
  HiOutlineGlobeAlt,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineArchiveBox,
} from 'react-icons/hi2';
import styles from '@/styles/MainLayout.module.css';
import SplashScreen from './SplashScreen'; // Import SplashScreen disini

const navItems = [
  { href: '/', icon: HiOutlineGlobeAlt, label: 'Beranda' },
  { href: '/calendar', icon: HiOutlineCalendar, label: 'Kalender' },
  { href: '/styling', icon: HiOutlineSparkles, label: 'Styling' },
  { href: '/wardrobe', icon: HiOutlineArchiveBox, label: 'Lemari' },
];

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // --- STATE UNTUK ALUR APLIKASI ---
  // Default true agar saat pertama load langsung muncul splash
  const [showSplash, setShowSplash] = useState(true); 

  // Fungsi yang dijalankan setelah Splash Screen selesai (2.5 detik)
  const handleSplashFinish = () => {
    setShowSplash(false);
    // Setelah splash selesai, redirect ke halaman Login
    // Tapi hanya jika kita sedang di root ('/') agar user tidak kaget
    if (pathname === '/') {
      router.push('/login');
    }
  };

  // --- LOGIKA NAVIGASI ---
  const disableNav = ['/login', '/register'];
  const isAuthPage = disableNav.includes(pathname);

  const NavLink = ({ href, icon: Icon, label }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
      >
        <Icon size={24} />
        <span className={styles.navLabel}>{label}</span>
      </Link>
    );
  };

  return (
    <div className={styles.container}>
      {/* Tampilkan Splash Screen jika showSplash masih true.
        SplashScreen punya z-index tinggi jadi akan menutupi konten lain.
      */}
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      {/* Sidebar Desktop */}
      {!isAuthPage && (
        <nav className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>
        </nav>
      )}

      {/* Konten Utama */}
      <main className={styles.mainContent} style={isAuthPage ? { marginLeft: 0, width: '100%', padding: 0 } : {}}>
        {children}
      </main>

      {/* Bottom Nav Mobile */}
      {!isAuthPage && (
        <nav className={styles.bottomNav}>
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
      )}
    </div>
  );
}