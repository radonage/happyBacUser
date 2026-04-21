// src/components/ui/Button.jsx

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const base =
    "px-4 py-2 rounded-xl font-semibold transition duration-300 focus:outline-none";

  const variants = {
    primary:
      "bg-purple-600 hover:bg-purple-700 text-white shadow-lg",
    secondary:
      "bg-white/10 hover:bg-white/20 text-white border border-white/10",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}