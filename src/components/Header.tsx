import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  toggleMenu: () => void;
}

export const Header = ({ toggleMenu }: HeaderProps) => {
  return (
    <div className="header">
      <button onClick={toggleMenu} style={{ fontSize: '1.2rem' }}>☰</button>
      <h2>MarketList 🛒 App</h2>
      <ThemeToggle/>
    </div>
  );
};
