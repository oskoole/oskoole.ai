import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai'; 

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = await streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    messages,
  });
  
  return result.toDataStreamResponse();
}