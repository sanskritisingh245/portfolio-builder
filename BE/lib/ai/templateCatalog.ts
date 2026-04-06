import fs from "fs"
import path from "path"

const TEMPLATES_DIR = path.join(__dirname, "../../src/Templates")

function loadTemplates(): string {
  const templateNames: Record<number, string> = {
    1: "Terminal Minimal (dark, serif + sans, clean grid)",
    2: "Impact Wall (dark, custom cursor, scroll reveal, progress bar)",
    3: "Deep Space / Sci-Fi (nebula gradients, HUD cards, scanline animation)",
    4: "Newspaper Editorial (sepia, Old English masthead, column layout)",
    5: "Glassmorphic Gradient (purple gradient, glass cards, blur, floating blobs)",
    6: "Neural Map Dark (dot-grid, node-based layout, electric lime accent)",
    7: "Playful Mind Map (light, bold colors, offset ink shadows, colorful nodes)",
    8: "Boarding Pass (ticket metaphor, typewriter animation, luggage tags)",
    9: "Glass Horizon (single glass card, minimal, centered, blob backgrounds)",
    10: "Aether Rose (elegant serif, pink/blue orbs, large glass panels, multi-stage)",
  }

  let catalog = ""

  for (let i = 1; i <= 10; i++) {
    const filePath = path.join(TEMPLATES_DIR, `temp${i}.html`)
    const html = fs.readFileSync(filePath, "utf-8")
    catalog += `\n--- TEMPLATE ${i}: ${templateNames[i]} ---\n${html}\n`
  }

  return catalog
}

export const TEMPLATE_LIBRARY = loadTemplates()
