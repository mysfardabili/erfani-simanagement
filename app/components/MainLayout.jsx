'use client'; // Wajib untuk hooks seperti usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiOutlineGlobeAlt,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineArchiveBox,
} from 'react-icons/hi2';
import styles from '@/styles/MainLayout.module.css';

// 1. Definisikan item navigasi kita
const navItems = [
  { href: '/', icon: HiOutlineGlobeAlt, label: 'Beranda' },
  { href: '/calendar', icon: HiOutlineCalendar, label: 'Kalender' },
  { href: '/styling', icon: HiOutlineSparkles, label: 'Styling' },
  { href: '/wardrobe', icon: HiOutlineArchiveBox, label: 'Lemari' },
];

export default function MainLayout({ children }) {
  const pathname = usePathname();

  // Helper untuk membuat satu link
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
      {/* 2. Navigasi Samping (HANYA TAMPIL DI DESKTOP) */}
      <nav className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
      </nav>

      {/* 3. Konten Halaman Utama */}
      <main className={styles.mainContent}>{children}</main>

      {/* 4. Navigasi Bawah (HANYA TAMPIL DI MOBILE) */}
      <nav className={styles.bottomNav}>
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </div>
  );
}