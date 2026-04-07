import express , {type Response, type Request} from "express";
import cors from 'cors';
import { SigninSchema, SignupSchema } from "../lib/zod/zod";
import { prisma } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config({
    path: "../.env"  
})

import { refinePrompt } from "../lib/ai/refine";
import { generateStructuredPortfolio } from "../lib/ai/generate";
import { authMiddleware } from "../lib/authMiddleware";
import { success } from "zod";

const JWT_SECRET=process.env.JWT_SECRET||"";

const app= express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}))

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

app.post("/generate",authMiddleware , async (req:Request, res:Response) => {
    try{
        const { userInput , chatId } = req.body; 
        const userId=req.id;
        let currentId=chatId;

        if(!chatId){
            const chat=await prisma.chats.create({
                data:{userId}
            })
            currentId=chat.id
        }

        await prisma.chatMessage.create({
            data:{
                chatId:currentId,
                type:"USER",
                content:userInput
            }
        })
        
        const history=await prisma.chatMessage.findMany({
            where:{chatId:currentId},
            orderBy:{createdAt:"asc"}
        });

        const message= history.map((msg)=>({
            role:msg.type==="USER"?"user":"assistant",
            content:msg.content
        }))

        const refined = await refinePrompt(userInput)
        const portfolio = await generateStructuredPortfolio(refined)
      
        await prisma.chatMessage.create({
            data:{
                chatId:currentId,
                type:"AGENT",
                content:portfolio
            }
        })

        return res.status(200).json({
          success: true,
            code:portfolio
        })
    }catch(e:any){
        return res.status(500).json({
            success:false,
            msg:e.message ||"Internal Server Error"
        })
    }
})

app.get("/chats", authMiddleware , async (req:Request, res:Response)=>{
    try{
        const userId=req.id;

        const chats=await prisma.chats.findMany({
            where:{userId},
            orderBy:{createdAt:"desc"},
            include:{
                chatmessages:{
                    take:1, 
                    orderBy:{createdAt:"desc"}
                }
            }
        })

       res.status(200).json({
            success:true,
            chats
        })

    }catch(e:any){
        return res.status(500).json({
            success:false,
            msg:e.message ||"Internal Server Error"
        })
    }
})

app.get("/messages/:chatId", authMiddleware, async(req:Request, res:Response)=>{
    try{
        const {chatId}= req.params;

        const messages = await prisma.chatMessage.findMany({
            where:{chatId},
            orderBy:{createdAt:"asc"}
        })

        res.json({
            success:true,
            messages
        })

    }catch(e:any){
        return res.status(500).json({
            success:false,
            msg:e.message ||"Internal Server Error"
        })
    }
})

app.listen(3000,()=>{
    console.log("running on port 3000");
})
