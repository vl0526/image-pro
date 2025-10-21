export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-label="remove pro Logo"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M85.71,64.29 C92.86,57.14,92.86,42.86,85.71,35.71 C78.57,28.57,64.29,28.57,57.14,35.71 L35.71,57.14 C28.57,64.29,28.57,78.57,35.71,85.71 C42.86,92.86,57.14,92.86,64.29,85.71 L85.71,64.29 Z"
        fill="url(#logoGradient)"
      />
      <path
        d="M14.29,35.71 C7.14,42.86,7.14,57.14,14.29,64.29 C21.43,71.43,35.71,71.43,42.86,64.29 L64.29,42.86 C71.43,35.71,71.43,21.43,64.29,14.29 C57.14,7.14,42.86,7.14,35.71,14.29 L14.29,35.71 Z"
        stroke="hsl(var(--card))"
        strokeWidth="5"
        fill="url(#logoGradient)"
      />
       <path
        d="M42.86,64.29 L35.71,57.14"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
