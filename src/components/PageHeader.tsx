import { type CSSProperties } from "react";

interface PageHeaderProps {
  text: string;
  imageSrc?: string;
  imageAlt?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  textStyle?: CSSProperties;
}

export function PageHeader({
  text,
  imageSrc = "/assets/list.png",
  imageAlt = "icon",
  style,
  imageStyle,
  textStyle,
}: PageHeaderProps) {
  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    ...style,
  };

  const defaultImageStyle: CSSProperties = {
    width: "2rem",
    height: "2rem",
    objectFit: "contain",
    ...imageStyle,
  };

  const defaultTextStyle: CSSProperties = {
    fontSize: "1.8rem",
    fontWeight: 700,
    margin: 0,
    ...textStyle,
  };

  return (
    <div style={containerStyle}>
      <img src={imageSrc} alt={imageAlt} style={defaultImageStyle} />
      <h1 style={defaultTextStyle}>{text}</h1>
    </div>
  );
}