// ============================================================
// PÁGINA — RegisterPage
// Responsabilidade: Exibir o formulário de cadastro
// ============================================================

import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm.tsx";
import { BackButton } from "../components/BackButton.tsx";

export function LoginPage() {
    const navigate = useNavigate();

    return (
        <main style={{ position: "relative" }}>
            <BackButton onClick={() => navigate("/")} />
            <LoginForm />
        </main>
    );
}