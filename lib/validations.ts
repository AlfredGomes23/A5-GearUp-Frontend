export const validateName = (value: string): string => {
  if (!value.trim()) return "Name is required.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
};

export const validateEmail = (value: string): string => {
  if (!value.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Enter a valid email address.";
  return "";
};

export const validatePassword = (value: string): string => {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return "";
};

export const validatePhone = (value: string): string => {
  if (!value.trim()) return "";
  if (!/^\+?[\d\s()-]{10,}$/.test(value.trim())) return "Enter a valid phone number.";
  return "";
};

export type LoginFields = { email: string; password: string };
export type LoginErrors = { email?: string; password?: string };

export const validateLogin = (values: LoginFields): LoginErrors => {
  const errors: LoginErrors = {};
  const email = validateEmail(values.email);
  if (email) errors.email = email;
  const password = validatePassword(values.password);
  if (password) errors.password = password;
  return errors;
};

export type RegisterFields = { name: string; email: string; password: string; phone: string };
export type RegisterErrors = { name?: string; email?: string; password?: string; phone?: string };

export const validateRegister = (values: RegisterFields): RegisterErrors => {
  const errors: RegisterErrors = {};
  const name = validateName(values.name);
  if (name) errors.name = name;
  const email = validateEmail(values.email);
  if (email) errors.email = email;
  const password = validatePassword(values.password);
  if (password) errors.password = password;
  const phone = validatePhone(values.phone);
  if (phone) errors.phone = phone;
  return errors;
};
