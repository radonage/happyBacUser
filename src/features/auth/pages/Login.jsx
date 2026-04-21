import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10">

        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-black/40 border border-white/10"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-xl bg-black/40 border border-white/10"
        />

        <button className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">
          Login
        </button>

      </div>
    </div>
  );
}