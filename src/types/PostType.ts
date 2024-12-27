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
}

export interface CommentType {
  user?: UserType
  text?: string
  createdAt?: string
}