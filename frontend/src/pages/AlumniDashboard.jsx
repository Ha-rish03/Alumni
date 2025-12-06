import { useState } from "react";
import axios from "../services/api.js";

export default function AlumniDashboard() {
  const [job, setJob] = useState({ title: "", company: "", description: "" });

  const postJob = async () => {
    const token = localStorage.getItem("token");
    const body = { token, ...job };

    await axios.post("/alumni/post-job", body);
    alert("Job Posted!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-800 to-black text-white">
      <div className="w-[400px] bg-white/10 p-8 rounded-xl shadow-xl backdrop-blur-lg">
        <h1 className="text-3xl font-bold mb-5">Alumni Dashboard</h1>

        <input
          className="input-style"
          placeholder="Job Title"
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />

        <input
          className="input-style"
          placeholder="Company"
          onChange={(e) => setJob({ ...job, company: e.target.value })}
        />

        <textarea
          className="input-style"
          rows="3"
          placeholder="Description"
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        ></textarea>

        <button className="btn-primary mt-4" onClick={postJob}>
          Post Job
        </button>
      </div>
    </div>
  );
}
