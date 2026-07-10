import { Persona } from "@/types/persona";
export default function ChatHeader({ selectedPersona }: { selectedPersona: Persona }) {
  return (
    <header className="border-b p-4">
      <h2 className="text-xl font-semibold">
        {selectedPersona.name}
      </h2>

      <p className="text-sm text-zinc-500">
        AI Persona
      </p>
    </header>
  );
}