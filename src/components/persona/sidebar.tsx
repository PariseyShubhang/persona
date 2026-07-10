import { Persona } from "@/types/persona";
import {SidebarProps} from "@/types/SidebarProps";
import PersonaSelector from "./personaSelector";

export default function Sidebar({ selectedPersona, onSelectPersona }: SidebarProps) {
  return (
    <aside className="w-80 border-r border-zinc-800 p-4">
      <h1 className="mb-8 text-2xl font-bold">Persona AI</h1>

      <PersonaSelector selectedPersona={selectedPersona} onSelectPersona={onSelectPersona} />
    </aside>
  );
}