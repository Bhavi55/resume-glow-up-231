import { ArrowDown, Bot, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pt-16 pb-24 text-center">
      {/* floating blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-10 left-10 h-72 w-72 rounded-full bg-primary/40 blur-3xl animate-float-slow" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-accent/40 blur-3xl animate-float-slower" />
      </div>

      <div className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-ring" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        AI‑powered resume intelligence
      </div>

      <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
        Land more interviews with a{" "}
        <span className="text-gradient">smarter resume</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
        Upload your resume and get an instant ATS score, missing keywords, detected skills,
        and tailored suggestions to help you stand out.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#analyze"
          className="group relative inline-flex items-center gap-2 rounded-full bg-hero-gradient px-7 py-3 text-sm font-semibold text-primary-foreground glow transition-transform hover:scale-105"
        >
          Analyze my resume
          <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </a>
        <a
          href="#features"
          className="glass rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-105"
        >
          See what you get
        </a>
      </div>

      <div id="features" className="mt-20 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Zap, title: "Instant ATS Score", desc: "Know how bots read your resume in seconds." },
          { icon: Bot, title: "Smart Suggestions", desc: "Actionable rewrites for stronger impact." },
          { icon: ShieldCheck, title: "Private & Local", desc: "Parsing happens in your browser." },
        ].map((f) => (
          <div key={f.title} className="glass rounded-2xl p-6 text-left transition-transform hover:-translate-y-1">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-hero-gradient">
              <f.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
