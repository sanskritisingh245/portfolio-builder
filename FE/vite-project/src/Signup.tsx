export const Signup = () =>{
    return(
        <div className="flex h-screen w-screen items-center justify-center bg-[radial-gradient(circle_at_50%_100%,#f472b6_0%,#a78bfa_30%,#312e81_65%,#020617_100%)] ">
            <div className="flex flex-col items-center content-center justify-center border rounded-2xl bg-neutral-900 py-16 px-24 shadow-2xl gap-6 ">
                <p className="text-4xl font-bold font-sans text-white">SignUp</p>

                {/* name box */}
                <div className="flex gap-2 items-center">
                    <svg className="size-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>


                    <input
                        className="text-white bg-neutral-800 rounded-full h-10 px-4 outline-none placeholder-gray-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]"
                        type="text"
                        placeholder=" Enter Name"
                    />
                </div>

                {/* email box */}
                <div className="flex gap-2 items-center">
                    <svg className="size-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>


                    <input
                        className="text-white bg-neutral-800 rounded-full h-10 px-4 outline-none placeholder-gray-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]"
                        type="text"
                        placeholder=" Enter Email"
                    />
                </div>

                {/* password box */}
                <div className="flex gap-2 items-center">
                    <svg className="size-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>


                    <input
                        className="text-white bg-neutral-800 rounded-full h-10 px-4 outline-none placeholder-gray-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]"
                        type="password"
                        placeholder=" Enter Password"
                    />
                </div>

                <button 
                    className="border border-black bg-pink-300 text-black h-7 w-30  rounded-sm"
                >
                    SignUp
                </button>
            </div>
        </div>
    )
}