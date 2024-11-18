/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      primary: '#3B82F6', // Blue
      accent: '#10B981',  // Green
      bgColor: '#FFFFFF', // Light Gray (기존 bg 대신 bgColor 사용)
      textColor: '#1F2937', // Dark Gray (기존 text 대신 textColor 사용)
    },
  },
  plugins: [],
}

