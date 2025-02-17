/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // すべてのJS、JSXファイルをスキャン
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFC05A",
          DEFAULT: "#FF763C"
        } ,
        secondary: "#77C043",
        background: "#FFEEC3",
        header: "#FF763C",
        text: "#333333",
        hover: "#FF915F",
        error: "#C42F30",
        shadow: "#aaa"
      }
    },
  },
  plugins: [],
}
