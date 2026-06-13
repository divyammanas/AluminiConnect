/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#11221d',
        canvas: '#f4f7f5',
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b'
        }
      },
      boxShadow: {
        soft: '0 18px 50px rgba(17, 34, 29, 0.10)'
      }
    }
  },
  plugins: []
};

