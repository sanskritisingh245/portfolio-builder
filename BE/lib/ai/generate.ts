import { google } from "@ai-sdk/google"
import { generateObject } from "ai"
import { portfolioSchema } from "../zod/portfolio"

export const generateStructuredPortfolio = async (refinePrompt:string) => {
  const { object } = await generateObject({
        model: google("gemini-2.5-flash"), 
        schema: portfolioSchema,
        prompt: `
                Convert the following user input into structured portfolio data.
                IMPORTANT:
                - Follow the schema strictly
                - Do not add extra fields
                - Fill missing details intelligently

                User Input:
                ${refinePrompt}
                `
    })

  return object
}