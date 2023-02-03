const colors = require("tailwindcss/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["**/*.{tsx,ts}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    lightest: colors.gray[50],
                    light: colors.gray[400],
                    DEFAULT: colors.gray[600],
                },
                secondary: {
                    light: colors.indigo[500],
                    DEFAULT: colors.indigo[600],
                    dark: colors.indigo[700],
                },
                positive: colors.green[500],
                negative: colors.rose[500],
                neutral: {
                    ...colors.neutral,
                    DEFAULT: colors.slate[500],
                },
            },
            keyframes: {
                "fade-in-down": {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(-75%)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0%)",
                    },
                },
            },
            animation: {
                "fade-in-down": "fade-in-down 1.25s",
            },
        },
    },
    plugins: [],
};
