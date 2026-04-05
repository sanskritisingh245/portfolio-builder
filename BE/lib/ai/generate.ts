import { google } from "@ai-sdk/google"
import {  generateText } from "ai"

export const generateStructuredPortfolio = async (userInput:string) => {
  const { text } = await generateText({
        model: google("gemini-2.5-flash"), 
        prompt: `You are a senior frontend developer who converts design briefs into pixel-perfect HTML.

You will receive a PORTFOLIO DESIGN BRIEF below. It contains exact hex colors, Google Font names, Tailwind classes, layout specs, and content. Your job is to translate this brief into a single HTML file — faithfully, with no creative liberties.

## RULES
- Return ONLY the HTML. No explanation, no markdown, no code fences.
- Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
- Load the exact Google Fonts specified in the brief via <link> tags in <head>
- Use the exact hex colors from the DESIGN SYSTEM section. Apply them with Tailwind arbitrary values like bg-[#111111], text-[#E8E8E8], etc.
- Use the exact font families with font-[family] arbitrary values or inline style
- Follow the Layout Approach, Container, Section Spacing, and Content Gap exactly as specified
- Make it fully responsive (mobile-first, use sm:/md:/lg: breakpoints)
- Include all SECTIONS listed in the brief in the specified order

## CRITICAL — FOLLOW THE DESIGN BRIEF
- If the brief says "Dark Editorial" with bg #111111, the page background MUST be #111111 — NOT white
- If the brief says "Playfair Display" for headings, load that font and use it — do NOT default to sans-serif
- Every color, font, spacing, and layout decision is already made in the brief. Do NOT override with your own defaults
- Do NOT add purple, violet, or gradient anything regardless of what feels "modern"

## HTML STRUCTURE
- Valid HTML5 with <!DOCTYPE html>
- <head> must include: Tailwind CDN script, Google Fonts links, and a <style> block for custom font-family classes if needed
- Single page, no navigation needed unless the brief specifies anchor links
- Clean semantic HTML (section, header, footer, main)
- No JavaScript unless absolutely needed for layout

## DESIGN BRIEF:
${userInput}
`
    })

  return text;
}