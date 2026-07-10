import Message from "./Message";
import { Message as MessageType } from "@/types/messages";

export default function MessageList({ messages }: { messages: MessageType[] }) {
  return (
    <main className="flex-1 space-y-4 overflow-y-auto p-6">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </main>
  );
}
