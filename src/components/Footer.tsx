export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-sm text-muted-foreground">
      <div className="glass mx-auto rounded-2xl p-6">
        <p className="font-display text-lg font-semibold text-gradient">ResumeIQ</p>
        <p className="mt-2">Built with React, TypeScript & Tailwind CSS · Your files never leave your browser.</p>
        <p className="mt-3 text-xs">© {new Date().getFullYear()} ResumeIQ. All rights reserved.</p>
      </div>
    </footer>
  );
}
