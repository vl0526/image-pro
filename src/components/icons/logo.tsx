export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-label="Remove Pro Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M20 20 L80 20 L80 80 L20 80 Z"
        stroke="url(#logoGradient)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 40 L60 60"
        stroke="hsl(var(--foreground))"
        strokeWidth="8"
        strokeLinecap="round"
      />
       <path
        d="M60 40 L40 60"
        stroke="hsl(var(--foreground))"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}
