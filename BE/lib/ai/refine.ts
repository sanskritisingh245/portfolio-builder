import { generateText } from 'ai';
import {google} from "@ai-sdk/google";
export const refinePrompt = async(userInput:string)=>{
    const {text} = await generateText({
        model:google('gemini-2.5-flash'),
        prompt:`You are an expert portfolio strategist
                Convert the following user input into a detailed structured prompt 
                that can be used to generate a professional developer portfolio.
                Output format:
                - Name:
                - Role:
                - Skills:
                - Projects: 
                        -Title:
                        -Description:
                        -Tech Stack:
                - Theme/style:
                User Input:
                ${userInput}
                `   
    });
    console.log(text);
    return text;
}