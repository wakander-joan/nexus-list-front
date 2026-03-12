// ============================================================
// COMPONENTE — ImageUploadField
// Responsabilidade: Permitir upload de imagem de perfil
// ============================================================

import { useRef, useState } from "react";

interface ImageUploadFieldProps {
  onChange: (file: File | null) => void;
  error?: string;
}

export function ImageUploadField({ onChange, error }: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setPreview(null);
      onChange(null);
      return;
    }

    setPreview(URL.createObjectURL(file));
    onChange(file);
  }

  function handleRemove() {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
        Foto de perfil
      </label>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Avatar preview */}
        <div
          onClick={() => inputRef.current?.click()}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            overflow: "hidden",
            border: error ? "2px solid #e53e3e" : "2px dashed #cbd5e0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f7fafc",
            flexShrink: 0,
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              fill="none"
              viewBox="0 0 24 24"
              stroke="#a0aec0"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          )}
        </div>

        {/* Ações */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: 6,
              border: "1px solid #cbd5e0",
              background: "#fff",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            {preview ? "Trocar imagem" : "Escolher imagem"}
          </button>

          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 6,
                border: "1px solid #fed7d7",
                background: "#fff5f5",
                color: "#e53e3e",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Remover
            </button>
          )}
        </div>
      </div>

      {/* Input oculto */}
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {error && (
        <span style={{ color: "#e53e3e", fontSize: "0.8rem", marginTop: "0.3rem", display: "block" }}>
          {error}
        </span>
      )}

      <span style={{ color: "#a0aec0", fontSize: "0.75rem", marginTop: "0.3rem", display: "block" }}>
        PNG, JPG ou WEBP — opcional
      </span>
    </div>
  );
}