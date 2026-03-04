// ============================================================
// COMPONENTE — SuccessMessage
// Responsabilidade: Exibir feedback visual após o cadastro
// ============================================================

interface Props {
  onReset: () => void;
}

export function SuccessMessage({ onReset }: Props) {
  return (
    <div>
      <span>🎉</span>
      <h2>Cadastro realizado com sucesso!</h2>
      <p>Sua conta foi criada. Você já pode fazer login.</p>

      <button type="button" onClick={onReset}>
        Cadastrar outro usuário
      </button>
    </div>
  );
}
