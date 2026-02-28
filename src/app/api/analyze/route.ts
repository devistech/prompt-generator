import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a prompt engineering expert. Your job is to analyze coding prompts and either:
1. Ask clarifying questions (max 5) if the prompt is ambiguous
2. Generate a fully optimized structured prompt if the prompt is clear

For each prompt, respond in this JSON format:

If clarification needed:
{
  "needsClarification": true,
  "questions": ["question1", "question2"],
  "optimizedPrompt": null,
  "explanation": ""
}

If prompt is clear and you can optimize:
{
  "needsClarification": false,
  "questions": [],
  "optimizedPrompt": {
    "role": "The role AI should assume",
    "objective": "Clear goal of the task",
    "context": "Background information needed",
    "requirements": ["requirement1", "requirement2"],
    "outputFormat": "How the output should be structured",
    "constraints": ["constraint1", "constraint2"]
  },
  "explanation": "Brief explanation of why this version is better"
}

Be precise, professional, and focus on making the prompt production-ready.`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY environment variable is not set" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });
    const body = await request.json();
    const { prompt, questions, answers } = body;

    let userContent = prompt;

    if (questions && answers && questions.length > 0) {
      const context = questions
        .map((q: string, i: number) => `Q: ${q}\nA: ${answers[i]}`)
        .join("\n\n");
      userContent = `${prompt}\n\nAdditional Context:\n${context}`;
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
      max_tokens: 2048,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(responseText);

    if (result.needsClarification && result.questions) {
      result.questions = result.questions.slice(0, 5);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
