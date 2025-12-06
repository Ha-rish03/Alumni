export default function MessageBubble({ message }) {
  const isMine = message.senderId === localStorage.getItem("userId");

  return (
    <div className={`p-3 rounded-lg mb-2 max-w-xs ${isMine ? "bg-blue-500 self-end" : "bg-gray-700 self-start"}`}>
      {message.text}
    </div>
  );
}
