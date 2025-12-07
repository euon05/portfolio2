// src/app/board/edit/[id]/page.tsx (전체 복사/붙여넣기)
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API_BASE_URL = 'https://portfolio2-kappa-brown.vercel.app/api/posts'

interface Post {
  title: string
  content: string
  author: string
}

interface EditPageProps {
  params: {
    id: string
  }
  // searchParams 추가 (이전에 했던 작업)
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function EditPage({ params }: EditPageProps) {
  const { id } = params
  const [formData, setFormData] = useState<Post>({
    title: '',
    content: '',
    author: '',
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  // 1. 기존 게시글 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return

      try {
        const response = await fetch(`${API_BASE_URL}/${id}`)
        if (!response.ok) {
          throw new Error('게시글 정보를 불러오는 데 실패했습니다.')
        }
        const data: Post = await response.json()
        setFormData({
          title: data.title,
          content: data.content,
          author: data.author,
        })
      } catch (err: any) {
        alert(`오류: ${err.message}`)
        router.push('/board') // 오류 시 목록으로 리디렉션
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 2. 수정된 데이터를 PUT 요청으로 서버에 전송하는 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('게시글 수정에 실패했습니다.')
      }

      alert('✅ 게시글이 성공적으로 수정되었습니다.')
      router.push(`/board/${id}`) // 상세 페이지로 이동
    } catch (err: unknown) {
      // any -> unknown
      const errorMessage =
        err instanceof Error ? err.message : '알 수 없는 오류'
      alert(`오류: ${errorMessage}`)
      router.push('/board')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) return <div className="text-center p-8">로딩 중...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <Link
          href={`/board/${id}`}
          className="text-xl text-blue-600 hover:underline"
        >
          &larr; 수정 취소
        </Link>
        <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">
          게시글 수정하기
        </h1>
      </header>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg"
      >
        {/* 제목 필드 */}
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
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        {/* 내용 필드 */}
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg resize-none"
          />
        </div>

        {/* 작성자 필드 */}
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
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        {/* 저장 버튼 */}
        <button
          type="submit"
          disabled={isSaving}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg transition duration-200 
                        ${
                          isSaving
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
        >
          {isSaving ? '수정 내용 저장 중...' : '수정 완료'}
        </button>
      </form>
    </div>
  )
}
