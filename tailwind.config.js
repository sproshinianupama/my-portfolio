/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        primary: '#6c63ff',
        secondary: '#f50057',
        dark: '#0d0d0d',
        darker: '#080808',
        card: '#111111',
        muted: '#888',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        blob: 'blob 7s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        'spin-slow': 'spin 8s linear infinite',
        'border-spin': 'border-spin 4s ease infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blob: {
          '0%,100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        blink: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'border-spin': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
