/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.tsx",
        "./resources/js/**/*.tsx",
    ],
    theme: {
        extend: {
            colors: {
                "bakery": {
                    50: "#fdf8f6",
                    100: "#f2e8e5",
                    200: "#eaddd7",
                    300: "#e0cec7",
                    400: "#d2bab0",
                    500: "#a18072",
                    600: "#8a6a5d",
                    700: "#73574d",
                    800: "#5d463e",
                    900: "#483630",
                    DEFAULT: "#8B4513",
                },
                "bakery-gold": "#DAA520",
                "bakery-orange": "#FF8C42",
                cream: {
                    50: "#FFF8F0",
                    DEFAULT: "#FFF8F0",
                },
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            animation: {
                float: "float 3s ease-in-out infinite",
                "bounce-slow": "bounce-slow 3s infinite",
                "fade-in": "fadeIn 1s ease-out",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "bounce-slow": {
                    "0%, 20%, 53%, 80%, 100%": {
                        transform: "translate3d(0,0,0)",
                    },
                    "40%, 43%": { transform: "translate3d(0, -15px, 0)" },
                    "70%": { transform: "translate3d(0, -7.5px, 0)" },
                    "90%": { transform: "translate3d(0,-3px,0)" },
                },
            },
        },
    },
    plugins: [],
};
