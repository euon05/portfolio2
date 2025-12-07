// src/components/BoardList.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface Post {
  _id: string
  title: string
  content: string
  author: string
  createdAt: string
}

const API_URL = 'https://portfolio2-kappa-brown.vercel.app/api/posts'

const BoardList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`데이터 로드 실패: ${response.status}`)
        }

        const data: Post[] = await response.json()
        setPosts(data)
      } catch (err: any) {
        console.error('API 호출 중 오류 발생:', err)
        // 서버가 꺼져 있으면 Failed to fetch 오류가 뜸
        setError(
          `게시글 조회 실패: ${err.message}. 백엔드 서버(4000번 포트)가 실행 중인지 확인하세요.`
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading)
    return <div className="text-center p-4">게시글을 불러오는 중...</div>
  if (error)
    return (
      <div className="text-red-600 text-center p-4 border border-red-300 bg-red-50 rounded-lg">
        ❌ {error}
      </div>
    )

  return (
    <div className="p-4">
      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          게시글이 없습니다. '글쓰기' 버튼을 눌러 작성해 보세요!
        </p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8/12">
                제목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                작성자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                작성일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post, index) => (
              <tr
                key={post._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {posts.length - index}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800">
                  <Link href={`/board/${post._id}`}>{post.title}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {post.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default BoardList
