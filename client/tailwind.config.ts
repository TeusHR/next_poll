
import { Config } from "tailwindcss";
import {heroui} from "@heroui/react";

// import withMT from "@material-tailwind/react/utils/withMT";

const tailwindConfig: Config = {
    future: {
        hoverOnlyWhenSupported: true
    },
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'te': '400px',
                '3xl': '1650px',
                'xsm': '480px'
            },
            colors: {
                fd:'#FEC938'
            },
            grayscale: {
              75:'75%'
            }
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
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
                        warning:'#FEC938',
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
        }),
    ]
}

export default tailwindConfig
