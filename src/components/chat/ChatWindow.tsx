
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Persona } from "@/types/persona";
import { Message } from "@/types/messages";
import { useState } from "react";

export default function ChatWindow({ selectedPersona }: { selectedPersona: Persona }){
    const [messages, setMessages] = useState<Message[]>([]);
    const handleSend = async (input: string) => {
    const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: input,
    };
    // Show user message immediately
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    try{
    //call backend
    const response = await fetch ("/api/chat",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // send full history so far (mapped to role/content) since the llm is stateless
        messages: newMessages.map(({ role, content }) => ({ role, content })),
        persona: selectedPersona.id
      })
    })
    
    const data = await response.json();
    console.log(data);
    //show assistant message/response
    setMessages(prev => [
        ...prev,
        {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.message,
        }
    ]);
    }catch(err){
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    }
  }
  
  return (
    <section className="flex h-full flex-1 flex-col">
      <ChatHeader selectedPersona={selectedPersona} />
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} />
    </section>
  );
}