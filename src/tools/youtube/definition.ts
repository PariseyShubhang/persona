import OpenAI from "openai";

export const searchYoutubeTool: OpenAI.Chat.ChatCompletionTool = {
  type: "function",

  function: {
    name: "searchYoutube",

    description:
      "Search videos from the selected persona's YouTube channel.",

    parameters: {
      type: "object",

      properties: {
        query: {
          type: "string",
          description: "Topic to search for",
        },
      },

      required: ["query"],
    },
  },
};