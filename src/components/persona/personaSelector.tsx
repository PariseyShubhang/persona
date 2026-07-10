import { personas } from "@/data/personas";
import { SidebarProps } from "@/types/SidebarProps";

export default function PersonaSelector({
  selectedPersona,
  onSelectPersona,
}: SidebarProps) {
  return (
    <div className="space-y-3">
      {personas.map((persona) => (
        <button
          key={persona.id}
          onClick={() => onSelectPersona(persona)}
          className={`w-full rounded-lg border p-4 text-left transition ${
            selectedPersona.id === persona.id
              ? "border-blue-500 bg-blue-500/10"
              : "border-zinc-700 hover:bg-zinc-800"
          }`}
        >
          {persona.id === "hitesh" ? "👨" : "👨‍💻"} {persona.name}
        </button>
      ))}
    </div>
  );
}