// ============================================================
// VALIDATION — Regras de validação do formulário
// ============================================================

// ============================================================
// VALIDATION — Regras de validação do formulário
// ============================================================
import type { FormData, FormErrors } from "../types/user.types";

export function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  // Validação do nome
  if (!data.name.trim()) {
    errors.name = "Nome é obrigatório.";
  } else if (data.name.trim().length < 3) {
    errors.name = "Nome deve ter pelo menos 3 caracteres.";
  }

  // Validação do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = "E-mail é obrigatório.";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  // Validação da senha
  if (!data.password) {
    errors.password = "Senha é obrigatória.";
  } else if (data.password.length < 8) {
    errors.password = "Senha deve ter pelo menos 8 caracteres.";
  }

  // Confirmação de senha
  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirme sua senha.";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "As senhas não conferem.";
  }

  // Validação do perfil
  if (!data.role) {
    errors.role = "Selecione um perfil.";
  }

  // Validação dos termos
  if (!data.acceptTerms) {
    errors.acceptTerms = "Você precisa aceitar os termos de uso.";
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
