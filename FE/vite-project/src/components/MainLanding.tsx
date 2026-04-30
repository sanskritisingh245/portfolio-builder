import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [chatId, setChatId] = useState(localStorage.getItem("chatId"));
  const token = JSON.parse(localStorage.getItem("token") || "");

  async function handleSubmit() {
    //alert("button was clicked")
    setLoading(true);
    console.log("generating from landing ===");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.data,
        },
        body: JSON.stringify({
          userInput: input,
          chatId: chatId || null,
        }),
      });
      console.log("api call finish", res);

      const data = await res.json();
      console.log("done from landing ===", data);

      if (!chatId && data.chatId) {
        setChatId(data.chatId);
        localStorage.setItem("chatId", data.chatId);
      }

      if (res.ok) {
        navigate("/preview", {
          state: data.code,
        });
      }

      if (!res.ok) {
        console.error(data.msg);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        {/* ICON */}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 mx-3">
                  <div className="w-6 h-6 border-3 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
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
            )}
        </button>
      </div>
    </div>
  );
};
