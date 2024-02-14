/** @type {import('next').NextConfig} */
const nextConfig = {};

// export default nextConfig;

export default {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://192.168.0.21:8080/open-api/:path*'
            },
            {
                source: '/surveys/_doc/:id*',
                destination: 'http://192.168.0.252:9200/surveys/_doc/:id*'
            }
        ]
    },
};