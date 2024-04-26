/** @type {import('next').NextConfig} */
const nextConfig = {
    optimizeFonts: false,
    env: {
        LOCAL_BACKEND_URL: "http://localhost:4000",
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: 'http://localhost:4000/uploads/:path*'
            },
            {
                source: '/v1/api/:path*',
                destination: 'http://localhost:4000/v1/api/:path*'
            }
        ]
    }
}

export default nextConfig;
