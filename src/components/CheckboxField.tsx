// ============================================================
// COMPONENTE — CheckboxField
// Responsabilidade: Renderizar um campo de checkbox reutilizável
// ============================================================

interface Props {
  id: string;
  label: string;
  checked: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CheckboxField({ id, label, checked, error, onChange }: Props) {
  return (
    <div>
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-invalid={!!error}
        />
        {label}
      </label>

      {error && <span role="alert">{error}</span>}
    </div>
  );
}
