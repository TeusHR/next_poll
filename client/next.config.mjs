/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    optimizeFonts: false,
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
    async rewrites() {
        console.log(process.env)
        console.log([
            {
                source: '/uploads/:path*',
                destination: `${process.env.LOCAL_BACKEND_URL}/uploads/:path*`
            },
            {
                source: '/v1/api/:path*',
                destination: `${process.env.LOCAL_BACKEND_URL}/v1/api/:path*`
            }
        ])
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

export default nextConfig;
