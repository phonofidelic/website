import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // colors: {
      //   background: 'var(--background)',
      //   foreground: 'var(--foreground)',
      // },
    },
    borderWidth: {
      ...defaultTheme.borderWidth,
      '3': '3px',
    },
  },
  plugins: [],
} satisfies Config
