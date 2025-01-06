import { UserType } from './UserType'

export interface PostType {
  _id?: string
  author?: UserType
  content?: string
  images?: string[]
  location?: string
  likeCount?: number
  commentCount?: number
  hashtags?: string[]
  mentions?: UserType[]
  createdAt?: string

  liked?: boolean
  saved?: boolean
}

export interface CommentType {
  _id?: string
  post?: PostType
  commentBy?: UserType
  text?: string
  createdAt?: string
}

export interface LikeType {
  _id?: string
  post?: PostType
  likedBy?: UserType
  createdAt?: string
}