// ============================================================
// PÁGINA — HomePage
// Responsabilidade: Tela inicial com opções de entrar ou cadastrar
// ============================================================

import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/SubmitButton";

export function HomePage() {
    const navigate = useNavigate();

    return (
        <main>
            <div>
                <h1>📋 Minhas Tarefas</h1>
                <p
                    style={{
                        color: "#ffffff",
                        padding: "8px 16px"
                    }}
                >Organize suas listas de forma fácil</p>
            </div>

            <div>
                <SubmitButton label="Entrar" onClick={() => navigate("/login")} />
                <SubmitButton
                    label="Cadastrar"
                    onClick={() => navigate("/cadastro")}
                    style={{
                        background: "#341dfd",
                        color: "#ffffff",
                        padding: "0.8rem",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        transition: "background 0.2s",
                        marginTop: "0.5rem",
                        width: "100%",

                    }}
                />
            </div>
        </main>
    );
}