/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#173B2E",
        "forest-light": "#2C6B52",
        mint: "#4E9C82",
        "mint-tint": "#E4F1EC",
        amber: "#C98A2C",
        "amber-tint": "#FBEEDA",
        danger: "#B23B3B",
        "danger-tint": "#FAE6E6",
        bg: "#F6F5F0",
        paper: "#FFFFFF",
        ink: "#152420",
        "ink-soft": "#5B6B64",
        "ink-faint": "#93A099",
        line: "#DEDCD2"
      },
      fontFamily: {
        serif: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"]
      },
      borderRadius: {
        lg2: "22px",
        md2: "14px",
        sm2: "9px"
      }
    }
  },
  plugins: []
};
