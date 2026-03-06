// ============================================================
// COMPONENTE — RegisterForm
// Responsabilidade: Montar o formulário unindo todos os componentes
// ============================================================

import { useRegisterForm } from "../hooks/useRegisterForm";
import { InputField } from "./InputField";
import { SuccessMessage } from "./SuccessMessage";
import { SubmitButton } from "./SubmitButton";

export function RegisterForm() {
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
      <h1>Criar conta</h1>

      <InputField
        id="name"
        label="Nome completo"
        value={formData.name}
        placeholder="João Silva"
        error={errors.name}
        required
        onChange={handleChange}
      />

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

      <InputField
        id="confirmPassword"
        label="Confirmar senha"
        type="password"
        value={formData.confirmPassword}
        placeholder="Repita a senha"
        error={errors.confirmPassword}
        required
        onChange={handleChange}
      />
  
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Criar conta"}
      </SubmitButton>
    </form>
  );
}
