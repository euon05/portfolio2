'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-start bg-blue-100 text-gray-800 px-6 py-12 space-y-6">
      <motion.h2
        className="text-4xl font-bold mb-4 text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Team
      </motion.h2>

      <motion.div
        className="flex flex-col space-y-4 w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">팀이름</h3>
          <p>웹을위해태어남.</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">팀원</h3>
          <p>팀장 오은채</p>
          <p>팀원 김정서</p>
          <p>팀원 한지원</p>
          <p>팀원 이예빈</p>
          <p>팀원 정효민</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">팀프로젝트</h3>
          <p>웹쇼핑몰</p>
          <p>링크</p>
        </div>
      </motion.div>

      <Link
        href="/"
        className="px-6 py-3 bg-gray-800 text-white rounded-full transition-transform transform hover:scale-105"
      >
        ⬅ 홈으로 돌아가기
      </Link>
    </main>
  )
}
