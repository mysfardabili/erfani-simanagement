import { Inter } from 'next/font/google';
import MainLayout from './components/MainLayout';
import './globals.css';

// Menggunakan font Inter sebagai pengganti font default
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SIManagement - Wardrobe App',
  description: 'Atur pakaian dan jadwal outfitmu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}