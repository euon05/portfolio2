'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-100 xt-gray-800 px-6">
      <motion.div
        className="flex flex-col items-center space-y-2 text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700">📧 이메일</h3>
            <p className="text-blue-300">yslove1670735@naver.com</p>
          </div>

          <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700">💻 GitHub</h3>
            <a
              href="https://github.com/euon05/"
              className="text-blue-300 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/euon05
            </a>
          </div>

          <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              🌐 포폴 배포 주소
            </h3>
            <a
              href="https://clerk-app-ten.vercel.app/"
              className="text-blue-300 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              vercel.app
            </a>
          </div>
        </div>
      </motion.div>

      <Link
        href="/"
        className="px-6 py-3 bg-gray-800 text-white rounded-full  transition-transform transform hover:scale-105"
      >
        ⬅ 홈으로 돌아가기
      </Link>
    </main>
  )
}
