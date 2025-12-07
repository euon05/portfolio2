// src/app/layout.tsx (폰트 오류 해결을 위한 최종 수정)

// Google 폰트 Import
import { Inter } from 'next/font/google'
import './globals.css' // 전역 CSS 임포트

// Inter 폰트 설정
const inter = Inter({ subsets: ['latin'] })

// Metadata 정의
export const metadata = {
  title: '오은채 포트폴리오',
  description: 'Next.js로 만든 나만의 공간',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 폰트 클래스를 Inter로 설정하여 Geist 폰트 문제 해결
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
