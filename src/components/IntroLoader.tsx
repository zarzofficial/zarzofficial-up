import { useState, useEffect } from "react";

export function IntroLoader({ onFinished }: { onFinished: () => void }) {
  const [phase, setPhase] = useState<"loading" | "fadeout" | "done">("loading");

  useEffect(() => {
    // Minimum display: 800ms so the brand registers, max: waits for DOM ready
    const minTimer = setTimeout(() => {
      setPhase("fadeout");
    }, 800);

    const handleLoad = () => {
      // If already past minimum, fade out immediately
      setTimeout(() => setPhase("fadeout"), 100);
    };

    if (document.readyState === "complete") {
      // Already loaded — just respect the minimum
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (phase === "fadeout") {
      const t = setTimeout(() => {
        setPhase("done");
        onFinished();
      }, 500); // matches CSS transition duration
      return () => clearTimeout(t);
    }
  }, [phase, onFinished]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "#0c0a10" }}
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#7c3aed]/8 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Brand */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo text */}
        <div className="flex items-center gap-3">
          <span
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #d0bcff 0%, #f5d9fe 50%, #d0bcff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ZARZ
          </span>
          <span className="text-white/20 text-3xl md:text-4xl font-light">|</span>
          <span className="text-3xl md:text-4xl font-black text-white/90">زارز</span>
        </div>

        {/* Minimal spinner */}
        <div className="relative w-8 h-8 mt-2">
          <div
            className="absolute inset-0 rounded-full border-2 border-white/5"
          ></div>
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d0bcff] animate-spin"
            style={{ animationDuration: "0.8s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
