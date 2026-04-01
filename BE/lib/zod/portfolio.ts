import {z} from "zod";

export const portfolioSchema= z.object({
    name:z.string(),
    role:z.string(),
    skills:z.array(z.string()),
    projects:z.array(
        z.object({
            title:z.string(),
            description:z.string(),
            techstack:z.array(z.string())
        })
    ),
    theme:z.string()
})

