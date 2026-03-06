import React, { useState } from "react";

interface BackButtonProps {
  onClick?: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <img
      src="/assets/back.png"
      alt="voltar"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      width={42}
      height={42}
      style={{
        cursor: "pointer",
        transform: hovered ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.2s",
        position: "absolute",
        right: 15,
        top: 10,
      }}
    />
  );
}