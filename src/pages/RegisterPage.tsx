// ============================================================
// PÁGINA — RegisterPage
// Responsabilidade: Exibir o formulário de cadastro
// ============================================================

import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import { BackButton } from "../components/BackButton";

export function RegisterPage() {
  const navigate = useNavigate();

  return (
    <main style={{ position: "relative" }}>
      <BackButton onClick={() => navigate("/")} />
      <RegisterForm />
    </main>
  );
}