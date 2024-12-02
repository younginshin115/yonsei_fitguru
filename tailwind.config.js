/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { // 기존 색상 팔레트 확장
      colors: {
        primary: '#3B82F6', // Blue
        primaryHover: '#2563EB', // Darker Blue for Hover
        accent: '#10B981',  // Green
        accentHover: '#059669', // Darker Green for Hover
        rightGray: '#D1D5DB',
        textColor: '#1F2937', // Dark Gray
      },
    },
  },
  plugins: [],
}

