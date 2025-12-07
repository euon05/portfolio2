// server/index.js (전체 복사/붙여넣기: C, R, U, D 모두 포함)

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const Post = require('./models/Post')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const DB_URI = process.env.MONGODB_URI

// 미들웨어 설정
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

// MongoDB 연결
mongoose
  .connect(DB_URI)
  .then(() => console.log('✅ MongoDB 연결 성공!'))
  .catch((err) => console.error('❌ MongoDB 연결 실패:', err))

// -------------------------------------------------------------------
// API 라우트 정의 (C, R, U, D)
// -------------------------------------------------------------------

// [C: Create] 게시글 작성
app.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(500).json({ message: '게시글 작성 실패', error: error.message })
  }
})

// [R-List: Read] 게시글 전체 목록 조회
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: '게시글 조회 실패', error: error.message })
  }
})

// [R-Detail: Read] 특정 ID의 게시글 상세 조회
app.get('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: '게시글 조회 실패', error: error.message })
  }
})

// [U: Update] 게시글 수정 🚨 이 부분이 제대로 작동하는지 확인하세요.
app.put('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    })

    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: '수정할 게시글을 찾을 수 없습니다.' })
    }
    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(500).json({ message: '게시글 수정 실패', error: error.message })
  }
})

// [D: Delete] 게시글 삭제
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const deletedPost = await Post.findByIdAndDelete(postId)

    if (!deletedPost) {
      return res
        .status(404)
        .json({ message: '삭제할 게시글을 찾을 수 없습니다.' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: '게시글 삭제 실패', error: error.message })
  }
})

// -------------------------------------------------------------------

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`)
})
