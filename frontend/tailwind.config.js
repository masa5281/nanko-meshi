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
          DEFAULT: "#FF6E2B",
          deep: "#f59e0b",
        } ,
        secondary: "#77C043",
        black: "#333333",
        background: "#FFEEC3",
        header: "#FF763C",
        hover: "#FF915F",
        hoverWhite: "#EDEEEE",
        hoverGray: "#DDDDDD",
        error: "#C42F30",
        errorYellow: "#FFFF00",
        shadow: "#AAA",
        redBar: "#FF3838",
        delete: "#DC2626"
      },
      borderWidth: {
        "1": "1px",
        "40": "40px",
        "50": "50px"
      },
      flexGrow: {
        2: "2"
      },
      backgroundImage: {
        "keyDesktop": "url('./images/key-pc-bg.png')",
        "keyMobile": "url('./images/key-mobile-bg.png')"
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
