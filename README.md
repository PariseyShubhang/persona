# Persona

A Next.js chat app where you talk to AI personas modeled after real YouTube educators — currently **Hitesh Choudhary** and **Piyush Garg**. Each persona has its own tone, vocabulary, and teaching style baked into the system prompt, and can search its own YouTube channel to recommend relevant videos mid-conversation.

## How it works

- **Frontend** (`src/app/page.tsx`) — a sidebar persona picker plus a chat window. Selecting a persona swaps which system prompt and YouTube channel the backend uses.
- **Chat API** (`src/app/api/chat/route.ts`) — a single `POST` route that forwards `{ persona, messages }` to the chat agent.
- **Chat agent** (`src/agents/chatAgent.ts`) — builds the persona's system prompt, calls the LLM, and if the model requests the `searchYoutube` tool, runs it and makes a second LLM call with the results to produce the final reply.
- **Personas** (`src/personas/`) — each persona is a profile (`tone`, `vocabulary`, `teachingStyle`, `rules`, `youtubeChannelId`) turned into a system prompt by `src/prompts/buildPrompt.ts`.
- **Tools** (`src/tools/`) — a `searchYoutube` function tool (`src/tools/youtube/`) that queries the YouTube Data API v3, scoped to the selected persona's channel.
- **LLM client** (`src/lib/openai.ts`) — uses the `openai` SDK pointed at DeepSeek's OpenAI-compatible API (`https://api.deepseek.com` by default), model `deepseek-v4-flash`.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- `openai` SDK (against DeepSeek's compatible endpoint)
- YouTube Data API v3
- pnpm

## Getting started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=your_deepseek_api_key
YOUTUBE_API_KEY=your_youtube_data_api_key
# Optional — override if not using DeepSeek's endpoint
OPENAI_API_BASE_URL=https://api.deepseek.com
```

- `OPENAI_API_KEY` — despite the name, this is your **DeepSeek** API key (the `openai` SDK is used as a generic OpenAI-compatible client).
- `YOUTUBE_API_KEY` — a Google Cloud API key with the YouTube Data API v3 enabled.

### 3. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a new persona

1. Create `src/personas/<name>.ts` exporting a `PersonaProfile` (see `hitesh.ts` / `piyush.ts` for the shape: `id`, `name`, `youtubeChannelId`, `tone`, `vocabulary`, `teachingStyle`, `rules`).
2. Register it in `src/personas/index.ts` (`personaProfiles`).
3. Add it to the UI list in `src/data/personas.ts`.

## Project structure

```
src/
  agents/chatAgent.ts        # orchestrates system prompt + LLM + tool calls
  app/
    api/chat/route.ts        # POST /api/chat
    page.tsx                 # main UI
  components/
    chat/                    # chat window, input, message list
    persona/                 # sidebar + persona selector
  data/personas.ts           # persona list shown in the UI
  lib/openai.ts              # OpenAI-compatible client (DeepSeek)
  personas/                  # persona profiles + prompt data
  prompts/buildPrompt.ts     # turns a persona profile into a system prompt
  tools/
    registry.ts              # tool list passed to the LLM
    youtube/                 # searchYoutube tool definition + handler
  types/                     # shared TypeScript types
```

## Notes

- `.env.local` is git-ignored — never commit real API keys.
- The chat agent currently does a fixed two-call loop (LLM → optional tool → LLM) rather than a general tool loop; see the comment at the bottom of `chatAgent.ts`.
