// src/app/api/posts/route.ts

import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Post from '@/models/Post' // Post 모델 경로 확인

const DB_URI = process.env.MONGODB_URI

// MongoDB 연결 함수 (한 번만 연결)
async function connectDb() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(DB_URI!)
  }
}

// [R-List: Read] 게시글 목록 조회
export async function GET() {
  try {
    await connectDb()
    const posts = await Post.find().sort({ createdAt: -1 })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { message: '게시글 조회 실패', error: error.message },
      { status: 500 }
    )
  }
}

// [C: Create] 게시글 작성
export async function POST(req: Request) {
  try {
    await connectDb()
    const body = await req.json()
    const newPost = new Post(body)
    const savedPost = await newPost.save()
    return NextResponse.json(savedPost, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: '게시글 작성 실패', error: error.message },
      { status: 500 }
    )
  }
}
