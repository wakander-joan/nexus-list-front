// ============================================================
// COMPONENTE — InputField
// Responsabilidade: Renderizar um campo de texto reutilizável
// ============================================================

interface Props {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  id,
  label,
  type = "text",
  value,
  placeholder,
  error,
  required = false,
  onChange,
}: Props) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && <span> *</span>}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={!!error}
      />

      {error && <span role="alert">{error}</span>}
    </div>
  );
}
