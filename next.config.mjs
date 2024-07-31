/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'cdn-bucket.hb.ru-msk.vkcs.cloud'
         }
      ]
   }
};

export default nextConfig;
