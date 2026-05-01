import { generateText } from 'ai';
import { createOpenAI } from "@ai-sdk/openai"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const refinePrompt = async(userInput:string)=>{
      const { text } = await generateText({
        model: openai("gpt-4o-mini"),
        prompt: `
          You are an expert portfolio strategist.

          Your job:
          Convert user input into a clean, natural-language design brief for a portfolio website.

          RULES:
          - DO NOT use bullet points or structured format
          - DO NOT use labels like "Name:", "Skills:"
          - Write in paragraph form
          - Fill missing details realistically (but keep it believable)

          Include:
          - Name
          - Role
          - Skills
          - Projects (2-3 realistic ones)
          - Design style (theme, colors, vibe)

          User Input:
          ${userInput}
          `
      })
    return text.trim()
}
