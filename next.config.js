/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ngdawscck3qwoc3m.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        swcPlugins: [['@swc-jotai/react-refresh', {}]],
    },
};

module.exports = nextConfig;
