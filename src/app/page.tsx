'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center">
      <motion.img
        src="/profile.jpg"
        alt="프로필 사진"
        className="w-40 h-40 rounded-full shadow-xl mb-6 border-4 border-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-4xl font-extrabold mb-3 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        오은채 포트폴리오
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Next.js로 만든 나만의 공간
      </motion.p>

      <motion.div
        className="flex flex-row justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="/about"
          className="px-6 py-3 bg-blue-400
          hover:bg-blue-600 text-white rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
        >
          About
        </Link>
        <Link
          href="/portfolio"
          className="px-6 py-3 bg-blue-400
          hover:bg-blue-600 text-white rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Portfolio
        </Link>
        <Link
          href="/team"
          className="px-6 py-3 bg-blue-400
          hover:bg-blue-600 text-white rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Team
        </Link>
        <Link
          href="/board" // <-- 게시판 경로 추가
          className="px-6 py-3 bg-blue-400
          hover:bg-blue-600 text-white rounded-full text-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Add{' '}
        </Link>
      </motion.div>
    </main>
  )
}
