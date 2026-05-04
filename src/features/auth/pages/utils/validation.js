export const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPhoneValid = (phone) =>
    phone.replace(/\D/g, "").length >= 5;

export const isNameValid = (first, last) =>
    first.trim().length > 0 && last.trim().length > 0;

export const passwordRules = (password = "") => ({
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
});

export const isPasswordStrong = (password) =>
    Object.values(passwordRules(password)).every(Boolean);

export const isPasswordMatch = (password, confirm) =>
    password === confirm && confirm.length > 0;