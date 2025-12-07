// src/app/layout.tsx (수정할 부분)

// 폰트 임포트 변경 (Geist 제거 및 Inter로 대체)
import { Inter } from 'next/font/google' // Google Fonts의 Inter 사용

// 폰트 정의 변경 (Geist 대신 Inter로)
const inter = Inter({ subsets: ['latin'] }) // Inter 폰트 정의

// ... (메타데이터 등 생략)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 🚨 className을 'Geist' 대신 'inter.className'으로 변경
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
