import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    optimizeFonts: false,
    reactStrictMode: false,
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: `${process.env.LOCAL_BACKEND_URL}/uploads/:path*`
            },
            {
                source: '/v1/api/:path*',
                destination: `${process.env.LOCAL_BACKEND_URL}/v1/api/:path*`
            }
        ]
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
}

export default withNextIntl(nextConfig);
