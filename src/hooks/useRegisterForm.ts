// ============================================================
// HOOK — Gerencia estado e lógica do formulário
// ============================================================

import { useState } from "react";
import type { FormData, FormErrors } from "../types/user.types";
import { validateForm, hasErrors } from "../utils/validation";

const INITIAL_STATE: FormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
  acceptTerms: false,
};

export function useRegisterForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Atualiza campos de texto e select
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  }

  // Atualiza o checkbox (usa "checked" em vez de "value")
  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: checked }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  }

  // Submete o formulário
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simula uma chamada de API (substitua pelo fetch real depois)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Dados enviados:", formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData(INITIAL_STATE);
  }

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleCheckbox,
    handleSubmit,
    resetSuccess: () => setIsSuccess(false),
  };
}
