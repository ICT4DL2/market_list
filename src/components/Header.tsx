
interface HeaderProps {
  toggleMenu: () => void;
}

export const Header = ({ toggleMenu }: HeaderProps) => {
  return (
    <div className="header">
      <button onClick={toggleMenu} style={{ fontSize: '1.2rem' }}>☰</button>
      <h3>Liste de Courses</h3>
    </div>
  );
};
