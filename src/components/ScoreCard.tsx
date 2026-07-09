type Props = { score: number };

export function ScoreCard({ score }: Props) {
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const tier =
    score >= 80 ? { label: "Excellent", color: "var(--success)" }
    : score >= 60 ? { label: "Good", color: "var(--accent)" }
    : score >= 40 ? { label: "Fair", color: "var(--warning)" }
    : { label: "Needs work", color: "var(--destructive)" };

  return (
    <div className="glass rounded-3xl p-8 text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">ATS Compatibility</p>
      <div className="relative mx-auto mt-4 grid h-56 w-56 place-items-center">
        <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
          <circle cx="100" cy="100" r={radius} stroke="var(--color-muted)" strokeWidth="12" fill="none" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="url(#scoreGrad)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.2 300)" />
              <stop offset="50%" stopColor="oklch(0.75 0.18 220)" />
              <stop offset="100%" stopColor="oklch(0.78 0.19 180)" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <div className="font-display text-6xl font-bold text-gradient">{score}</div>
          <div className="text-xs text-muted-foreground">out of 100</div>
        </div>
      </div>
      <div
        className="mt-4 inline-block rounded-full px-4 py-1 text-sm font-semibold"
        style={{ background: `color-mix(in oklab, ${tier.color} 20%, transparent)`, color: tier.color }}
      >
        {tier.label}
      </div>
    </div>
  );
}
