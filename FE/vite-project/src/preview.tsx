import { useLocation } from "react-router-dom";
import { WebPreview } from "./components/webPreview";
import { useState } from "react";
import { Editor } from "./components/EditorPreview";

export const Preview = () => {
  const location = useLocation();
  const [code, setCode] = useState(location.state);

  return (
    <div className="flex h-screen ">
      {/* editor part */}
      <div className="w-1/3 bg-black text-white">
        <Editor setCode={setCode} code={code} />
      </div>

      {/*portfolio  */}
      <div className="w-2/3 h-full">
        {!code ? (
          <div className="animated-gradient w-full h-full" />
        ) : (
          <WebPreview code={code} />
        )}
      </div>
    </div>
  );
};
