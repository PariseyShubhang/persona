"use client";
import { useState } from "react";

import Sidebar from "@/components/persona/sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import {personas} from "@/data/personas";


export default function HomePage() {
  const [selectedPersona, setSelectedPersona] = useState(personas[0]);

  return (
    <main className="flex h-screen">
      <Sidebar
        selectedPersona={selectedPersona}
        onSelectPersona={setSelectedPersona}
      />

      <section className="flex flex-1">
        <ChatWindow selectedPersona={selectedPersona} />
      </section>
    </main>
  );
}
