export const WebPreview =({code}:any)=>{
    return(
        <iframe
            srcDoc={code}
            className="w-full h-full border-none"
            sandbox="allow-scripts "
            title="preview"
        />
    )
}