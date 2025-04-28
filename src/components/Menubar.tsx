import { Link } from 'react-router-dom';
import { MenuBarItem } from './MenuBarItem';

interface MenubarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export function Menubar({ menuOpen, setMenuOpen }: MenubarProps) {
  return (
    <div className={`menu-bar ${menuOpen ? 'active' : ''}`}>
      <Link to="/" onClick={() => setMenuOpen(false)}>
        <MenuBarItem label="Accueil" />
      </Link>
      <Link to="/liste" onClick={() => setMenuOpen(false)}>
        <MenuBarItem label="Liste" />
      </Link>
      <Link to="/parametres" onClick={() => setMenuOpen(false)}>
        <MenuBarItem label="Paramètres" />
      </Link>
    </div>
  );
}
