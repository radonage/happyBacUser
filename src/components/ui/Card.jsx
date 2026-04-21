// src/components/ui/Card.jsx

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-white/5 
        border border-white/10 
        rounded-2xl 
        p-5 
        shadow-lg 
        backdrop-blur-xl 
        hover:bg-white/10 
        transition-all 
        duration-300 
        ${className}
      `}
    >
      {children}
    </div>
  );
}