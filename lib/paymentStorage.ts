export const PAYMENT_RETURN_URL_KEY = "paymentReturnUrl";

export const getPaymentReturnUrl = (): string | null => {
  return sessionStorage.getItem(PAYMENT_RETURN_URL_KEY);
};

export const setPaymentReturnUrl = (url: string) => {
  sessionStorage.setItem(PAYMENT_RETURN_URL_KEY, url);
};

export const clearPaymentReturnUrl = () => {
  sessionStorage.removeItem(PAYMENT_RETURN_URL_KEY);
};