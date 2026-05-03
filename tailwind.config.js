/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial light palette
        paper: '#FAF8F3',        // warm off-white base
        paperdeep: '#F4F0E8',    // slightly deeper for hovers/sections
        ink: '#1A1F1A',          // soft black for body
        inksoft: '#5C615C',      // muted ink for secondary text
        moss: '#4A6B3F',         // primary accent — British countryside green
        mossdeep: '#3A5530',     // deeper moss for hover states
        clay: '#D4A373',         // warm earth accent for variation
        line: 'rgba(26, 31, 26, 0.10)', // hairline borders
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
      },
    },
  },
  plugins: [],
};
