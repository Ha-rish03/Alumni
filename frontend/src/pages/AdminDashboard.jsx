import { useState } from "react";
import axios from "../services/api.js";

export default function AdminDashboard() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });

  const createUser = async () => {
    const token = localStorage.getItem("token");
    const body = { token, ...form };

    const res = await axios.post("/admin/create-user", body);
    alert(res.data.message);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="w-[400px] bg-white/10 p-8 rounded-xl shadow-lg backdrop-blur">
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

        <input
          className="input-style"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input-style"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="input-style"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="input-style"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
        </select>

        <button className="btn-primary mt-4" onClick={createUser}>
          Create User
        </button>
      </div>
    </div>
  );
}
