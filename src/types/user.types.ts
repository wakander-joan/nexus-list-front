// ============================================================
// TYPES — Define o formato dos dados do formulário
// ============================================================

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "user" | "editor";
  acceptTerms: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  acceptTerms?: string;
}
