import express , {type Response, type Request} from "express";
import cors from 'cors';
import { SigninSchema, SignupSchema } from "../lib/zod/zod";
import { prisma } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { refinePrompt } from "../lib/ai/refine";
import { generateStructuredPortfolio } from "../lib/ai/generate";

const JWT_SECRET=process.env.JWT_SECRET||"";

const app= express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req:Request, res:Response)=>{
    try{
        const{success, data}=SignupSchema.safeParse(req.body);
        //console.log("bE",req.body);
        if(!success){
            return res.status(400).json({
                success:false,
                error:"INVALID_REQUEST"
            })
        }

        const exsistingUser= await prisma.user.findUnique({
            where:{email:data.email}
        })

        if(exsistingUser){
            res.status(400).json({
                success:false,
                error:"user already exsist please signin"
            })
        }

        const hash= await bcrypt.hash(data.password, 10);
        const user= await prisma.user.create({
            data:{
                name:data.name,
                email:data.email,
                password:hash
            }
        })

        return res.status(200).json({
            success:true,
            msg:"Successfully Signedup!"
        })

    }catch(e:any){
        return res.status(500).json({
        success: false,
        msg: e.message || "Internal Server Error",
      });
    }
})

app.post("/signin", async (req:Request, res:Response)=>{
    try{
        const {success, data}=SigninSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({
                success:false,
                error:"INVALID_REQUEST"
            })
        }

        const exsistingUser= await prisma.user.findUnique({
            where:{email:data.email}
        })

        if(!exsistingUser){
            res.status(400).json({
                success:false,
                error:"Please signup first"
            })
        }

        const password= await bcrypt.compare( data.password,exsistingUser?.password)
        if(!password){
            return res.status(400).json({
                success:false,
                error:"Incorrect Password"
            })
        }

        const token = jwt.sign({
            id:exsistingUser?.id,
            name:exsistingUser?.name,
            email:exsistingUser?.email
        },JWT_SECRET)

        return res.status(200).json({
            success:true,
            data:token,
            msg:"Successfully SignedUp"
        })
    }catch(e:any){
        return res.status(500).json({
            success:false,
            msg:e.message ||"Internal Server Error"
        })
    }
})

app.post("/generate", async (req:Request, res:Response) => {
  const { userInput } = req.body;

  const refined = await refinePrompt(userInput)
  const portfolio = await generateStructuredPortfolio(refined)

  return res.status(200).json({
    success: true,
    data: portfolio
  })
})

app.listen(3000,()=>{
    console.log("running on port 3000");
})


// frontend code for rendering component
// const res = await fetch("/generate", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ userInput: "..." })
// })

// const data = await res.json()
// <Portfolio data={data.data} />