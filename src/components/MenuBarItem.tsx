interface MenuBarItemProps {
  label: string;
}

export function MenuBarItem({ label }: MenuBarItemProps) {
  return (
    <div className="menu-bar-item">
      {label}
    </div>
  );
}
