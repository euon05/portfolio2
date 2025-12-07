// src/app/board/[id]/page.tsx (수정 및 삭제 기능 포함 최종 버전)

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // useRouter 필수

// 서버 API 주소
const API_BASE_URL = 'https://portfolio2-kappa-brown.vercel.app/api/posts'

interface Post {
  _id: string // 수정 및 삭제를 위해 ID 필드가 필수입니다.
  title: string
  content: string
  author: string
  createdAt: string
}

interface PostPageProps {
  params: {
    id: string
  }
  // searchParams 추가 (이전에 했던 작업)
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = params
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // --- 데이터 로딩 ---
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return

      try {
        const response = await fetch(`${API_BASE_URL}/${id}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.message || '게시글을 불러오는 데 실패했습니다.'
          )
        }

        const data: Post = await response.json()
        setPost(data)
      } catch (err: unknown) {
        const error = err instanceof Error ? err.message : '알 수 없는 오류'
        console.error('게시글 상세 조회 오류:', err)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  // --- 삭제 핸들러 ---
  const handleDelete = async () => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      })

      if (response.status !== 204) {
        throw new Error('게시글 삭제 요청에 실패했습니다.')
      }

      alert('✅ 게시글이 성공적으로 삭제되었습니다.')
      router.push('/board') // 목록 페이지로 이동
    } catch (error) {
      console.error('삭제 중 오류 발생:', error)
      alert(`❌ 삭제 오류: ${(error as Error).message}`)
    }
  }

  if (loading)
    return <div className="text-center p-8 text-xl">게시글 로딩 중...</div>
  if (error)
    return (
      <div className="text-red-600 text-center p-8 text-xl">
        ❌ 오류: {error}
      </div>
    )
  if (!post)
    return (
      <div className="text-center p-8 text-xl">
        게시글을 찾을 수 없습니다. (ID: {id})
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-6">
        <Link
          href="/board"
          className="text-xl text-blue-600 hover:underline font-semibold"
        >
          &larr; 목록으로 돌아가기
        </Link>
      </header>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900 border-b pb-3 mb-6">
          {post.title}
        </h1>

        <div className="flex justify-between items-center text-gray-500 text-sm mb-8 border-b pb-4">
          <span>작성자: **{post.author}**</span>
          <span>작성일: {new Date(post.createdAt).toLocaleString()}</span>
        </div>

        <div className="prose lg:prose-lg whitespace-pre-wrap text-gray-800">
          <p>{post.content}</p>
        </div>

        <footer className="mt-10 pt-6 border-t flex justify-end">
          {/* 삭제 버튼 */}
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            삭제
          </button>

          {/* 🚨 수정 버튼: '/board/edit/[id]' 경로로 정확히 연결 */}
          <Link
            href={`/board/edit/${post._id}`}
            className="ml-3 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            수정
          </Link>
        </footer>
      </div>
    </div>
  )
}
