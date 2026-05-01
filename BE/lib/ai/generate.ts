import { generateText } from "ai"
import { TEMPLATE_LIBRARY } from "./templateCatalog"
import { createOpenAI } from "@ai-sdk/openai"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateStructuredPortfolio = async (userInput:string) => {
  const { text } = await generateText({
       model: openai("gpt-4o-mini"),
       prompt: `You are a senior frontend developer who builds pixel-perfect portfolio websites. You have 10 reference templates to draw from.

## REFERENCE TEMPLATES

Study these 10 complete HTML templates. Each has 4 sections — HERO, SKILLS, PROJECTS, CONTACT — with a unique design approach (layout, CSS techniques, animations, typography).

${TEMPLATE_LIBRARY}

## YOUR TASK

1. Read the design brief below.
2. Pick exactly ONE hero, ONE skills, ONE projects, and ONE contact section from the templates above — each from a DIFFERENT template. You MUST mix across at least 3 different templates.
3. Replicate the exact HTML structure, CSS techniques, and layout logic from your selected sections. Do NOT approximate or simplify them — copy the structural DNA faithfully.
4. Adapt colors, fonts, and content to match the design brief while keeping the structural patterns intact.

## COMBINATION RULES

- Match visual weight: maximalist heroes (Template 3, 4, 8, 10) pair with calmer skills sections (Template 1, 4, 9). Minimal heroes (Template 1, 9) can pair with expressive skills/projects (Template 2, 3, 6).
- Match background compatibility: dark heroes (Template 1, 2, 3, 6) go with dark sections. Light heroes (Template 4, 7, 8) go with light sections. Glass heroes (Template 5, 9, 10) work with either.
- Unify everything with: ONE color palette from the brief, ONE font pairing, consistent spacing, and ONE border/shadow style throughout.

## STYLE MATCHING GUIDE

Based on the design brief's overall feel:
- Dark / bold / technical → Templates 1, 2, 3, 6
- Clean / editorial / minimal → Templates 1, 4
- Playful / creative / colorful → Templates 7, 8
- Glassmorphic / futuristic / premium → Templates 5, 9, 10
- Sci-fi / cyberpunk → Templates 3, 6
- Elegant / sophisticated / warm → Templates 4, 10

## OUTPUT RULES

- Return ONLY the HTML. No explanation, no markdown, no code fences.
- Copy exact CSS from the selected templates — animations, pseudo-elements, backdrop-filter, keyframes, transitions, hover effects.
- Use a <style> block in <head> with CSS custom properties in :root for the brief's color palette and font families.
- Load Google Fonts from the brief via <link> tags. If none specified, use fonts from the selected templates.
- Use the brief's exact hex colors. If brief says bg #111111, use #111111 — NOT white.
- Fully responsive with mobile breakpoints.
- Valid HTML5 with <!DOCTYPE html>, semantic tags (section, header, footer, main).
- Include JavaScript ONLY if the selected template pattern uses it (typewriter, scroll reveal, custom cursor, progress bar — copy the JS from the reference template).

## CRITICAL CONSTRAINTS

- The brief's colors and fonts override everything. Templates define STRUCTURE only.
- Fill in actual user content from the brief — real name, skills, projects, contact links.
- If no projects provided, create 2 placeholder cards with "Your Project Title" and "Brief description of what this project does".
- Do NOT add colors, gradients, or effects not specified in the brief.
- Do NOT invent content that isn't in the brief.

## ADD THIS COMMENT AT THE TOP (after <!DOCTYPE html>):
<!-- Built from: Template [hero#] hero + Template [skills#] skills + Template [projects#] projects + Template [contact#] contact -->

## DESIGN BRIEF:
${userInput}
`
      })

  const cleanHtml = text
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim()

    return cleanHtml

}
