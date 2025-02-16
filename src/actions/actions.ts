'use server';

import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateQuote(prompt: string) {
  if (!prompt) {
    throw new Error('Prompt is required');
  } else if (prompt.length > 100) {
    throw new Error('Prompt is too long');
  }

  const chatCompletion = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: `Create a fitness motivational quote based on the following topic.\n
            Topic: ${prompt}\n
            Cringy motivational quote:`,
      },
    ],
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const quote = chatCompletion.choices[0].message.content;
  return quote;
}
