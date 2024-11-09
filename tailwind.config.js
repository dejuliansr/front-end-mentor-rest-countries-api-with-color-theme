/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: [
    `class`, 
    '[data-theme="dark"]'
  ],
  theme: {
    extend: {
      colors: {
        'dark-mode-element': 'hsl(209, 23%, 22%)',
        'dark-mode-Background': 'hsl(207, 26%, 17%)',
        'light-mode-text': 'hsl(200, 15%, 8%)',
        'light-mode-input': 'hsl(0, 0%, 52%)',
        'light-mode-backround': 'hsl(0, 0%, 98%)',
        'dark-mode-element-text': 'hsl(0, 0%, 100%)',
      },
      fontFamily: {
        rubik: ['"Rubik"'],
      },
    },
  },
  plugins: [],
}

