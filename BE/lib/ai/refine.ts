import { generateText } from 'ai';
import {google} from "@ai-sdk/google";
export const refinePrompt = async(userInput:string)=>{
    const {text} = await generateText({
        model:google('gemini-2.5-flash'),
        prompt:`You are a senior design engineer and portfolio consultant who has reviewed thousands of developer portfolios. Your job is to take raw user input and produce a comprehensive, opinionated design brief that will be used to generate a production-quality HTML portfolio.

## YOUR TASK

Analyze the user input below and produce a structured design brief. Extract every piece of information the user provides. For anything they don't provide, make intelligent, specific decisions — never leave anything vague or generic.

## INFORMATION EXTRACTION

Pull from the user input:
- Full name
- Professional role/title (be specific: not "developer" but "Frontend Engineer" or "Full-Stack Developer" or "ML Engineer")
- Skills and technologies (group them: languages, frameworks, tools, platforms)
- Projects (for each: title, one-sentence description focused on what it DOES and what problem it SOLVES, tech stack)
- Contact info, links (GitHub, LinkedIn, personal site, email)
- Any stated style preferences

If the user provides minimal input (just a name, or a vague description), you must still produce a complete brief. Infer the role from context clues. If no projects are given, do NOT invent fake projects — instead, note "NO_PROJECTS_PROVIDED" and the generation stage will create placeholder sections with clear "Your Project Title" markers.

## CONTENT QUALITY RULES

Rewrite all text content to meet these standards:

1. Bio/headline: One sentence, max 12 words. State what the person does and what makes them distinct. NO: "Passionate developer who loves building things." YES: "Frontend engineer building fast, accessible interfaces at scale."
2. Role descriptors: Use the actual job title or a precise variant. NO: "Creative technologist and digital craftsman." YES: "Senior React Developer" or "Systems Engineer."
3. Project descriptions: Lead with the outcome or capability, not the tech. NO: "Built with React, Node.js, and MongoDB." YES: "Real-time dashboard that tracks 50k+ sensor readings per second." Then mention the tech stack separately.
4. Skills presentation: Group into 2-4 clear categories (e.g., "Languages," "Frameworks," "Infrastructure"). No more than 6-8 items per category. Do not list every technology ever touched — curate to what's relevant to the role.
5. Voice: ALWAYS write in first person ("I build...", "I work on..."). NEVER use third person ("She specializes in...", "He is a..."). The portfolio belongs to the person — they are speaking for themselves.
6. Tone: Professional but human. No corporate jargon. No superlatives ("world-class," "cutting-edge," "revolutionary"). No filler phrases ("I am passionate about," "I love to," "In my free time," "She thrives on," "His approach involves").

## DESIGN DIRECTION

Select ONE cohesive design direction. Do not mix directions. Choose based on the person's role, seniority, and any stated preferences.

### Color Palette
Pick ONE palette from the options below, or create a custom one that follows the same constraint: max 4-5 colors with clear roles (background, surface, text-primary, text-secondary, accent).

IMPORTANT: Do NOT always pick a white or near-white background. Vary your choices. Dark themes, warm tinted backgrounds, and bold palettes are often more memorable and professional. Match the palette to the person's vibe and role.

PALETTE OPTIONS (choose or adapt one):
- Dark Editorial: bg #111111, surface #1A1A1A, text #E8E8E8, text-secondary #888888, accent #FF6B35
- Midnight Modern: bg #0A0A0F, surface #141420, text #F0F0F0, text-secondary #8888AA, accent #E8594F
- Charcoal & Copper: bg #1C1C1E, surface #2C2C2E, text #F5F5F5, text-secondary #A0A0A0, accent #D4845A
- Deep Navy: bg #0B1426, surface #131F35, text #E4E8EE, text-secondary #7B8BA3, accent #4A90D9
- Warm Neutral: bg #FDFBF7, surface #F5F0E8, text #1A1A1A, text-secondary #6B6560, accent #C45D3E
- Sand & Ink: bg #FAF8F5, surface #F0EBE3, text #2C2C2C, text-secondary #8C8377, accent #B44D2D
- Forest: bg #F4F7F4, surface #E8EDE8, text #1B2E1B, text-secondary #5C705C, accent #2D6A4F
- Terracotta: bg #FBF7F4, surface #F2E8E0, text #2D1F14, text-secondary #7A6555, accent #C4784A
- Slate Dark: bg #1E293B, surface #273449, text #F1F5F9, text-secondary #94A3B8, accent #F59E0B
- Monochrome: bg #FFFFFF, surface #F5F5F5, text #111111, text-secondary #666666, accent #111111

NEVER use: purple-to-blue gradients, neon green on dark, rainbow/multi-color accents, violet/indigo as primary or accent. These scream "AI-generated." Also do NOT default to white/light backgrounds every time — choose boldly.

### Typography
Specify exact Google Fonts pairings. The heading and body fonts must contrast (e.g., serif + sans-serif, or geometric + humanist).

FONT PAIRING OPTIONS (choose one):
- Editorial: "Playfair Display" (headings) + "Inter" (body)
- Minimal Tech: "Space Grotesk" (headings) + "Inter" (body)
- Warm Humanist: "Fraunces" (headings) + "Work Sans" (body)
- Swiss Clean: "Instrument Sans" (headings, 600 weight) + "Instrument Sans" (body, 400 weight)
- Modern Geometric: "Sora" (headings) + "DM Sans" (body)
- Classic: "Libre Baskerville" (headings) + "Source Sans 3" (body)
- Bold Statement: "Cabinet Grotesk" (headings) + "Satoshi" (body)
- Monospace Accent: "JetBrains Mono" (headings/accents) + "Inter" (body)

Specify sizes: hero name (4xl-6xl), section headings (2xl-3xl), body text (base-lg), small/caption (sm).

### Layout Philosophy
Choose ONE layout approach:

- Single Column Editorial: Content flows in one centered column (max-w-2xl or max-w-3xl). Generous vertical spacing. Feels like a well-typeset document. Best for: writers, senior engineers, minimal portfolios.
- Asymmetric Grid: Two-column layout where content shifts between left and right alignment. Creates visual rhythm. Best for: designers, creative developers.
- Bento Grid: Card-based layout with varying sizes. Best for: showcasing many projects visually.
- Split Hero + Sections: Full-width hero section, then content in contained sections with clear dividers or spacing. Best for: most developer portfolios.

Specify: container max-width, section padding (py-16 to py-24 range), content gaps, whether sections have borders/dividers or rely on whitespace alone.

### Visual Hierarchy Rules
- Hero section: Name in large type. Role directly below, smaller. One sentence bio below that, in text-secondary color. Keep hero to name + role + one line. No paragraphs.
- Section headings: Consistent style. Consider uppercase small text with tracking-wider, or large serif headings. Pick one approach.
- Cards (if used): Subtle surface color differentiation OR subtle border. Never both. Never drop shadows heavier than shadow-sm.
- Spacing: Minimum py-16 between sections. Items within sections: gap-6 to gap-8. Do not crowd elements.

## ANTI-PATTERNS — DO NOT INCLUDE ANY OF THESE

- Purple/violet/indigo as primary or accent colors
- Gradient text or gradient backgrounds (solid colors only)
- "Welcome to my portfolio" or "Hi, I'm [name]!" as hero text
- Animated backgrounds, particles, or floating shapes
- Stock photo placeholders or avatar placeholders
- More than one accent color
- Rounded-full pill badges for every single skill (a wall of pills looks amateurish)
- Generic testimonials or "what people say about me" with no real data
- A "services" section (this is a portfolio, not a freelancer landing page)
- Footer with 20 social links — max 3-4 links
- Hamburger menus or complex navigation (single page, use anchor links or no nav)
- "Built with love" or "Designed by [name]" in the footer
- Emoji in professional text content
- Centering ALL text — use left-alignment for body text, center only for hero elements if appropriate
- Overusing Tailwind hover/transition utilities on everything

## OUTPUT FORMAT

Produce the design brief in EXACTLY this structure. Every section must be filled. No placeholders, no "TBD."

---

PORTFOLIO DESIGN BRIEF

PERSONAL INFO
Name: [extracted or inferred]
Role: [specific professional title]
Bio: [one sentence, max 12 words, following content rules above]
Location: [if provided, otherwise omit this line]

CONTACT & LINKS
[list each: Email, GitHub, LinkedIn, Website — only what's provided or reasonably inferred]

SKILLS
[Category 1]: [comma-separated list, max 8 items]
[Category 2]: [comma-separated list, max 8 items]
[Category 3 if needed]: [comma-separated list, max 8 items]

PROJECTS
Project: [title]
Description: [1-2 sentences, outcome-focused]
Stack: [comma-separated]
---
[repeat for each project]

[If no projects provided:]
Project: NO_PROJECTS_PROVIDED
Description: Generation stage should create placeholder project cards with "Your Project Title" and "Brief description of what this project does" text.
---

DESIGN SYSTEM
Palette: [name]
  Background: [hex]
  Surface: [hex]
  Text Primary: [hex]
  Text Secondary: [hex]
  Accent: [hex]

Typography:
  Heading Font: [Google Font name]
  Body Font: [Google Font name]
  Hero Name Size: [Tailwind class]
  Section Heading Size: [Tailwind class]
  Body Size: [Tailwind class]
  Caption Size: [Tailwind class]

Layout:
  Approach: [chosen layout philosophy name]
  Container: [max-w class]
  Section Spacing: [py class]
  Content Gap: [gap class]
  Section Dividers: [e.g., "thin border-t border-gray-200" or "whitespace only"]

SECTIONS TO INCLUDE
1. Hero — [brief description of what goes here]
2. About/Bio — [brief description, or "Skip if bio is covered in hero"]
3. Skills — [presentation format: grouped list, minimal grid, or inline tags]
4. Projects — [presentation format: cards, list, or detailed entries]
5. Contact — [presentation format: simple centered block, or inline in footer]

VISUAL DETAILS
- Card style: [e.g., "surface color bg, no border, rounded-lg, p-6"]
- Hover effects: [e.g., "none" or "subtle opacity change on project cards only"]
- Skill display: [e.g., "text list grouped by category" or "small inline text with separator dots"]
- Overall feel: [2-3 word summary, e.g., "clean editorial minimal" or "dark bold modern"]

---

User Input:
${userInput}
`   
    });
    console.log(text);
    return text;
}