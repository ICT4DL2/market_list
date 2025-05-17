import { LucideIcon } from "lucide-react";

interface BigButtonProps {
  label: string;
  icon: LucideIcon;
  color?: string; // ex : '#10b981' ou 'var(--primary)'
  onClick: () => void;
}

export const BigButton: React.FC<BigButtonProps> = ({ label, icon: Icon, color = '#3b82f6', onClick }) => {
  return (
    <div
      className="big-button"
      style={{ backgroundColor: color }}
      onClick={onClick} // Ajoute cette ligne pour que le clic appelle onClick
    >
      <strong><span>{label}</span></strong>
      <div><Icon size={32} /></div>
    </div>
  );
};
