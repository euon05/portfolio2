// src/app/board/page.tsx

'use client'

import React from 'react'
import Link from 'next/link'
import BoardList from '@/components/BoardList'

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <Link href="/" className="text-xl text-blue-600 hover:underline">
          &larr; Home
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">은채의 게시판</h1>

        <Link
          href="/board/write"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          글쓰기
        </Link>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <BoardList />
      </div>
    </div>
  )
}
