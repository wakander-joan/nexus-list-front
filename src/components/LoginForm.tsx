// ============================================================
// COMPONENTE — RegisterForm
// Responsabilidade: Montar o formulário unindo todos os componentes
// ============================================================

import { useRegisterForm } from "../hooks/useRegisterForm";
import { InputField } from "./InputField";
import { SuccessMessage } from "./SuccessMessage";

export function LoginForm() {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetSuccess,
  } = useRegisterForm();

  if (isSuccess) {
    return <SuccessMessage onReset={resetSuccess} />;
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


      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logando..." : "Entrar"}
      </button>
    </form>
  );
}
