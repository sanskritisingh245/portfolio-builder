# Portfolio Builder

An AI-powered portfolio builder. Describe yourself in plain English and get a ready-to-deploy portfolio site generated from a curated template catalog.

## How it works

1. User signs in and sends a prompt describing their background, projects, and style preferences.
2. The backend refines the prompt, picks a template from the catalog, and asks Google's Gemini model (via the Vercel AI SDK) to fill in structured portfolio data.
3. The frontend renders a live preview and lets the user iterate via chat.

## Tech stack

**Frontend** ([FE/vite-project](FE/vite-project))
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Axios

**Backend** ([BE](BE))
- Express 5 + TypeScript
- Prisma 7 + PostgreSQL
- JWT auth + bcrypt
- Google Generative AI via `ai` + `@ai-sdk/google`
- Zod for request validation

## Project structure

```
portfolio-builder/
├── BE/
│   ├── src/
│   │   ├── index.ts          # Express server & routes
│   │   ├── db.ts             # Prisma client
│   │   └── Templates/        # HTML portfolio templates (temp1–temp10)
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── refine.ts           # prompt refinement
│   │   │   ├── generate.ts         # structured portfolio generation
│   │   │   └── templateCatalog.ts  # template registry
│   │   ├── authMiddleware.ts
│   │   └── zod/                    # request schemas
│   └── prisma/schema.prisma        # User, Portfolio, Chats, ChatMessage
└── FE/vite-project/
    └── src/
        ├── Landing.tsx
        ├── Signin.tsx / Signup.tsx
        ├── preview.tsx
        └── components/
            ├── MainLanding.tsx
            ├── SidebarLanding.tsx
            ├── EditorPreview.tsx
            └── webPreview.tsx
```

## API

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/signup` | – | Create a user |
| POST | `/signin` | – | Returns a JWT |
| POST | `/generate` | JWT | Generate portfolio from a prompt; creates/continues a chat |
| GET | `/chats` | JWT | List the current user's chats |
| GET | `/messages/:chatId` | JWT | Fetch all messages in a chat |

## Running locally

### Prerequisites
- Node.js 20+
- A PostgreSQL database
- A Google Generative AI API key

### Backend

```bash
cd BE
npm install
```

Create a `.env` file in the project root (one level above `BE`):

```
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
JWT_SECRET=your-jwt-secret
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-key
```

Run migrations and start the server:

```bash
npx prisma migrate dev
npx ts-node src/index.ts   # or: node --loader ts-node/esm src/index.ts
```

Server runs on `http://localhost:3000`.

### Frontend

```bash
cd FE/vite-project
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Scripts

**Frontend** (`FE/vite-project`)
- `npm run dev` — start Vite dev server
- `npm run build` — typecheck + build
- `npm run lint` — run ESLint
- `npm run preview` — preview production build
