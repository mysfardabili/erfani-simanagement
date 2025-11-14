export default function WardrobePage() {
  return (
    <div style={{ 
      minHeight: 'calc(100vh - 90px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937' }}>
          Halaman Lemari
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
          Ini adalah halaman untuk melihat lemari pakaian Anda.
        </p>
      </div>
    </div>
  );
}