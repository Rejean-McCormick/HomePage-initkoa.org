/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // YouTube thumbnails
      { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/**' },
      { protocol: 'https', hostname: 'ytimg.com', pathname: '/**' },

      // Spotify cover art (si tu affiches des images Spotify hors iframe)
      { protocol: 'https', hostname: 'i.scdn.co', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
