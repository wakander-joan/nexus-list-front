// ============================================================
// HOOK — Gerencia estado e lógica do formulário
// ============================================================

import { useState } from "react";
import type { FormData, FormErrors } from "../types/user.types";
import { validateForm, hasErrors } from "../utils/validation";

const API_URL = "https://nexus-list-production.up.railway.app";

const INITIAL_STATE: FormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
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

  // Atualiza o checkbox
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

  // Passo 1: Pede ao back uma Presigned URL para o S3
  async function getPresignedUrl(filename: string): Promise<{ url: string; key: string }> {
    const response = await fetch(
      `${API_URL}/s3/presigned-url?filename=${encodeURIComponent(filename)}`
    );
    if (!response.ok) throw new Error("Erro ao obter URL de upload.");
    return response.json();
  }

  // Passo 2: Faz o upload da imagem DIRETO no S3 usando a Presigned URL
  async function uploadImageToS3(uploadUrl: string, file: File): Promise<void> {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!response.ok) throw new Error("Erro ao fazer upload da imagem.");
  }

  // Submete o formulário
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("handleSubmit chamado!"); // ← adicione
    console.log("formData:", formData);   // ← e isso

    const validationErrors = validateForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      let imgProfileKey = "";

      // Se tiver imagem, faz o upload pro S3 antes de cadastrar
      if (formData.imgProfile) {
        // Passo 1: Pede a Presigned URL ao back-end
        const { url, key } = await getPresignedUrl(formData.imgProfile.name);

        // Passo 2: Faz o upload direto pro S3
        await uploadImageToS3(url, formData.imgProfile);

        // Passo 3: Guarda a key para enviar no cadastro
        imgProfileKey = key;
      }

      // Passo 4: Cadastra o usuário com a key da imagem
      const response = await fetch(`${API_URL}/cliente/createClient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          imgProfileKey,
        }),
      });

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