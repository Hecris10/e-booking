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
            {
                protocol: 'https',
                hostname: 'y0hbjiz1v2x58pmn.public.blob.vercel-storage.com',
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
