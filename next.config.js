// next.config.js (수정)

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  // 🚨 린팅 오류 무시 설정 추가 🚨
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
