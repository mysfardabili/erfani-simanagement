import { Inter } from 'next/font/google';
import MainLayout from './components/MainLayout';
import { UserProvider } from './context/UserContext'; // Import Provider
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SIManagement - Wardrobe App',
  description: 'Atur pakaian dan jadwal outfitmu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider> {/* Pasang Provider di sini */}
          <MainLayout>{children}</MainLayout>
        </UserProvider>
      </body>
    </html>
  );
}