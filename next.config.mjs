/** @type {import('next').NextConfig} */
const nextConfig = {};

// export default nextConfig;

export default {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.SURVEY_API}/open-api/:path*`
            },
            {
                source: '/surveys/_doc/:id*',
                destination: `${process.env.SURVEY_ELASTIC}/surveys/_doc/:id*`
            }
        ]
    },
};