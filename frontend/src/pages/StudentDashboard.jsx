import { useEffect, useState } from "react";
import axios from "../services/api.js";

export default function StudentDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/student/jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-purple-900 to-blue-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job, i) => (
          <div
            key={i}
            className="p-6 bg-white/10 rounded-xl backdrop-blur-lg shadow-lg hover:scale-[1.03] transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-300">{job.company}</p>
            <p className="text-gray-400 text-sm mt-2">{job.description}</p>
            <p className="text-[12px] text-blue-300 mt-3">Posted By: {job.postedBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
