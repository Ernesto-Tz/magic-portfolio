export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Radial gradient glow — bottom-left, violet */}
      <div
        style={{
          position: "absolute",
          left: "10%",
          top: "85%",
          width: "55%",
          height: "45%",
          transform: "translate(-0%, -50%)",
          background:
            "radial-gradient(ellipse at center, hsl(263 70% 40% / 0.25) 0%, transparent 70%)",
        }}
      />
      {/* Diagonal lines pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.15,
          backgroundImage:
            "repeating-linear-gradient(45deg, hsl(240 5% 65% / 0.3) 0px, hsl(240 5% 65% / 0.3) 1px, transparent 1px, transparent 64px)",
        }}
      />
    </div>
  );
}
