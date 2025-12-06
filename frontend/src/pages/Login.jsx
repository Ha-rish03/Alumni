import { useState } from "react";
import axios from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const { data } = await axios.post("/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "student") navigate("/student");
      else navigate("/alumni");
    } catch {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-black">
      <div className="p-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-[380px] text-center text-white animate-slideUp">
        <h1 className="text-3xl font-bold mb-6">Alumni Tracker</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-white/20 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={loginUser}
          className="w-full p-3 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg font-semibold hover:scale-[1.03] transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
