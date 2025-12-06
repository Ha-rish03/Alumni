import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-3 rounded-lg bg-white/20 text-white outline-none"
      />
      <button onClick={handleSend} className="btn-primary px-4">Send</button>
    </div>
  );
}

