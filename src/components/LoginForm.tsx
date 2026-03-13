// ============================================================
// COMPONENTE — LoginForm
// Responsabilidade: Montar o formulário de login
// ============================================================

import { useLoginForm } from "../hooks/useLoginForm";
import { InputField } from "./InputField";
import { SubmitButton } from "./SubmitButton";

export function LoginForm() {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  if (isSuccess) {
    return (
      <div style={{ backgroundColor: "#ffffff00", textAlign: "center", padding: "1.5rem", borderRadius: "10px" }}>
        <h2 style={{fontSize: "2rem", color: "#ffffff"}} >Login realizado com sucesso!</h2>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Entrar</h1>

      <InputField
        id="email"
        label="E-mail"
        type="email"
        value={formData.email}
        placeholder="joao@email.com"
        error={errors.email}
        required
        onChange={handleChange}
      />

      <InputField
        id="password"
        label="Senha"
        type="password"
        value={formData.password}
        placeholder="Mínimo 8 caracteres"
        error={errors.password}
        required
        onChange={handleChange}
      />

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logando..." : "Entrar"}
      </SubmitButton>
    </form>
  );
}