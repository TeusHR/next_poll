import { nextui } from "@nextui-org/react";
import { Config } from "tailwindcss";

const tailwindConfig: Config = {
    future: {
        hoverOnlyWhenSupported: true
    },
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'te': '400px',
                '3xl': '1650px',
                'xsm': '480px'
            },
            colors: {
                fd:'#ffd70d'
            }
        },
    },
    darkMode: "class",
    plugins: [
        nextui({
            defaultTheme: 'light',
            themes: {
                light: {
                    colors: {
                        primary: {
                            DEFAULT: '#2E2C39',
                            '50': '#2E2C39',
                            '100': '#393643',
                            '200': '#43404D',
                            '300': '#575360',
                            '400': '#7F7A86',
                            '500': '#A7A1AC',
                            '600': '#BBB4BF',
                            '700': '#C5BEC9',
                            '800': '#CAC3CE',
                            '900': '#CFC7D2',
                        },
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
