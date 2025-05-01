import { LucideIcon } from "lucide-react";

interface BigButtonProps {
    label: string;
    icon: LucideIcon;
    color?: string; // ex : '#10b981' ou 'var(--primary)'
  }
  
  export const BigButton: React.FC<BigButtonProps> = ({ label, icon: Icon, color = '#3b82f6' }) => {
    return (
      <div
        className="big-button"
        style={{ backgroundColor: color }}
      >
        <strong><span>{label}</span></strong>
        <div><Icon size={32} /></div>
      </div>
    );
  };
  