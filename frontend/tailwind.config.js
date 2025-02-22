const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // すべてのJS、JSXファイルをスキャン
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFC05A",
          DEFAULT: "#FF6E2B"
        } ,
        secondary: "#77C043",
        background: "#FFEEC3",
        header: "#FF763C",
        text: "#333333",
        hover: "#FF915F",
        error: "#C42F30",
        shadow: "#AAA",
        redBar: "#FF3838"
      },
      borderWidth: {
        "40": "40px",
        "50": "50px"
      },
      flexGrow: {
        2: "2"
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
