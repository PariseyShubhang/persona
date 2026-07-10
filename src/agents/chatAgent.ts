import OpenAI from "openai";
import { openai } from "@/lib/openai";
import { buildPrompt } from "@/prompts/buildPrompt";
import { personaProfiles } from "@/personas";
import { searchYoutube } from "@/tools/youtube/handler";
import { tools } from "@/tools/registry";

type ChatMessage = OpenAI.Chat.ChatCompletionMessageParam;

interface ChatAgentInput {
  persona: string;
  messages: ChatMessage[];
}

export async function runChatAgent({
  persona,
  messages,
}: ChatAgentInput): Promise<string> {
  const systemPrompt = buildPrompt(persona);

  // First LLM call
  const response = await openai.chat.completions.create({
    model: "deepseek-v4-flash",

    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ],

    tools
  });

  const assistantMessage = response.choices[0].message;

  const toolCall = assistantMessage.tool_calls?.[0];

  // No tool needed
  if (!toolCall) {
    return assistantMessage.content ?? "";
  }

  if (toolCall.type !== "function") {
    throw new Error("Unsupported tool type");
  }

  // Execute tool
  const args = JSON.parse(toolCall.function.arguments);

  const profile = personaProfiles[persona as keyof typeof personaProfiles];

  const videos = await searchYoutube(profile.youtubeChannelId, args.query);

  // Second LLM call
  const secondResponse = await openai.chat.completions.create({
    model: "deepseek-v4-flash",

    messages: [
      {
        role: "system",
        content: systemPrompt,
      },

      ...messages,

      assistantMessage,

      {
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(videos),
      },
    ],
      tools,
  });
  console.log(secondResponse.choices[0].message);
  return secondResponse.choices[0].message.content ?? "";
}

//we could Loop it instead of calling it twice, but for now we will just call it twice.