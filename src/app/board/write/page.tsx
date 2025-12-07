// src/app/board/write/page.tsx
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_URL = 'http://localhost:4000/api/posts'

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('오은채')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const postData = { title, content, author }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        // HTTP 상태 코드가 4xx 또는 5xx 인 경우
        const errorData = await response.json()
        throw new Error(
          errorData.message || '서버 오류로 게시글 저장에 실패했습니다.'
        )
      }

      alert('🎉 게시글이 성공적으로 작성되었습니다!')
      router.push('/board') // 목록으로 이동
    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error)
      alert(
        `❌ 오류 발생: ${
          (error as Error).message
        }. 백엔드 서버(4000)와 MongoDB 연결을 확인하세요.`
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <Link href="/board" className="text-xl text-blue-600 hover:underline">
          &larr; 게시판 목록으로
        </Link>
        <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">
          새 글 작성하기
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="제목을 입력해 주세요."
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg resize-none"
            placeholder="내용을 입력해 주세요."
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="author"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            작성자
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="이름을 입력해 주세요."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg transition duration-200 
                        ${
                          isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
        >
          {isLoading ? '저장 중...' : '게시글 작성 완료'}
        </button>
      </form>
    </div>
  )
}
