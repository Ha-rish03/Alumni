export default function UserCard({ user }) {
  const connectUser = async () => {
    await api.post("/connections/request", { userId: user.id });
    alert("Connection request sent!");
  };

  return (
    <div className="p-4 bg-white/10 rounded-lg flex justify-between items-center">
      <span>{user.name} ({user.role})</span>
      <button onClick={connectUser} className="btn-primary">Connect</button>
    </div>
  );
}
