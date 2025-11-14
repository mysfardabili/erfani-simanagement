import {
  HiOutlineViewColumns,
  HiOutlineSquares2X2,
  HiOutlineRectangleGroup,
  HiOutlineCube,
} from 'react-icons/hi2';
import styles from '@/styles/StylingMenu.module.css';

const menuItems = [
  { id: 'layout1', icon: HiOutlineViewColumns, label: 'Layout Kolom' },
  { id: 'layout2', icon: HiOutlineSquares2X2, label: 'Layout Grid' },
  { id: 'layout3', icon: HiOutlineRectangleGroup, label: 'Layout Grup' },
  { id: 'dice', icon: HiOutlineCube, label: 'Layout Acak' },
];

export default function StylingMenu({ activeLayout, onLayoutChange }) {
  return (
    <div className={styles.menuContainer}>
      {menuItems.map((item) => {
        const isActive = activeLayout === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onLayoutChange(item.id)}
            className={`${styles.menuButton} ${isActive ? styles.active : ''}`}
            data-tooltip={item.label}
            aria-label={item.label}
          >
            <Icon size={22} />
          </button>
        );
      })}
    </div>
  );
}