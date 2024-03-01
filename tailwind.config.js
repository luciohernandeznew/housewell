/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            austin: ["Austin News Deck"],
            mint: ["Mint Grotesk"],
        },
        scale: {
            100: "100%",
            95: "95%",
            90: "90%",
            85: "85%",
            80: "80%",
            75: "75%",
            70: "70%",
            60: "60%",
            50: "50%",
            45: "45%",
            40: "40%",
            39: "39%",
            35: "35%",
            30: "30%",
            25: "25%",
            20: "20%",
            10: "10%",
        },
    },
    plugins: [],
};
