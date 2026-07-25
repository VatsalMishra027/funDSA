/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Dynamic CSS Variable tokens (responds to class="dark" automatically)
        bg: 'var(--color-bg)',
        card: 'var(--color-card)',
        main: 'var(--color-text)',
        textSecondary: 'var(--color-text-secondary)',
        accent: 'var(--color-accent)',
        onAccent: 'var(--color-on-accent)',
        accent2: 'var(--color-accent2)',
        focusBg: 'var(--color-focus-bg)',
        focusBorder: 'var(--color-focus-border)',
        focusText: 'var(--color-focus-text)',

        // Light Mode Tokens (explicit hex reference)
        light: {
          background: '#F6F2EA',
          card: '#FFFFFF',
          text: '#21231F',
          textSecondary: '#6C6A5F',
          accent: '#D14E33',
          onAccent: '#FFFFFF',
          accent2: '#E3B34F',
          focusBg: '#FBEFC9',
          focusBorder: '#E3B34F',
          focusText: '#6B4E0C',
        },
        // Dark Mode Chalkboard Tokens (explicit hex reference)
        chalkboard: {
          background: '#16211C',
          card: '#1E2C25',
          text: '#F1EFE4',
          textSecondary: '#9FB0A5',
          accent: '#F07A5C',
          onAccent: '#1A241E',
          accent2: '#F0C868',
          focusBg: '#2B3A2C',
          focusBorder: '#F0C868',
          focusText: '#F4DFA0',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        handwritten: ['Caveat', 'Patrick Hand', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        chalk: '0 4px 0 0 rgba(0, 0, 0, 0.15)',
        'chalk-dark': '0 4px 0 0 rgba(0, 0, 0, 0.4)',
        sticky: '2px 3px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
