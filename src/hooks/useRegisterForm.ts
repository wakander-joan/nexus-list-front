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
    console.log("handleSubmit chamado!"); // ← adicione isso
    console.log("formData:", formData);   // ← e isso

    setIsSubmitting(true);

    const response = await fetch("https://nexus-list-production.up.railway.app/cliente/createClient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        imgProfileKey: "",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      setErrors({ email: error.message });
      setIsSubmitting(false);
      return;
    }


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
