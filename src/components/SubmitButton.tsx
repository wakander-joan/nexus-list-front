import { useState, type CSSProperties } from "react";

interface SubmitButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

export function SubmitButton({ label = "Enviar", onClick, style,disabled = false }: SubmitButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
    >
      {label}
    </button>
  );
}