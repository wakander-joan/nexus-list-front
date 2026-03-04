// ============================================================
// PÁGINA — RegisterPage
// Responsabilidade: Exibir o formulário de cadastro
// ============================================================

import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  const navigate = useNavigate();

  return (
    <main>
      <button
        type="button"
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#ffffff00",
          color: "#adadad",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {'< Voltar'}
      </button>

      <RegisterForm />
    </main>
  );
}