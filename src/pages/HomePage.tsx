// ============================================================
// PÁGINA — HomePage
// Responsabilidade: Tela inicial com opções de entrar ou cadastrar
// ============================================================

import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/SubmitButton";
import { PageHeader } from "../components/PageHeader";

export function HomePage() {
    const navigate = useNavigate();

    return (
        <main>
            <div>
                <PageHeader
                    text="Nexus List"
                    imageStyle={{ width: "3rem", height: "3rem" }}
                    textStyle={{ fontSize: "2rem", color: "#ff6900" }}
                    style={{ display: "flex", flexDirection: "row" }}
                />
                <p style={{color: "#ffffff", padding: "8px 16px", textAlign: "center"}}>Organize suas listas de forma fácil</p>
            </div>

            <div>
                <SubmitButton
                    onClick={() => navigate("/login")}
                    style={{ width: "auto", fontSize: "1.3rem" }}
                    hoverBackground="#ffffff"
                    hoverColor="#000000"
                >
                    Entrar
                </SubmitButton>

                <SubmitButton
                    onClick={() => navigate("/cadastro")}
                    style={{
                        width: "auto",
                        fontSize: "1.3rem"
                    }}
                >
                    Cadastrar
                </SubmitButton>

            </div>
        </main>
    );
}