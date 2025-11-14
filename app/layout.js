import MainLayout from './components/MainLayout';
import './globals.css';

export const metadata = {
  title: 'Contoh Navigasi Responsif',
  description: 'Dibuat dengan Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}