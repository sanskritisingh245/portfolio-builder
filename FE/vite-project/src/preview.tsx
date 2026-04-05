import { useLocation } from "react-router-dom"
import { WebPreview } from "./webPreview"

export const Preview = () =>{
    const location = useLocation();
    const code= location.state

    return(
        <div className="flex h-screen ">
            {/* editor part */}
            <div className="w-1/3 bg-black text-white">
                <Editor/>
            </div>

            {/*portfolio  */}
            <div className="w-2/3 h-full">
                {!code ? (
                    <div className="animated-gradient w-full h-full"/>
                ):(
                    <WebPreview code={code}/>
                )}
            </div>
            
        </div>
    )
}

export const Editor = () =>{
    return(
        <div className="h-screen flex justify-center items-end  max-w-2xl bg-black text-white">
            <div className="relative mx-5  mb-4 w-xl">
                <input
                    type="text"
                    placeholder="write"
                    className="bg-neutral-800 h-12 w-full rounded-full pl-5 pr-12"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2">
                    <svg
                        className="bg-neutral-700 rounded-full size-8 p-1.5 text-gray-400"
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

// export const Portfolio = () =>{
//     const [loading , setLoading] = useState(true)
//     return(
//         <div className="animated-gradient  w-screen outline-none h-screen  ">
            
//         </div>
//     )
// }