import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";

export function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "dark"
      | "light"
      | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (t: "dark" | "light") => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(t);
  };

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
      <nav className="glass flex items-center justify-between rounded-2xl px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-hero-gradient glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="text-gradient">ResumeIQ</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#analyze" className="hover:text-foreground transition-colors">Analyze</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
        </div>
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="glass grid h-10 w-10 place-items-center rounded-xl transition-transform hover:scale-105"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </nav>
    </header>
  );
}
