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

  // Validação da imagem (opcional — só valida o tipo se tiver arquivo)
  if (data.imgProfile) {
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(data.imgProfile.type)) {
      errors.imgProfile = "Formato inválido. Use PNG, JPG ou WEBP.";
    } else if (data.imgProfile.size > 5 * 1024 * 1024) {
      errors.imgProfile = "Imagem deve ter no máximo 5MB.";
    }
  }

  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}