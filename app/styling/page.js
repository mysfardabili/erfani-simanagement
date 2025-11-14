'use client';

import { useState } from 'react';
import StylingMenu from '../components/StylingMenu';

export default function StylingPage() {
  const [activeLayout, setActiveLayout] = useState('dice');

  const renderContent = () => {
    const contentMap = {
      layout1: {
        title: 'Layout Kolom',
        description: 'Tampilan dengan layout berbasis kolom yang terstruktur',
        color: '#dbeafe',
        emoji: '📐'
      },
      layout2: {
        title: 'Layout Grid 2x2',
        description: 'Tampilan dengan layout grid 2x2 yang simetris',
        color: '#fce7f3',
        emoji: '📱'
      },
      layout3: {
        title: 'Layout Grup',
        description: 'Tampilan dengan layout grup yang fleksibel',
        color: '#e0e7ff',
        emoji: '📋'
      },
      dice: {
        title: 'Layout Acak',
        description: 'Tampilan dengan layout yang diacak secara otomatis',
        color: '#fef3c7',
        emoji: '🎲'
      }
    };

    const content = contentMap[activeLayout] || contentMap.dice;

    return (
      <div className="content-card" style={{ backgroundColor: content.color }}>
        <div className="content-icon">{content.emoji}</div>
        <h2 className="content-title">{content.title}</h2>
        <p className="content-description">{content.description}</p>
      </div>
    );
  };

  return (
    <div className="styling-page">
      <div className="styling-container">
        <div className="styling-header">
          <h1>Halaman Styling</h1>
          <p>Pilih layout favorit Anda dari menu di bawah</p>
        </div>

        {/* Menu hanya untuk Desktop - tampil di atas konten */}
        <div className="desktop-menu">
          <StylingMenu
            activeLayout={activeLayout}
            onLayoutChange={setActiveLayout}
          />
        </div>

        <div className="content-wrapper">
          {renderContent()}
        </div>
      </div>

      {/* Menu untuk Mobile - fixed di bawah */}
      <div className="mobile-menu">
        <StylingMenu
          activeLayout={activeLayout}
          onLayoutChange={setActiveLayout}
        />
      </div>
      
      <style jsx global>{`
        .styling-page {
          min-height: calc(100vh - 90px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          padding-bottom: 160px; /* Ruang untuk menu floating + bottom nav */
        }

        .styling-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .styling-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .styling-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .styling-header p {
          font-size: 0.875rem;
          color: #6b7280;
        }

        /* Show/Hide menu berdasarkan device */
        .desktop-menu {
          display: none;
        }

        .mobile-menu {
          display: block;
        }

        .content-wrapper {
          margin-top: 2rem;
        }

        .content-card {
          padding: 2.5rem 2rem;
          border-radius: 24px;
          text-align: center;
          width: 100%;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .content-icon {
          font-size: 4rem;
          margin-bottom: 1.25rem;
          animation: float 3s ease-in-out infinite;
        }

        .content-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }

        .content-description {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.6;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        /* Desktop Styling */
        @media (min-width: 768px) {
          .styling-page {
            min-height: 100vh;
            padding: 3rem 2rem;
            padding-bottom: 2rem;
          }

          .styling-container {
            max-width: 700px;
          }

          .styling-header {
            margin-bottom: 2rem;
          }

          .styling-header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.75rem;
          }

          .styling-header p {
            font-size: 1.125rem;
          }

          /* Toggle menu visibility */
          .desktop-menu {
            display: block;
          }

          .mobile-menu {
            display: none;
          }

          .content-wrapper {
            margin-top: 3rem;
          }

          .content-card {
            padding: 4rem 3rem;
            border-radius: 32px;
          }

          .content-icon {
            font-size: 5.5rem;
            margin-bottom: 1.5rem;
          }

          .content-title {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .content-description {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}