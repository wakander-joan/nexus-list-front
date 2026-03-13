// ============================================================
// HOOK — Gerencia estado e lógica do formulário de login
// ============================================================

import { useState } from "react";

const API_URL = "https://nexus-list-production.up.railway.app";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const INITIAL_STATE: LoginFormData = {
  email: "",
  password: "",
};

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>(INITIAL_STATE);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  }

  function validate(): LoginErrors {
    const errs: LoginErrors = {};
    if (!formData.email.trim()) errs.email = "E-mail é obrigatório.";
    if (!formData.password) errs.password = "Senha é obrigatória.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrors({ password: error.error ?? "Email ou senha inválidos." });
        return;
      }

      const data = await response.json();

      // Salva o token no localStorage para usar nas próximas requisições
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      console.log(`\n ${data.token}, \n ${data.name}, \n ${data.email}`);
      

      setIsSuccess(true);
      setFormData(INITIAL_STATE);
    } catch (err) {
      setErrors({ password: "Erro ao conectar com o servidor. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetSuccess: () => setIsSuccess(false),
  };
}