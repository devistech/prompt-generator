import Groq from "groq-sdk";
import { AnalysisResult } from "@/types";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY environment variable is not set");
  }
  return new Groq({ apiKey });
}

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

export async function analyzePrompt(rawPrompt: string): Promise<AnalysisResult> {
  try {
    const groq = getGroqClient();
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: rawPrompt,
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

    const result = JSON.parse(responseText) as AnalysisResult;
    
    if (result.needsClarification && result.questions) {
      result.questions = result.questions.slice(0, 5);
    }

    return result;
  } catch (error) {
    console.error("Groq API error:", error);
    throw error;
  }
}

export async function generateWithAnswers(
  rawPrompt: string,
  questions: string[],
  answers: string[]
): Promise<AnalysisResult> {
  const context = questions
    .map((q, i) => `Q: ${q}\nA: ${answers[i]}`)
    .join("\n\n");

  const enhancedPrompt = `${rawPrompt}\n\nAdditional Context:\n${context}`;

  return analyzePrompt(enhancedPrompt);
}
