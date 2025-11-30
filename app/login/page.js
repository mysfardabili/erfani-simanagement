'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Di sini nanti logika validasi ke database
    router.push('/'); // Redirect ke Dashboard setelah login
  };

  return (
    <div style={styles.container}>
      {/* Bagian Atas: Gambar Latar */}
      <div style={styles.imageSection}>
        {/* Pastikan Anda punya file 'login-bg.png' di folder public. 
            Jika tidak, div ini akan menampilkan warna background fallback. */}
      </div>

      {/* Bagian Bawah: Form Input */}
      <div style={styles.formSection}>
        {/* Judul Gradient */}
        <h1 style={styles.gradientTitle}>Start here</h1>
        <h2 style={styles.subTitle}>Sign in</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          
          {/* Tombol Login (Saya tambahkan agar bisa diklik) */}
          <button type="submit" style={styles.loginButton}>
            Masuk
          </button>
        </form>

        <p style={styles.footerText}>
          New here? <Link href="/register" style={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fafafa',
  },
  imageSection: {
    flex: 1.2, // Mengambil porsi lebih besar di atas (60%)
    backgroundImage: 'url(/login-bg.png)', // GANTI dengan nama file gambar background Anda
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#f3e8ff', // Warna cadangan jika gambar belum ada
    minHeight: '300px',
  },
  formSection: {
    flex: 1, // Bagian bawah (40%)
    backgroundColor: '#fafafa', // Warna background bawah (sedikit abu terang)
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderTopLeftRadius: '30px',
    borderTopRightRadius: '30px',
    marginTop: '-30px', // Efek menumpuk sedikit ke atas
    zIndex: 10,
  },
  gradientTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '0.2rem',
    background: 'linear-gradient(to right, #a855f7, #ec4899, #f97316)', // Ungu -> Pink -> Orange
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  form: {
    width: '100%',
    maxWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    width: '100%',
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)', // Bayangan halus
    fontSize: '1rem',
    outline: 'none',
  },
  loginButton: {
    marginTop: '0.5rem',
    padding: '1rem',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(to right, #a855f7, #ec4899)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  footerText: {
    marginTop: '2rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  link: {
    color: '#1f2937', // Warna hitam tebal sesuai gambar
    fontWeight: '800',
    textDecoration: 'none',
  }
};