/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"], // Ensure correct file paths
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["cupcake"], // Set the theme
      logs: true, // Enable logging to check if DaisyUI loads
    },
  };
  