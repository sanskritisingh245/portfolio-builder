import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
    const[loading, setLoading]=useState(false);
    const[credentials, setCredentails]=useState({
        email:"",
        password:""
    })
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const{name, value}=e.target;
        setCredentails({
            ...credentials,
            [name]:value
        })

    }
    const navigate=useNavigate();
    async function handleSignin(){
        setLoading(true);
        const res= await fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/signin`,{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(credentials)
        })
        const data=await res.json();
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data))
        if(res.ok){
            navigate("/landing")
        }
        setLoading(false);
        
    }
  return (
    <div className="flex h-screen w-screen items-center justify-center animated-gradient">
      <div className="w-full max-w-sm relative animate-card-in">
        {/* Card border glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-neutral-600/40 via-neutral-800/20 to-transparent" />

        <div className="relative bg-neutral-950/90 backdrop-blur-2xl rounded-2xl px-8 pt-10 pb-8 shadow-[0_0_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden stagger-in">
          {/* Accent line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-neutral-400/40 to-transparent" />

          {/* Corner decoration */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl" />

          {/* Header */}
          <div className="mb-9">
            <p className="text-neutral-500 text-[11px] font-medium uppercase tracking-[0.2em] mb-3">
              Welcome back
            </p>
            <h2 className="text-[22px] font-bold text-white leading-snug tracking-tight">
              Sign in to
              <br />
              your account
            </h2>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="relative pb-px">
              <label className="block text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-2.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="w-full pb-3 bg-transparent border-b border-neutral-800 text-white text-sm placeholder-neutral-600 outline-none caret-white focus:border-neutral-400 transition-colors"
              />
            </div>

            <div className="relative pb-px">
              <div className="flex items-center justify-between mb-2.5">
                <label className="block text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] text-neutral-600 cursor-pointer hover:text-neutral-300 transition-colors">
                  Forgot?
                </span>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full pb-3 bg-transparent border-b border-neutral-800 text-white text-sm placeholder-neutral-600 outline-none caret-white focus:border-neutral-400 transition-colors"
              />
            </div>

            {/* Submit */}
            <button className="btn-glow group w-full h-10 mt-2 flex items-center justify-center gap-2 bg-white text-black text-sm font-semibold rounded-full active:scale-[0.97] cursor-pointer"
                    onClick={handleSignin}
            >
              Sign in
              <svg
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>

          {/* Social */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="text-neutral-600 text-[11px]">or with</span>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-500 hover:bg-white/5 transition-all cursor-pointer">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-neutral-500 hover:bg-white/5 transition-all cursor-pointer">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-neutral-600 text-[11px]">
            No account?{" "}
            <Link
              to="/signup"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
