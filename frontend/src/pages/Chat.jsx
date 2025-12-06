import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import MessageInput from "../components/MessageInput";
import MessageBubble from "../components/MessageBubble";

export default function Chat() {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get(`/messages/${conversationId}`).then(res => setMessages(res.data));
  }, [conversationId]);

  const sendMessage = async (text) => {
    const res = await api.post(`/messages/${conversationId}`, { text });
    setMessages([...messages, res.data]);
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
