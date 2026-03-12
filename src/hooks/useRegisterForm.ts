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
  imgProfile: null,
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

  // Atualiza a imagem de perfil
  function handleImageChange(file: File | null) {
    setFormData((prev) => ({ ...prev, imgProfile: file }));
    setErrors((prev) => ({ ...prev, imgProfile: undefined }));
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

    // Usa FormData nativo do browser para suportar envio de arquivo
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.imgProfile) {
      data.append("imgProfile", formData.imgProfile);
    }

    try {
      const response = await fetch(
        "https://nexus-list-production.up.railway.app/cliente/createClient",
        {
          method: "POST",
          body: data, // sem Content-Type — o browser define automaticamente com boundary
        },
      );

      if (!response.ok) {
        const error = await response.json();
        setErrors({ email: error.message });
        return;
      }

      setIsSuccess(true);
      setFormData(INITIAL_STATE);
    } catch (err) {
      setErrors({ email: "Erro ao conectar com o servidor. Tente novamente." });
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
    handleCheckbox,
    handleImageChange,
    handleSubmit,
    resetSuccess: () => setIsSuccess(false),
  };
}