import { House, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () =>{
    return(
        <div className="flex">
            <SideBar/>
            <Main/>
        </div>
    )
}

export const SideBar = () =>{
    return(
        <div className="flex h-screen">
            <aside className="bg-black w-60 text-white animate-slide-left">

                {/* icon */}
                <div className="pb-5 my-3 mx-1.5 ">
                    <svg
                    className="size-9"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <defs>
                        <radialGradient id="grad1" cx="50%" cy="100%" r="100%">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="30%" stopColor="#a78bfa" />
                        <stop offset="65%" stopColor="#312e81" />
                        <stop offset="100%" stopColor="#020617" />
                        </radialGradient>
                    </defs>

                    <path
                        stroke="url(#grad1)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.2 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                    </svg>
                </div>

                {/* search features */}
                <div className="flex flex-col">
                    <div className="flex gap-2 pb-5 items-center">
                        <House className="h-4"/>
                        Home
                    </div>
                    <div className="flex gap-2 pb-5 items-center">
                        <Search className="h-4"/>
                        Search
                    </div>
                </div>

                {/* projects */}
                <div>
                    <p className="text-gray-400 pb-5">Projects</p>
                    <div className="flex gap-2 pb-3">
                        <svg className="size-5"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                        </svg>
                        <p className="text-sm">All Projects</p>
                    </div>

                    <div className="flex gap-2 pb-3">
                        <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <p>Starred</p>
                    </div>

                    {/* history */}
                    <div className="pt-4">
                        <p className="text-gray-400">Recents</p>
                    </div>

                </div>
            </aside>
        </div>
    )
}


export const Main = () =>{
    const[input, setInput]=useState("");
    const[loading, setLoading]=useState(false);
    const navigate= useNavigate();

    async function handleSubmit(){
        alert("button was clicked")
        setLoading(true);
        const res= await fetch("http://localhost:3000/generate",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                userInput:input
            })
        }) 
        const data = await res.json()
        console.log(data)
        if(res.ok){
            navigate("/preview",{
                state: data.code 
            })
        }   
    }

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        setInput(e.target.value)
    }

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center animated-gradient">
            {/* top phrase */}
            <div className="text-3xl mb-12 font-semibold font-sans tracking-wide text-white animate-fade-scale">
                What's on your mind, Sanskriti ?
            </div>

            <div className="relative w-200 flex animate-fade-scale-d1">
                 {/* Input box */}
                <input
                    className="w-full h-24 rounded-4xl text-white px-8 pr-16 bg-neutral-800 outline-none placeholder-gray-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]"
                    type="text"
                    placeholder="Generate a portfolio that gets me hired…."
                    onChange={handleChange}
                />
                 {/* ICON */}
                <button onClick={handleSubmit}>
                    <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 mx-3 bg-neutral-800 rounded-full  size-6 text-gray-400 "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
}
