// src/app/api/posts/[id]/route.ts

import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Post from '@/models/Post' // Post 모델 경로 확인

const DB_URI = process.env.MONGODB_URI

async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(DB_URI!)
  }
}

// [R-Detail: Read] 게시글 상세 조회
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb()
    const postId = params.id
    const post = await Post.findById(postId)
    if (!post) {
      return NextResponse.json(
        { message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      { message: '게시글 조회 실패', error: error.message },
      { status: 500 }
    )
  }
}

// [U: Update] 게시글 수정
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb()
    const postId = params.id
    const body = await req.json()
    const updatedPost = await Post.findByIdAndUpdate(postId, body, {
      new: true,
    })

    if (!updatedPost) {
      return NextResponse.json(
        { message: '수정할 게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json(
      { message: '게시글 수정 실패', error: error.message },
      { status: 500 }
    )
  }
}

// [D: Delete] 게시글 삭제
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb()
    const postId = params.id
    const deletedPost = await Post.findByIdAndDelete(postId)

    if (!deletedPost) {
      return NextResponse.json(
        { message: '삭제할 게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    return new Response(null, { status: 204 })
  } catch (error) {
    return NextResponse.json(
      { message: '게시글 삭제 실패', error: error.message },
      { status: 500 }
    )
  }
}
