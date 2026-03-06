import React, { type CSSProperties, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  style?: CSSProperties;
  hoverBackground?: string;
  hoverColor?: string;
}

export function SubmitButton({ children, style, hoverBackground = "#341dfd", hoverColor = "#ffffff", ...props }: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  const defaultStyle: CSSProperties = {
    background: hovered ? hoverBackground : "#ff6900",
    color: hovered ? hoverColor : "#ffffff",
    padding: "0.6rem 0.8rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: 600,
    transition: "background 0.2s",
    marginTop: "0.5rem",
    width: "100%",
    cursor: "pointer",
  };

  return (
    <button
      style={{ ...defaultStyle, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
}