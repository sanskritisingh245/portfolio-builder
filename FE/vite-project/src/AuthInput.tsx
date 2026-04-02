import { useState, useRef, useCallback } from "react";

interface AuthInputProps {
  type: string;
  placeholder: string;
  label: string;
  rightLabel?: string;
}

export const AuthInput = ({
  type,
  placeholder,
  label,
  rightLabel,
}: AuthInputProps) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [sweepDone, setSweepDone] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const measure = useCallback(
    (text: string) => {
      if (!inputRef.current) return 0;
      if (!canvasRef.current)
        canvasRef.current = document.createElement("canvas");
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return 0;

      const style = window.getComputedStyle(inputRef.current);
      ctx.font = `${style.fontSize} ${style.fontFamily}`;
      const display = type === "password" ? "\u2022".repeat(text.length) : text;
      return ctx.measureText(display).width;
    },
    [type]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);

    if (v && inputRef.current) {
      const textW = measure(v);
      const inputW = inputRef.current.offsetWidth;
      setBarWidth(Math.min((textW + 8) / inputW, 1));
    } else {
      setBarWidth(0);
    }
  };

  const showSweep = focused && !value && !sweepDone;
  const showBar = focused && !!value;

  return (
    <div className="relative pb-px">
      <div className="flex items-center justify-between mb-2.5">
        <label className="block text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
          {label}
        </label>
        {rightLabel && (
          <span className="text-[11px] text-neutral-600 cursor-pointer hover:text-neutral-300 transition-colors">
            {rightLabel}
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => { setFocused(true); setSweepDone(false); }}
        onBlur={() => { setFocused(false); setSweepDone(false); }}
        className="w-full pb-3 bg-transparent border-b border-neutral-800 text-white text-sm placeholder-neutral-600 outline-none caret-white focus:border-transparent"
      />
      {/* Gradient underline */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] overflow-hidden rounded-full">
        {showSweep && (
          <div
            className="absolute inset-y-0 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-underline-sweep rounded-full"
            onAnimationEnd={() => setSweepDone(true)}
          />
        )}
        {showBar && (
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 rounded-full"
            style={{
              width: `${barWidth * 100}%`,
              transition: "width 120ms ease-out",
            }}
          />
        )}
      </div>
    </div>
  );
};
