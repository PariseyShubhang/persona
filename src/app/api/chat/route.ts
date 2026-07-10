import { NextResponse } from "next/server";
import { runChatAgent } from "@/agents/chatAgent";

export async function POST(request: Request) {
  const body = await request.json();

  const message = await runChatAgent(body);

  return NextResponse.json({
    message,
  });
}