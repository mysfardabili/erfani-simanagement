'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulasi register sukses
    router.push('/login');
  };

  return (
    <div style={styles.container}>
      {/* Logo */}
      <div style={styles.logoWrapper}>
        <Image 
          src="/logo.png" 
          alt="Logo SIManagement"
          width={120} 
          height={120} 
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Judul Gradient */}
      <h1 style={styles.gradientTitle}>Sign up</h1>

      {/* Form Input */}
      <form onSubmit={handleRegister} style={styles.form}>
        <input type="text" placeholder="Name" style={styles.input} required />
        <input type="email" placeholder="Email" style={styles.input} required />
        <input type="password" placeholder="Password" style={styles.input} required />
        <input type="password" placeholder="Confirm Password" style={styles.input} required />

        {/* Tombol Continue (Pink/Ungu Pill Shape) */}
        <button type="submit" style={styles.submitButton}>
          Continue
        </button>
      </form>

      {/* Link balik ke Login (Opsional, jaga-jaga user salah klik) */}
      <p style={{marginTop: '1rem', fontSize: '0.8rem', color: '#999'}}>
        Already have an account? <Link href="/login" style={{color: '#d946ef'}}>Log in</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', // Konten di tengah vertikal
    backgroundColor: '#fafafa', // Background abu sangat terang/putih
    padding: '2rem',
  },
  logoWrapper: {
    marginBottom: '1rem',
  },
  gradientTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '2rem',
    // Gradient text sesuai gambar (Ungu -> Orange)
    background: 'linear-gradient(to right, #a855f7, #f97316)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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
    borderRadius: '10px', // Sedikit membulat
    border: 'none',
    backgroundColor: '#ffffff', // Putih
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)', // Bayangan sangat tipis
    fontSize: '0.95rem',
    color: '#333',
    outline: 'none',
  },
  submitButton: {
    marginTop: '2rem',
    padding: '1rem',
    borderRadius: '50px', // Pill shape (Sangat bulat)
    border: 'none',
    // Warna pink ungu muda (Lilac) sesuai tombol "Continue" di gambar
    backgroundColor: '#e0aaff', 
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(224, 170, 255, 0.4)',
    transition: 'transform 0.2s',
  }
};