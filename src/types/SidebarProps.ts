import { Persona } from "@/types/persona";

export interface SidebarProps {
  selectedPersona: Persona;
  onSelectPersona: (persona: Persona) => void;
}