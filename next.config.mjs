/** @type {import('next').NextConfig} */
const ContentSecurityPolicyVariants = `
    default-src 'self'; 
    style-src 'self' 'unsafe-inline'; 
    script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
    connect-src *; worker-src * blob:; 
    font-src 'self' fonts.gstatic.com; 
    img-src 'self' data:;
`;

const ContentSecurityPolicy = {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicyVariants.replace(/\s{2,}/g, " ").trim()
};

const XFrameOption = {
    key: "X-Frame-Options",
    value: "SAMEORIGIN"
};

const securityHeaders = [XFrameOption, ContentSecurityPolicy];

const nextConfig = {
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders
            }
        ];
    },

    async rewrites() {
        if (process.env.NODE_ENV === "development") {
            return [
                {
                    source: "/dev/:path*",
                    destination: "http://localhost:3001/api/:path*",
                },
            ]
        } else {
            return []
        }
    }
};

export default nextConfig;
