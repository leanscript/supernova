const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.vue",
    ],
    theme: {
        fontFamily: {
            sans: ["Inter var", ...defaultTheme.fontFamily.sans]
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            red: colors.red,
            white: colors.white,
            gray: colors.gray,
            indigo: colors.indigo,
            yellow: colors.yellow,
            blue: colors.blue,
            pink: colors.pink,
            green: colors.green,
            slate: colors.slate,
            orange: colors.amber,
            "sn-primary": "var(--sn-primary)",
            "sn-secondary": "var(--sn-secondary)",
            "sn-transparent": "var(--sn-transparent)",
            "sn-accent": "var(--sn-accent)",
            "sn-accent-lighter": "var(--sn-accent-lighter)",
            "sn-text": "var(--sn-text)",
            "mana-red": {
                "50": "#FBF4F4",
                "100": "#F7E9E9",
                "200": "#EBC8C8",
                "300": "#DFA6A7",
                "400": "#C76464",
                "500": "#AF2122",
                "600": "#9E1E1F",
                "700": "#691414",
                "800": "#4F0F0F",
                "900": "#350A0A"
            },
            "mana-blue": {
                "50": "#F6F8FA",
                "100": "#ECF1F5",
                "200": "#D0DCE7",
                "300": "#B3C7D9",
                "400": "#7A9CBC",
                "500": "#41729F",
                "600": "#3B678F",
                "700": "#27445F",
                "800": "#1D3348",
                "900": "#142230"
            },
        }
    },
    plugins: [
        require("@tailwindcss/forms")
    ]
};
