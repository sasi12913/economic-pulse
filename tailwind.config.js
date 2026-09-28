/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#1e293b',
          950: '#0f172a',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          600: '#334e68',
          800: '#102a43',
          900: '#0b1b2b',
        },
        accent: {
          blue: '#2563eb',
          teal: '#0d9488',
          amber: '#d97706',
          rose: '#e11d48',
          indigo: '#4f46e5'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
