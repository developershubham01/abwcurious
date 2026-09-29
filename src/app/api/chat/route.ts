import { NextRequest, NextResponse } from "next/server";
import { generateRAGAnswer } from "@/lib/rag-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Extract the latest user query from the conversation
    const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    const userQuery = lastUserMessage?.content || "What services does ABWcurious offer?";

    // Generate context-grounded response using our zero-API-key RAG engine
    const ragResult = generateRAGAnswer(userQuery);

    return NextResponse.json({
      message: ragResult.answer,
      sources: ragResult.sources,
      suggestions: ragResult.suggestedFollowUps,
    });
  } catch (err: unknown) {
    console.error("[Chat API Error]", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
