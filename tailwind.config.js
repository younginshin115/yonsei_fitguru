/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      primary: '#3B82F6', // Blue
      primaryHover: '#2563EB', // Darker Blue for Hover
      accent: '#10B981',  // Green
      accentHover: '#059669', // Darker Green for Hover
      bgColor: '#FFFFFF',
      rightGray: '#D1D5DB',
      textColor: '#1F2937', // Dark Gray
    },
  },
  plugins: [],
}

