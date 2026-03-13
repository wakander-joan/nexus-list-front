export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  imgProfile: File | null;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  imgProfile?: string;
}