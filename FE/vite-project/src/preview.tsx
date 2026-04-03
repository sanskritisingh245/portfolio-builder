export const Preview = () =>{
    return(
        <>
            <Editor/>
        </>
    )
}

export const Editor = () =>{
    return(
        <div className="h-screen max-w-2xl bg-black text-white">
            <input
                type="text"
                placeholder="write"
                className="bg-red-500 relative flex justify-center items-center content-centerh-20 w-xl rounded-xl p-5 "
            >
            </input>
            
        </div>
    )
}

export const Portfolio = () =>{
    return(
        <div className="flex animated-gradient">

        </div>
    )
}