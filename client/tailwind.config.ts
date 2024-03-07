import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss";

const tailwindConfig: Config = {
    future: {
        hoverOnlyWhenSupported: true
    },
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'te': '400px',
                '3xl': '1650px',
                'xsm': '480px'
            },
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            defaultTheme: 'light',
            themes: {
                light: {
                    colors: {
                        primary: {},
                    },
                    layout: {
                        fontSize: {
                            medium: '20px',
                            tiny: '12px',
                            small: '14px',
                            large: '24px'
                        }
                    }
                },
            }
        })
    ]
}

export default tailwindConfig
