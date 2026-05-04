import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Docker 최적화: 빌드 결과물을 최소화하여 서버에 배포
  images: {
    formats: ['image/avif', 'image/webp'], // 이미지 최적화 성능 극대화
  },
};

export default nextConfig;