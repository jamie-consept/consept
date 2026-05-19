/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Each colour reads from a CSS variable holding R G B channels.
        // The `<alpha-value>` placeholder is filled by Tailwind when an
        // opacity modifier is used (e.g. bg-paper/80 → rgb(... / 0.8)),
        // and defaults to 1 otherwise. This is the canonical Tailwind v3
        // pattern for CSS-var-driven themeable colours with alpha support.
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        paperdeep: 'rgb(var(--c-paperdeep) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        inksoft: 'rgb(var(--c-inksoft) / <alpha-value>)',
        moss: 'rgb(var(--c-moss) / <alpha-value>)',
        mossdeep: 'rgb(var(--c-mossdeep) / <alpha-value>)',
        clay: 'rgb(var(--c-clay) / <alpha-value>)',
        // `line` is always used with a fixed low alpha for hairline borders.
        // Tailwind doesn't have a clean way to make /<alpha-value> default
        // to a non-1 value, so we hardcode the alpha here. Components that
        // use `border-line` get the right shade for the active theme.
        line: 'rgb(var(--c-line) / 0.10)',
      },
      fontFamily: {
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
      },
    },
  },
  plugins: [],
};
