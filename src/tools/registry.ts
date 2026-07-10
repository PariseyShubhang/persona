import OpenAI from "openai";
import { searchYoutubeTool } from "./youtube/definition";

export const tools: OpenAI.Chat.ChatCompletionTool[] = [
  searchYoutubeTool,
];