import { useState } from "react";

export const Editor = ({ code, setCode }: any) => {
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(localStorage.getItem("chatId"));
  const token = JSON.parse(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      console.log("generating from editor ===");
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/generate`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: token.data,
        },
        body: JSON.stringify({
          userInput: `${input} this is my old page ${code}`,
          chatId: chatId || null,
        }),
      });
      console.log("api call from editor finish");
      const data = await res.json();
      console.log("response from editor ===", data);
      setCode(data.code);

      if (!chatId && data.chatId) {
        setChatId(data.chatId);
        localStorage.setItem("chatId", data.chatId);
      }

      if (!res.ok) {
        console.error(data.msg);
        return;
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="h-screen flex justify-center items-end  max-w-2xl bg-black text-white">
      <div className="relative mx-5  mb-4 w-xl">
        <input
          type="text"
          placeholder="write"
          onChange={handleChange}
          className="bg-neutral-800 h-12 w-full rounded-full pl-5 pr-12"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
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
          )}
        </button>
      </div>
    </div>
  );
};
