export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  acceptTerms: boolean;
  imgProfile: File | null;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  acceptTerms?: string;
  imgProfile?: string;
}