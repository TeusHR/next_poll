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
    }
}

export default withNextIntl(nextConfig);
