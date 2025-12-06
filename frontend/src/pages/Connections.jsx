import { useEffect, useState } from "react";
import api from "../services/api";
import UserCard from "../components/UserCard";

export default function Connections() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch all users
    api.get("/connections").then(res => setUsers(res.data));

    // Fetch incoming connection requests
    api.get("/connections/requests").then(res => setRequests(res.data));
  }, []);

  const acceptRequest = async (userId) => {
    await api.post("/connections/accept", { userId });
    setRequests(requests.filter(r => r.id !== userId));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Incoming Requests</h2>
      <div className="flex flex-col gap-2">
        {requests.map(r => (
          <div key={r.id} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
            <span>{r.name}</span>
            <button onClick={() => acceptRequest(r.id)} className="btn-primary">Accept</button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">All Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
