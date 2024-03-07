/** @type {import('next').NextConfig} */
const nextConfig = {
    optimizeFonts: false,
    env: {
        BACKEND_URL: "http://localhost:4000",
        LOCAL_BACKEND_URL: "http://localhost:4000",
    },

    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: 'http://localhost:4000/uploads/:path*'
            },
            {
                source: '/v2/api/:path*',
                destination: 'http://localhost:4000/v2/api/:path*'
            }
        ]
    }
}

export default nextConfig;
